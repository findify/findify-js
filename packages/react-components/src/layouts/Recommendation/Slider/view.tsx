/**
 * @module layouts/Recommendation/Slider
 */

import React, { ReactChildren, ReactElement } from 'react';
import Slider from 'react-slick';

import ProductCard from 'components/Cards/Product'
import Text from 'components/Text';
import { IProduct, ThemedSFCProps, MJSConfiguration } from 'types/index';
import { List } from 'immutable';

/**
 * This is a list of possible props for React-Slick component, added for better typing.
 * For detailed documentation on react-slick please consult https://react-slick.neostack.com/docs/api/
 */
interface IReactSlickProps {
  accessibility?: boolean;
  adaptiveHeight?: boolean;
  afterChange?: (index: number) => any;
  appendDots: (dots: ReactChildren) => React.ReactElement<any>
  arrows?: boolean;
  asNavFor?: (ref: React.Ref<any>) => any;
  autoplaySpeed?: number;
  autoplay?: boolean;
  beforeChange?: (oldIndex: number, newIndex: number) => any;
  centerMode?: boolean;
  centerPadding?: string;
  className?: string;
  customPaging?: (index:number) => React.ReactElement<any>
  dotsClass?: string;
  dots?: boolean;
  draggable?: boolean;
  easing?: string;
  fade?: boolean;
  focusOnSelect?: boolean;
  infinite?: boolean;
  initialSlide?: number;
  lazyLoad?: 'ondemand' | 'progressive';
  onEdge?: (direction: string) => any;
  onInit?: () => void;
  onLazyLoad?: () => any;
  onReInit?: () => void;
  onSwipe?: () => any;
  pauseOnDotsHover?: boolean;
  pauseOnFocus?: boolean;
  pauseOnHover?: boolean;
  responsive?: string[];
  rows?: number;
  rtl?: boolean;
  slide?: string;
  slidesPerRow?: number;
  slidesToScroll?: number;
  slidesToShow?: number;
  speed?: number;
  swipeToSlide?: boolean;
  swipe?: boolean;
  touchMove?: boolean;
  touchThreshold?: number;
  useCSS?: boolean;
  useTransform?: boolean;
  variableWidth?: boolean;
  vertical?: boolean;
}

/** This is a list of props Slider recommendation layout accepts */
interface ISliderProps extends ThemedSFCProps {
  /** List of Products to display */
  items: List<IProduct>;
  /** MJS configuration */
  config: MJSConfiguration;
  /** Any of the options for react-slick library */
  sliderOptions: IReactSlickProps;
  /** Ref to work with react-slick */
  _mountSlider: React.RefObject<any>
}

const SliderRecommendationLayout = ({ items, config, theme, sliderOptions, _mountSlider }: ISliderProps) =>
<>
  <Text title className={theme.title}>
    { config.get('title') }
  </Text>

  <Slider {...sliderOptions} ref={_mountSlider}>
    {
      items
        .map(item =>
          <div key={item.hashCode()}>
            <ProductCard item={item} config={config} />
          </div>
        )
        .toArray()
    }
  </Slider>
</>

export default SliderRecommendationLayout;
