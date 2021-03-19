import {
  Autocomplete, Search, SmartCollection, Recommendations, Content
} from '@findify/sdk/lib/request'
import { ProductType } from './ProductType';
import { Breakpoints } from './Breakpoints';

export type RequestParams = {
  Autocomplete: Autocomplete.Params,
  Search: Search.Params,
  SmartCollection: SmartCollection.Params,
  Recommendation: Recommendations.Slot,
  Content: Content.Params,
}

type IBaseFeature<T extends keyof RequestParams> = {
  /**
   * Should widget send request right after creation
   * Helpful if widget is created manually and you need to set
   * default request properties
   */
	disableAutoRequest: boolean

  /**
   * Default widget request params
  */
  defaultRequestParams: Partial<RequestParams[T]>

  /**
   * Product card setup
  */
  product: ProductType

  /**
   * Layout breakpoints definition 
   */
  breakpoints: {
    grid: Breakpoints
  }
}

export type BaseFeature<T = undefined> = T extends keyof RequestParams
  ? IBaseFeature<T>
  : Omit<IBaseFeature<any>, 'defaultRequestParams'>;

