import { findDomNode } from 'react-dom';
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

export const registerHandlers = (widget, render) => {
  const { node, config, agent } = widget;
  const subscribers: any = [];
  let container: any;
  let findifyElementFocused = false;
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
      // FIXME: make left padding work left: _left,
      position: 'absolute',
      'will-change': 'top, left'
    });
  })

  /** Handle input change */
  const handleInputChange = (e) => {
    const value = e.target.value;
    handleWindowScroll();
    render('initial');
    agent.set('q', value);
    return;
  };

  /** Handle input blur */
  const handleInputBlur = (e) => {
    return (
      !findifyElementFocused &&
      e.target === node &&
      __root.emit(Events.autocompleteFocusLost, widget.key)
    )
  }

  /** search for the value */
  const search = (_value?) => {
    const value = _value || agent.state.get('q') || '';
    if (!isSearch()) return redirectToSearch(value);
    __root.widgets
      .findByType('search', 'smart-collection')
      .forEach(({ agent }) => agent.reset().set('q', value || ''));
    node.value = value;
  };

  const handleFormSubmit = e => {
    if (e) {
      e.stopPropagation();
      e.preventDefault();
    }
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
    () => render('initial'),
    node
  ));

  /** Listen for input blur */
  subscribers.push(addEventListeners(
    ['focusout'],
    handleInputBlur,
    document.body
  ));

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
    if (event === Events.search && prop === widget.key) {
      console.log('src', ...args)
      return search(...args);
    }
    if (event === Events.autocompleteFocusLost && prop === widget.key) {
      render();
    }
    if (event !== Events.detach || prop !== widget) return;
    subscribers.forEach(fn => fn());
    unsubscribe();
  })

  window.requestAnimationFrame(() => {
    render();
  })
  return;
}
