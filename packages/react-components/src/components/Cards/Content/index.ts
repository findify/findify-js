/**
 * @module components/Cards/Content
 */

import { compose, setDisplayName } from 'recompose';
import withTheme from 'helpers/withTheme';
import styles from 'components/Cards/Content/styles.css';
import view from 'components/Cards/Content/view';

export default compose(setDisplayName('ContentCard'), withTheme(styles))(view);
