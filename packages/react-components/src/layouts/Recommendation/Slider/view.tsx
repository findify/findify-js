import { Fragment, useMemo } from 'react';
import Swiper from 'layouts/Recommendation/Slider/Swiper';
import ProductCard from 'components/Cards/Product';
import Text from 'components/Text';
import Icon from 'components/Icon';
import cx from 'classnames';
import useColumns from 'helpers/useColumns';
import { useItems } from '@findify/react-connect';
import { Immutable } from '@findify/store-configuration';
import useScrollOnChange from 'helpers/useScrollOnChange';
import styles from 'layouts/Recommendation/Slider/styles.css';

const getSliderOptions = (config) => {
  const columns = useColumns(config.getIn(['breakpoints', 'grid']));

  return {
    navigation: {
      nextEl: `.${config.get('slot')}-next`,
      prevEl: `.${config.get('slot')}-prev`,
    },
    spaceBetween: 12,
    slidesPerView: 12 / Number(columns),
  };
};

export default ({ theme = styles }) => {
  const { items, config } = useItems<Immutable.RecommendationConfig>();
  const options = getSliderOptions(config);

  useScrollOnChange(items);

  return (
    <Fragment display-if={items && items.size > 0}>
      <Text title className={theme.title}>
        {config.get('title')}
      </Text>

      <div className={theme.root}>
        <button
          aria-label="previous"
          className={cx(theme.prev, `${config.get('slot')}-prev`)}
        >
          <Icon
            name="ArrowLeftBig"
            title="Previous slide"
            className={theme.arrow}
          />
        </button>
        <Swiper {...options}>
          {items
            .map((item) => (
              <ProductCard
                key={item.hashCode()}
                item={item}
                config={config.get('product')}
              />
            ))
            .toArray()}
        </Swiper>
        <button
          aria-label="next"
          className={cx(theme.next, `${config.get('slot')}-next`)}
        >
          <Icon
            name="ArrowRightBig"
            title="Next slide"
            className={theme.arrow}
          />
        </button>
      </div>
    </Fragment>
  );
};
