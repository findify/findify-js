import { branch, renderNothing, setDisplayName } from 'recompose';
import { identity } from 'lodash';

const renderForProps = requiredProps =>
  branch(
    props => !requiredProps.find(prop => !props[prop]),
    identity,
    renderNothing,
  );

/**
 * Render component only for specific props
 */
export default setDisplayName('renderForProps')(renderForProps);
