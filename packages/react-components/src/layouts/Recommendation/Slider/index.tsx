/**
 * @module components/Dropdown
 */
import { useItems } from '@findify/react-connect';
import { Immutable } from '@findify/store-configuration';
import ProductCard from 'components/Cards/Product';
import Swiper from 'components/Swiper';
import Text from 'components/Text';
import { hideLoader } from 'helpers/loader';
import useColumns from 'helpers/useColumns';
import useScrollOnChange from 'helpers/useScrollOnChange';
import styles from 'layouts/Recommendation/Slider/styles.css';

const getSliderOptions = (config) => {
  const columns = useColumns(config.getIn(['breakpoints', 'grid']));

  return {
    spaceBetween: 12,
    slidesPerView: 12 / Number(columns),
  };
};

export default ({ theme = styles }) => {
  const { items, config } = useItems<Immutable.RecommendationConfig>();
  const options = getSliderOptions(config);

  useScrollOnChange(items);

  hideLoader();
  if (!items?.size) return null;
  return (
    <>
      <Text title component="p" className={theme.title}>
        {config.get('title')}
      </Text>
      <Swiper {...options} slot={config.get('slot')}>
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
    </>
  );
};
