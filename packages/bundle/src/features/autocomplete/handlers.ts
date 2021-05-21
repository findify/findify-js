import { isImmutable } from 'immutable';
import { addEventListeners } from '../../helpers/addEventListeners';
import { findClosestElement } from '../../helpers/findClosestElement';
import {
  isSearch,
  redirectToSearch,
  redirectToPage,
} from '../../core/location';
import { Events } from '../../core/events';
import { debounce } from '../../helpers/debounce';
import { documentReady } from '../../helpers/documentReady';
import { Agent } from '@findify/agent/types/core/Agent';
import { Immutable } from '@findify/store-configuration';
import { Widget } from '../../core/widgets';

const findClosestForm = findClosestElement('form');

const isAutocompleteNode = (node) =>
  node.hasAttribute && node.hasAttribute('data-findify-autocomplete');

const stylesUpdater = (ghost, styles: any) => {
  let cache: any = {};
  if (!ghost.childNodes.length) return;
  for (const key in styles) {
    if (cache[key] === styles[key]) return;
    const type = typeof styles[key];
    ghost.style[key] = type === 'string' ? styles[key] : styles[key] + 'px';
  }
  return (cache = styles);
};

const getEventPath = (event) => {
  const _path = event.path || (event.composedPath && event.composedPath());
  if (_path) return _path; // Chrome only, for now
  // (Semi)-Polyfill for other browsers, like Edge & IE
  // Semi, because originally path keeps the original DOM before mutations,
  // that could've occured after event was dispatched but before it was received
  // Recursion might be more beatiful, but in that case we will need more speed
  const path: any[] = [];
  let currentElement = event.target;
  while (currentElement) {
    path.push(currentElement);
    currentElement =
      currentElement.tagName !== 'HTML' ? currentElement.parentElement : null;
  }
  path.push(document, window);
  return path;
};

