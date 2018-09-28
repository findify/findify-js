/**
 * @module layouts/Recommendation/Slider
 */

import React, { ReactChildren, ReactElement } from 'react';
import SlickSlider from 'react-slick';

import ProductCard from 'components/Cards/Product'
import Text from 'components/Text';
import { IProduct, ThemedSFCProps, MJSConfiguration } from 'types';
import { List } from 'immutable';

/**
 * This is a list of possible props for React-Slick component, added for better typing.
 * For detailed documentation on react-slick please consult https://react-slick.neostack.com/docs/api/
 */
export interface IReactSlickProps {
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
export interface ISliderProps extends ThemedSFCProps {
  /** List of Products to display */
  items: List<IProduct>;
  /** MJS configuration */
  config: MJSConfiguration;
  /** Any of the options for react-slick library */
  sliderOptions: IReactSlickProps;
  /** Ref to work with react-slick */
  _mountSlider: React.RefObject<any>
}


class Slider extends React.Component{
  componentDidMount(){
    window.addEventListener('touchstart', this.touchStart);
    window.addEventListener('touchmove', this.preventTouch, { passive: false });
  }

  componentWillUnmount(){
    window.removeEventListener('touchstart', this.touchStart);
    window.removeEventListener('touchmove', this.preventTouch, { passive: false });
  }

  touchStart(e){
    this.firstClientX = e.touches[0].clientX;
    this.firstClientY = e.touches[0].clientY;
  }

  preventTouch(e){
    const minValue = 5; // threshold

    this.clientX = e.touches[0].clientX - this.firstClientX;
    this.clientY = e.touches[0].clientY - this.firstClientY;

    // Vertical scrolling does not work when you start swiping horizontally.
    if(Math.abs(this.clientX) > minValue){ 
      e.preventDefault();
      e.returnValue = false;
      return false;
    }
  }
  render() {
    return <SlickSlider {...this.props} ref={this.props.provideRef} />
  }
}

const SliderRecommendationLayout = ({ items, config, theme, sliderOptions, _mountSlider }: ISliderProps) =>
<React.Fragment display-if={items && items.size > 0}>
  <Text title className={theme.title}>
    { config.get('title') }
  </Text>

  <Slider {...sliderOptions} provideRef={_mountSlider}>
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
</React.Fragment>

export default SliderRecommendationLayout;
