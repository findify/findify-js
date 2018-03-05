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

export const registerHandlers = (entity, render) => {
  const { node, config, agent } = entity;
  const subscribers: any = [];
  let container: any;

  /** Track input position and update container styles */
  const handleWindowScroll = debounce(() => {
    container = container || document.querySelector(`.findify-element-${entity.key}`);
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
    const value = e.target.value;
    if (!value) return render();
    agent.set('q', value);
    handleWindowScroll();
    return render('initial')
  };

  /** Handle input blur */
  const handleInputBlur = (e) => render();

  /** search for the value */
  const search = (_value?) => {
    const value = _value || agent.state.get('q');
    if (!isSearch()) return redirectToSearch(value);
    __root.entities
      .findByType('search', 'smart-collection')
      .forEach(({ agent }) => agent.reset().set('q', value)); 
    node.value = value;
  };

  const handleFormSubmit = e => {
    if (e) e.stopPropagation();
    search();
  }
  
  /** Listen for input change */
  subscribers.push(addEventListeners(
    ['input', 'focus', 'cut', 'paste'],
    handleInputChange,
    node
  ));

  /** Listen for input blur */
  subscribers.push(addEventListeners(
    ['blur'],
    handleInputBlur,
    node
  ));

  if (!config.get('disableFormSubmit')) {
    subscribers.push(addEventListeners(
      ['change'],
      handleFormSubmit,
      findClosestForm(node)
    ))
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

  /** Unsubscribe from events on instance destroy  */
  const unsubscribe = __root.listen((event, prop, ...args) => {
    if (event === Events.search && prop === entity.key) {
      return search(...args);
    }
    if (event !== Events.detach || prop !== entity) return;
    subscribers.forEach(fn => fn());
    unsubscribe();
  })

  return; 
}
