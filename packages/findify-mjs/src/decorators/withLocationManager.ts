import { defaultProps, setDisplayName } from 'recompose';
import createLocation from '../states/LocationsState';

const withLocationManager = (config, hooks) =>
  defaultProps({ location: createLocation(config, hooks) });

/**
 * Will create new location state and put it in props
 */
export default setDisplayName('withLocationManager')(withLocationManager);
