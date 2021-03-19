/**
 * @module components/PoweredBy
 */

import Text from 'components/Text';

export default ({ config, theme }) => (
  <Text
    secondary
    uppercase
    display-if={config.get('poweredByFindify')}
    className={theme.root}
  >
    Powered by Findify
  </Text>
);
