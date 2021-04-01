/**
 * @module components/Cards/Product/Stickers
 */

import cx from 'classnames';
import Text from 'components/Text';
import Branch from 'components/common/Branch';
import withTheme from 'helpers/withTheme';
import theme from 'components/Cards/Product/Stickers/styles.css';
import { fromJS } from 'immutable';

const defaultDiscountConfig = fromJS({
  position: 'top-right',
  template: {
    single: '%s% OFF',
    multiple: 'Up to %s% off',
  },
  styles: {
    background: '#c483b3',
    color: '#ffffff',
    fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif;",
    fontSize: '14',
    fontWeight: '700',
  },
});

const defaultOutOfStockConfig = fromJS({
  template: {
    single: 'Out of stock',
  },
});

export const DiscountSticker = withTheme(theme)(
  ({ className, discount, theme, config }) => {
    let realConfig = config.get('stickers');
    if (!realConfig || !realConfig.get('discount'))
      realConfig = defaultDiscountConfig;
    else realConfig = realConfig.get('discount');
    return (
      <div className={cx(theme.discountSticker, className)}>
        <Text bold>
          <Branch
            condition={discount.size > 1}
            left={() =>
              realConfig
                .getIn(['template', 'multiple'])
                .replace('%s', Math.max.apply(Math, discount.toJS()))
            }
            right={() =>
              (
                realConfig.getIn(['template', 'single']) ||
                realConfig.get('template')
              ).replace('%s', Math.max.apply(Math, discount.toJS()))
            }
          />
        </Text>
      </div>
    );
  }
);

export const OutOfStockSticker = withTheme(theme)(
  ({ className, theme, config }) => {
    const realConfig = config.getIn(
      ['stickers', 'out-of-stock'],
      defaultOutOfStockConfig
    );
    return (
      <div className={cx(theme.outOfStockSticker, className)}>
        <Text>
          {realConfig.getIn(['template', 'single']) ||
            realConfig.get('template')}
        </Text>
      </div>
    );
  }
);
