import { addEventListeners } from '../../helpers/addEventListeners';
import { findClosestElement } from '../../helpers/findClosestElement';
import { isSearch, setQuery, buildQuery, redirectToSearch } from '../../core/location';

const findClosestForm = findClosestElement('form');

export const registerHandlers = (entity, render) => {
  const { node, config, agent } = entity;
  const subscribers: any = [];

  /** Handle input change */
  const handleInputChange = (e) => {
    const value = e.target.value;
    if (!value) return render();
    agent.set('q', value);
    return render('initial')
  };

  /** Handle input blur */
  const handleInputBlur = () => render();

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

  /** Unsubscribe from events on instance destroy  */
  const unsubscribe = __root.listen((event, prop, ...args) => {
    if (event === 'search' && prop === entity.key) {
      return search(...args);
    }
    if (event !== 'detachEntity' || prop !== entity) return;
    subscribers.forEach(fn => fn());
    unsubscribe();
  })

  return; 
}
