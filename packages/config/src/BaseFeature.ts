import {
  Autocomplete, Search, SmartCollection, Recommendations, Content
} from '@findify/sdk/types/request'
import { ProductType } from './ProductType';
import { Breakpoints } from './Breakpoints';

export type RequestParams = {
  Autocomplete: Autocomplete.Params,
  Search: Search.Params,
  SmartCollection: SmartCollection.Params,
  Recommendations: Recommendations.Params,
  Content: Content.Params,
}

export type BaseFeature<T extends keyof RequestParams> = {
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