export const registerHandlers = (
  widget: Widget<Immutable.AutocompleteConfig>,
  agent: Agent,
  rerender
) => {
  const { node, config } = widget;
  const subscribers: any = [];
  let container: any;
  let findifyElementFocused = true;

  if (node.getAttribute('autocomplete') !== 'off')
    node.setAttribute('autocomplete', 'off');

  /** ACCESSIBILITY */
  node.setAttribute('role', 'combobox');
  node.setAttribute('aria-autocomplete', 'list');
  node.setAttribute('aria-haspopup', 'listbox');
  node.setAttribute('aria-owns', 'FindifyAutocompleteSuggestions');
  node.setAttribute('aria-expanded', 'false');
  node.setAttribute('aria-activedescendant', '');
  node.setAttribute('aria-describedby', 'FindifyAutocompleteDescription');
  /** === */

  /** Track input position and update container styles */
  const handleWindowScroll = debounce(() => {
    container =
      container || document.querySelector(`.findify-widget-${widget.key}`);
    if (!container || !container.childNodes.length) return;

    const { width, top, left, height } = node.getBoundingClientRect();
    const _top = top + (window.scrollY || document.documentElement.scrollTop);
    const _left =
      left + (window.scrollX || document.documentElement.scrollLeft);
    if (top + height < 0 || left < 0) return;

    return stylesUpdater(container, {
      width,
      height: 0,
      top: _top + height,
      left: _left,
      position: 'absolute',
      'will-change': 'top, left',
    });
  });

  const resetReferencedAgentsLogging = debounce((value) => {
    __root.widgets
      .findByType('search', 'smart-collection', 'content')
      .forEach(({ agent }) =>
        agent
          .reset()
          .defaults({ log: true })
          .set('q', value || '')
      );
  }, 1000);

  const updateReferencedAgents = (value, noLogs?) =>
    __root.widgets
      .findByType('search', 'smart-collection', 'content')
      .forEach(({ agent }) => {
        agent.reset();
        if (noLogs) {
          agent.defaults({ log: false });
          resetReferencedAgentsLogging(value);
        }
        agent.set('q', value || '');
      });

  /** Handle input change */
  const handleInputChange = (e) => {
    const value = e.target.value || '';
    if (config.get('renderIn') === 'body') handleWindowScroll();
    if (config.get('instant') && isSearch()) {
      return updateReferencedAgents(value, true);
    }
    agent.set('q', value);
    rerender('initial');
  };

  const insideAutocomplete = (node: HTMLElement) => {
    if (!node || !node.parentElement) return false;
    if (isAutocompleteNode(node)) return true;
    return insideAutocomplete(node.parentElement);
  };

  const isAutocompleteRelated = (e) =>
    e.relatedTarget && insideAutocomplete(e.relatedTarget);

  /** Handle input blur */
  const handleInputBlur = (e) =>
    !findifyElementFocused &&
    !isAutocompleteRelated(e) &&
    e.target === node &&
    __root.emit(Events.autocompleteFocusLost, widget.key);

  const handleKeydown = ({ key, target }) =>
    key === 'Enter' && search(target.value);

  /** search for the value */
  const search = (_value?) => {
    const value = _value || agent.state.get('q') || '';
    const [query, redirect] = isImmutable(value)
      ? [value.get('value'), value.get('redirect')]
      : [value, agent.response.get('redirect')];

    if (redirect) {
      return redirectToPage(redirect, agent.response.get('meta'));
    }

    if (!isSearch()) return redirectToSearch(query);

    updateReferencedAgents(query);

    __root.widgets
      .findByType('autocomplete')
      .forEach(({ node }) => (node.value = query));

    rerender();
  };

  const handleFormSubmit = (e) => {
    if (e) e.preventDefault();
    search(node.value);
  };

  const handleFocus = (e = undefined) => {
    if (config.get('instant') && isSearch()) return;
    findifyElementFocused = true;
    if (!e) return rerender('initial');
    if (!agent.state.get('q') || agent.state.get('q') !== e.target.value) {
      agent.set('q', e.target.value);
    }
    rerender('initial');
  };

  /** Listen for input change */
  subscribers.push(
    addEventListeners(
      ['input', 'cut', 'paste'],
      debounce(handleInputChange, 250),
      node
    )
  );

  subscribers.push(addEventListeners(['focus'], handleFocus, node));

  /** Listen for input blur */
  subscribers.push(
    addEventListeners(['focusout'], handleInputBlur, document.body)
  );

  if (config.get('handleFormSubmit')) {
    subscribers.push(
      addEventListeners(['keydown'], handleKeydown, node, false)
    );
  }

  /** Update container position  */
  if (config.get('renderIn') === 'body') {
    subscribers.push(
      addEventListeners(
        [
          'mousemove',
          'webkitTransitionEnd',
          'otransitionend',
          'oTransitionEnd',
          'msTransitionEnd',
          'transitionend',
          'animationiteration',
          'webkitAnimationIteration',
          'oanimationiteration',
          'MSAnimationIteration',
        ],
        handleWindowScroll,
        document
      )
    );
    subscribers.push(
      addEventListeners(['scroll'], debounce(handleWindowScroll), window)
    );
  }

  const handleActiveElementChange = (evt) => {
    const path = getEventPath(evt);
    const _focused = findifyElementFocused;
    if (!path || !path.find) return;
    findifyElementFocused = !!path.find(isAutocompleteNode);
    if (
      evt.type === 'focus' &&
      _focused &&
      !(evt.target === node || findifyElementFocused)
    ) {
      __root.emit(Events.autocompleteFocusLost, widget.key);
    }
  };

  subscribers.push(
    addEventListeners(
      ['mousemove', 'touchmove', 'focus'],
      debounce(handleActiveElementChange),
      document
    )
  );

  /** Unsubscribe from events on instance destroy  */
  const unsubscribe = __root.listen((event, prop, ...args) => {
    if (event === Events.search && prop === widget.key) return search(...args);
    if (event === Events.autocompleteFocus && prop === widget.key)
      return handleFocus();
    if (event === Events.autocompleteFocusLost && prop === widget.key)
      rerender();
    if (event !== Events.detach || prop !== widget) return;
    subscribers.forEach((fn) => fn());
    unsubscribe();
  });

  documentReady.then(() => {
    handleWindowScroll();

    /** Listen for form submit */
    if (config.get('handleFormSubmit')) {
      const form = findClosestForm(node);
      if (form) {
        subscribers.push(addEventListeners(['submit'], handleFormSubmit, form));
      }
    }
  });

  window.requestAnimationFrame(() => rerender());

  return;
};
