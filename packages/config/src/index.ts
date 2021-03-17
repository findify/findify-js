import * as enums from './enums';
import { Autocomplete } from './Autocomplete'
import { Recommendation } from './Recommendation'
import { Search } from './Search'
import { Content } from './Content'
import { Method } from '@findify/sdk/types/request'

type Config = {
  /** Merchant API key */
  key: string

  /** Merchant ID, required to connect Chrome DevTools */
  merchant_id: number

  /** Store status */
  status: enums.StoreStatus

  /** Store platform. Generic by default */
  platform: {
    [key in enums.Platform]?: boolean
  }

  /** Disable event tracking in analytics */
  analytics?: {
    [key in enums.AnalyticsEventKey]?: false
  }

  api: {
		method: Method
	}

  /**
   * Should observe dom change to dynamically attach/detach widgets
   * @warn this change may slow down website
   */
	observeDomChanges: boolean

  /** URL management configuration */
  location: {
    /** 
     * Search page url
     * - Search widget will be rendered only on this URL
     * - Autocomplete will redirect to this page
    */
    searchUrl: string,
    /** Search query prefix eq(?findify_q) */
    prefix: string,
    /** Reserved search query keys to keep custom query like UTM tags */
    keys?: string[]
  }

  /** Custom nodes mapping where widgets will be attached */
  selectors: {
    [selector: string]: enums.Feature
  }

  /** Currency display setup */
  currency: {
    code: string, 
    symbol: string,
    thousandsSeparator: boolean,
    decimalSeparator: string,
    symbolOnLeft: boolean,
    spaceBetweenAmountAndSymbol: boolean,
    decimalDigits: number
  }

  collections: string[]

  /** Features setup. On feature level specific config should be merged with the root */
  features: {
    autocomplete: Autocomplete,
    search: Search,
    content: Content
    recommendations: {
      [key: string]: Recommendation
    },
  }

  translations: {
    [key: string]: string
  }

  /** customizations */
  components: {
    [key: string]: () => void
  }
}

export {
  Config,
  Autocomplete,
  Search,
  Content,
  Recommendation,
  enums as Types
}
