import { range } from 'lodash';
import { branch, compose, defaultProps, setDisplayName, renderNothing, withProps } from 'recompose';
import { connectPagination } from '@findify/react-connect';
import withTheme from 'helpers/withTheme';

import view from './view';

import styles from './styles.css';

const getRange = ({ current, total, step }) => {
  const min = current - step;
  const max = current + step + 1;
  return range(min < 1 ? 1 : min, max > total ? total + 1 : max);
};

export default compose(
  setDisplayName('Pagination'),

  withTheme(styles),

  connectPagination,

  branch(
    ({ pages }) => !pages,
    renderNothing
  ),

  withProps(({ current, pages, meta, config }: any) => {
    const step = config.getIn(['pagination', 'step']);
    const total = Math.round(pages.size / meta.get('limit')) + 1;
    return {
      total,
      showFirst: current > step + 1,
      showLast: current < total - step,
      showFirstDots: current > step + 2,
      showLastDots: current < total - step - 1,
      showPrev: current > step,
      showNext: total - step > current,
      visiblePages: getRange({ current, total, step }),
    };
  }),
)(view);
