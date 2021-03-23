/**
 * @module components/Cards/Product/Rating
 */
import cx from 'classnames';
import Icon from 'components/Icon';
import Text from 'components/Text';
import { ThemedSFCProps } from 'types';
import styles from 'components/Cards/Product/Rating/styles.css';

/** Array of empty stars */
const itemsArray = Array.from(Array(5).keys());

/** List of props that Rating component accepts */
export interface IRatingProps extends ThemedSFCProps {
  /** Rating value */
  value: number;
  /** Total reviews */
  count: number;
}

export default ({ value, count, theme, className }: IRatingProps) => (
  <div className={cx(theme.rating, className)}>
    <div className={theme.stars}>
      {itemsArray.map((index: number) => (
        <Icon
          key={index}
          name="Star"
          title="Star"
          className={cx(theme.star, { [theme.filled]: index < value })}
        />
      ))}
    </div>
    <Text
      display-if={!!count}
      className={theme.count}
      mode="secondary-uppercase"
    >
      ({count})
    </Text>
  </div>
);
