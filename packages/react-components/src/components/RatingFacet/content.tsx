/**
 * @module components/RatingFacet
 */
import cx from 'classnames';
import Icon from 'components/Icon';

export default ({ item, theme, config }) => (
  <>
    {[...Array(Math.trunc(item.get('from'))).keys()].map((_, i) => (
      <Icon className={theme.star} name="Star" title="Star" key={'fill-' + i} />
    ))}
    {[...Array(5 - Math.trunc(item.get('from'))).keys()].map((_, i) => (
      <Icon
        className={cx(theme.star, theme.unfilled)}
        name="Star"
        title="Star"
        key={'unfill-' + i}
      />
    ))}
  </>
);
