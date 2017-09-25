import { withState, setDisplayName } from 'recompose';
import NodeState from '../states/NodeState';

const withNodeState = options =>
  withState(
    'node',
    'updateNode',
    ({ node }) => new NodeState(options || { node }),
  );

/**
 * Will create node state and put it in props
 */
export default setDisplayName('withNodeState')(withNodeState);
