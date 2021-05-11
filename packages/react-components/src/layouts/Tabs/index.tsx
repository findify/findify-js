import styles from 'layouts/Tabs/styles.css';
import MapArray from 'components/common/MapArray';
import Button from 'components/Button';
import cx from 'classnames';
import { useCallback } from 'react';

const Tab = ({ theme, item, onClickItem }) => {
  const onClick = useCallback((e) => {
    e.preventDefault();
    return onClickItem(item.key);
  }, []);

  return (
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
  );
};

const Tabs = ({ onClick, widgets, theme = styles }) => (
  <div className={theme.root}>
    <MapArray
      keyAccessor={(i) => i.key}
      array={widgets}
      factory={Tab}
      theme={theme}
      onClickItem={onClick}
    />
  </div>
);

export default process.env.HOT
  ? require('react-hot-loader').hot(module)(Tabs)
  : Tabs;
