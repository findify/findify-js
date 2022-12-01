import * as enums from './enums'
import { Autocomplete } from './Autocomplete'
import { Recommendation } from './Recommendation'
import { Search } from './Search'
import { Content } from './Content'
import { Method } from '@findify/sdk/lib/request'
import { Translations } from './Translations';

export type Config = {
  /** Merchant API key */
  key: string

  /** Merchant ID, required to connect Chrome DevTools */
  merchantId: number

  /** Store status */
  status: keyof typeof enums.StoreStatus

  /** Store platform. Generic by default */
  platform: keyof typeof enums.Platform

  /** Breakpoint after reaching that view will switch to desktop mode */
  mobileBreakpoint: number

  /** Request method type */
  api: {
    method: Method
  }

  /** Disable event tracking in analytics */
  analytics?: {
    [key in keyof typeof enums.AnalyticsEventKey]?: false
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
    keys?: string[],
    /** Default path, e.g: /eu */
    defaultPath?: string
  }

  /** Custom nodes mapping where widgets will be attached */
  selectors: {
    [selector: string]: keyof typeof enums.Feature
  }

  /** Currency display setup */
  currency: {
    code: string,
    symbol: string,
    thousand: string,
    decimal: string,
    symbolOnLeft: boolean,
    spaceBetweenAmountAndSymbol: boolean,
    precision: number
  }

  /** List of collection urls */
  collections: string[]

  /** Features setup. On feature level specific config should be merged with the root */
  features: {
    autocomplete: Autocomplete,
    search: Search,
    content: {
      [key: string]: Content
    }
    recommendations: {
      [key: string]: Recommendation
    },
  }

  /** Sticker component display options */
  stickers: {
    discount: boolean
    outOfStock: boolean
  }

  /** Map colors from value to hex or url  */
  colorMapping: {
    [key: string]: string
  }

  /** Translations */
  translations: Translations

  /** Customizations */
  components: {
    [key: string]: () => void
  }

  /** Map redirection url set within MD  */
  redirections?: {
    [key: string]: string
  }

  platform_settings?: {
    multi_market?: boolean
  }

}
