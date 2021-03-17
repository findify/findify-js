import {
  Autocomplete, Search, SmartCollection, Recommendations, Content
} from '@findify/sdk/types/request'
import { ProductType } from './ProductType';
import { Breakpoints } from './Breakpoints';

type RequestTypes = {
  Autocomplete: Autocomplete.Params,
  Search: Search.Params,
  SmartCollection: SmartCollection.Params,
  Recommendations: Recommendations.Params,
  Content: Content.Params,
}

export type BaseFeature<T extends keyof RequestTypes> = {
  /**
   * Should widget send request right after creation
   * Helpful if widget is created manually and you need to set
   * default request properties
   */
	disableAutoRequest: boolean

  /**
   * Default widget request params
  */
  meta: RequestTypes[T]

  /**
   * Product card setup
  */
  product: ProductType

  /**
   * 
   */
  breakpoints: {
    grid: Breakpoints
  }
}
