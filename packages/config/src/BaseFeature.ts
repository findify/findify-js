import * as Request from '@findify/sdk/lib/request'
import { ProductType } from './ProductType';

export type RequestParams = {
  Autocomplete: Request.Autocomplete.Params,
  Search: Request.Search.Params,
  SmartCollection: Request.SmartCollection.Params,
  Recommendation: Request.Recommendations.Slot,
  Content: Request.Content.Params,
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
}

export type BaseFeature<T = undefined> = T extends keyof RequestParams
  ? IBaseFeature<T>
  : Omit<IBaseFeature<any>, 'defaultRequestParams'>;

