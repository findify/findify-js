import MapArray from 'components/common/MapArray';
import { withHandlers } from 'recompose';
import Button from 'components/Button';
import cx from 'classnames';

const Tab = withHandlers({
  onClick: ({ onClick, item }) => (e) => {
    e.preventDefault();
    return onClick(item.key);
  },
})(({ theme, item, onClick }: any) => (
  <Button
    onClick={onClick}
    disabled={!item.count}
    className={cx(theme.item, item.active && theme.active)}
  >
    {item.title}
    <span className={theme.count} display-if={!!item.count}>
      {item.count}
    </span>
  </Button>
));

export default ({ onClick, widgets, theme }) => (
  <div className={theme.root}>
    <MapArray
      keyAccessor={(i) => i.key}
      array={widgets}
      factory={Tab}
      theme={theme}
      onClick={onClick}
    />
  </div>
);
