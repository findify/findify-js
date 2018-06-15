import { findDomNode } from 'react-dom';
import { List } from 'immutable'
import { addEventListeners } from '../../helpers/addEventListeners';
import { findClosestElement } from '../../helpers/findClosestElement';
import { isSearch, setQuery, buildQuery, redirectToSearch } from '../../core/location';
import { Events } from '../../core/events';
import { debounce } from 'lodash';

const findClosestForm = findClosestElement('form');

const stylesUpdater = (ghost, styles: any) => {
  let cache: any = {};
  if (!ghost.childNodes.length) return;
  for (const key in styles) {
    if (cache[key] === styles[key]) return;
    const type = typeof styles[key];
    ghost.style[key] = type === 'string' ? styles[key] : styles[key] + 'px';
  }
  return cache = styles;
}

export const registerHandlers = (widget, combinator) => {
  const { node, config, agent } = widget;
  const subscribers: any = [];
  let container: any;
  let findifyElementFocused = true;
  if (node.getAttribute('autocomplete') !== 'off') node.setAttribute('autocomplete', 'off')

  /** Track input position and update container styles */
  const handleWindowScroll = debounce(() => {
    container = container || document.querySelector(`.findify-widget-${widget.key}`);
    if (!container.childNodes.length) return;

    const { width, top, left, height } = node.getBoundingClientRect();
    const _top = top + (window.scrollY || document.documentElement.scrollTop);
    const _left = left + (window.scrollX || document.documentElement.scrollLeft);
    if (top + height < 0 || left < 0) return;

    return stylesUpdater(container, {
      width,
      height: 0,
      top: _top + height,
      left: _left,
      position: 'absolute',
      'will-change': 'top, left'
    });
  })

  /** Handle input change */
  const handleInputChange = (e) => {
    const value = e.target.value || '';
    if (config.get('renderIn') === 'body') handleWindowScroll();
    agent.set('q', value);
    combinator.signal('visible', true);
    combinator.signal('query', value);
    combinator.transition()
  };

  const insideAutocomplete = (node: HTMLElement) => {
    if (!node || !node.parentElement) return false;
    if (node.hasAttribute && node.hasAttribute('data-findify-autocomplete')) return true;
    return insideAutocomplete(node.parentElement);
  }

  const isAutocompleteRelated = (e) => (
    e.relatedTarget && insideAutocomplete(e.relatedTarget)
  )

  /** Handle input blur */
  const handleInputBlur = (e) =>
    (!findifyElementFocused && !isAutocompleteRelated(e)) &&
    e.target === node &&
    __root.emit(Events.autocompleteFocusLost, widget.key)

  const handleKeydown = ({ key, target }) => {
    return key === 'Enter' && search(target.value)
  }

  /** search for the value */
  const search = (_value?) => {
    const value = _value || agent.state.get('q') || '';
    if (!isSearch()) return redirectToSearch(value);
    __root.widgets
      .findByType('search', 'smart-collection')
      .forEach(({ agent }) => agent.reset().set('q', value || ''));
    __root.widgets
      .findByType('autocomplete')
      .forEach(({ node }) => node.value = value);
    combinator.signal('visible', false);
    combinator.transition();
  };

  const handleFormSubmit = e => {
    if (e) e.preventDefault();
    search(node.value);
  }

  /** Listen for input change */
  subscribers.push(addEventListeners(
    ['input', 'cut', 'paste'],
    handleInputChange,
    node
  ));

  subscribers.push(addEventListeners(
    ['focus'],
    (e) => {
      findifyElementFocused = true;
      if (!agent.state.get('q')) {
        agent.set('q', e.target.value);
        combinator.signal('query', e.target.value);
      }
      combinator.signal('visible', true);
      combinator.transition();
    },
    node
  ));

  /** Listen for input blur */
  subscribers.push(addEventListeners(
    ['focusout'],
    handleInputBlur,
    document.body
  ));

  subscribers.push(addEventListeners(
    ['keydown'],
    handleKeydown,
    node,
    false
  ))

  /** Listen for form submit */
  if (!config.get('disableFormSubmit')) {
    const form = findClosestForm(node);
    if (form) {
      subscribers.push(addEventListeners(
        ['submit'],
        handleFormSubmit,
        form
      ))
    }
  }

  /** Update container position  */
  if (config.get('renderIn') === 'body') {
    subscribers.push(addEventListeners(
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
        'MSAnimationIteration'
      ],
      handleWindowScroll,
      document
    ));
    subscribers.push(addEventListeners(
      ['scroll'],
      debounce(handleWindowScroll),
      window
    ))
  }

  const handleActiveElementChange = ({ path }) => {
    findifyElementFocused = !!path.find(item => item.hasAttribute && item.hasAttribute('data-findify-autocomplete'))
  }

  subscribers.push(addEventListeners(
    ['mousemove', 'touchmove'],
    debounce(handleActiveElementChange),
    document
  ))

  /** Unsubscribe from events on instance destroy  */
  const unsubscribe = __root.listen((event, prop, ...args) => {
    if (event === Events.search && prop === widget.key) return search(...args);
    if (event === Events.autocompleteFocusLost && prop === widget.key) {
      combinator.signal('visible', false);
      combinator.transition();
    }
    if (event !== Events.detach || prop !== widget) return;
    subscribers.forEach(fn => fn());
    unsubscribe();
  })

  window.requestAnimationFrame(() => {
    combinator.signal('visible', false)
    combinator.transition();
  })
  return;
}
