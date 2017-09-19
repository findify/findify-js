## Hooks description:

### *.results
> Component: [ResultsLayout](https://github.com/findify/ui-components/blob/master/src/layouts/ResultsLayout/index.tsx)

#### props
```javascript
{
  /**
  * Defines size of columns in results layout. 
  * By default UI-components uses 12 columns grid system,
  * it means 12 = 100%; 6 = 50%; 2 = 16.6% etc.
  */
  columns {
    facets: 4, // Facets block width
    products: 8 // Products grid width
  }

  /**
  * Response from Findify API
  */
  response: {
    banner: {},
    facets: [],
    items: [],
    meta: {}
  }

  /**
  * Findify analytics instance.
  * It allow you to get information about current user and send events to Findify
  */
  analytics: {
    getUser: () => { sid, id } // Function which returns sid and id, specific tracking labels
    isUserPersist: true || false // true means this user already was website
    sendEvent: (event, data) => Promise // You can track events here, but better to do it in [didMount] hook
  }

  /**
  * Immutable state of DOM node, which widget belongs to
  */
  node: { // Immutable Map
    get instance: () => {} // will return DOMNode where you has initialized widget
    get position: () => {} // will return Immutable position of DOMNode
  }

  /**
  * Defines view of layout
  * if [true], facets will be hidden and filter button will be added
  */
  isMobile: true || false
}
```
#### usage
```javascript
window.findifyApiRegistry = [
  {
    hook: '*.results',
    mapProps: functions(props) {
      if (isMobile) {
        return { isMobile: false, columns: { facets: 12, products: 12 } }
      }
      return {};
    },
  }
]

```

### *.grid
> Component: [Grid](https://github.com/findify/ui-components/blob/master/src/widgets/Grid/index.tsx)

#### props
```javascript
{
  className: undefined // Custom class which will be added to grid wrapper
  columns: 4 // Number of items in row, but 
  size: {
    width: Number // Width of grid wrapper
  }
  items: [] // Array of items which will be rendered, you can slice or sort them
}
```
#### usage
```javascript
window.findifyApiRegistry = [
  {
    hook: '*.grid',
    mapProps: functions(props) {
      var width = props.size.width;
      if (width > 1000) {
        return { columns: 6 } // 12 must be divisible by this number without a remainder
      }
      return {};
    },
  }
]

```

### *.carousel
> Component: [ProductsCarousel](https://github.com/findify/ui-components/blob/master/src/widgets/ProductsCarousel/index.tsx)

#### props
```javascript
{
  className: undefined // Custom class which will be added to grid wrapper
  slidesToShow: 6 // Count of items which will be displayed in view
  size: {
    width: Number // Width of grid wrapper
  }

  /**
  * Response from Findify API
  */
  response: {
    banner: {},
    facets: [],
    items: [],
    meta: {}
  },

  items: [] // Prepared list of items, based on configuration 

  config: {
    // ...default feature config,
    slickSetting: { // Slick slider settings, will extend default settings
      infinite: false,
      slidesToShow: 5,
      slidesToScroll: 1,
      arrows: true,
      lazyLoad: false, 
    }
  }

  /**
  * Defines view of layout
  * if [true], facets will be hidden and filter button will be added
  */
  isMobile: true || false

  /**
  * Immutable state of DOM node, which widget belongs to
  */
  node: { // Immutable Map
    get instance: () => {} // will return DOMNode where you has initialized widget
    get position: () => {} // will return Immutable position of DOMNode
  }

}
```

#### usage
```javascript
window.findifyApiRegistry = [
  {
    hook: '*.carousel',
    mapProps: functions(props) {
      var config = props.config;
      config.slickSetting = {
        arrows: false,
        dots: true
      };
      return { config: config };
    },
  }
]

```


### *.item
> Component: [Product](https://github.com/findify/ui-components/blob/master/src/widgets/Product/index.tsx)

#### props
```javascript
{
  ... // Product fields from FINDIFY API
  config: {
    currency: {
      code: 'EUR' // Currency settings
    },
    title: {
      display: true, // Show/Hide title
      lines: 3 // Max number of lines in title
    },
    description: {
      display: true, // Show/Hide description
      lines: 3 // Max number of lines in description
    },
    price: {
      display: true, // Show/Hide price
    },
    stickers: { // Stickers configuration, sticker type is a key
      discount: {
        position: "bottom-center", // Position of sticker
        template: {
          multiple: '' // Sticker text for product with multiple prices
          single: '' // Sticker text for single discount
        },
        styles: {
          ... // inline CSS styles for sticker, should be in camelCase
        }
      }
    }
  }
}
```
#### usage
```javascript
window.findifyApiRegistry = [
  {
    hook: '*.item',
    mapProps: functions(props) {
      var hasExtraSticker = props.tags.indexOf('sale') > -1;
      if (extraSticker) {
        return {
          description: {
            display: false,
          },
          title: {
            display: false
          },
          stickers: {
            discount: {
              position: "top-left",
              template: {
                multiple: ''
                single: ''
              },
              styles: {
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundImage: 'http://....'
              }
            }
          }
        }
      }
      return {};
    },
  }
]

```


### *.facets
> Component: [FacetsList](https://github.com/findify/ui-components/blob/master/src/lists/FacetsList/index.tsx)

#### props
```javascript
{

  /**
  * Response from Findify API
  */
  response: {
    banner: {},
    facets: [],
    items: [],
    meta: {}
  }

  /**
  * Defines view of layout
  * if [true], facets will will be wrapped with mobile container
  */
  isMobile: true || false
}
```


### *.facet
> Components: [CategoryFacet](https://github.com/findify/ui-components/blob/master/src/widgets/CategoryFacet/index.tsx), 
> [CheckboxFacet](https://github.com/findify/ui-components/blob/master/src/widgets/CheckboxFacet/index.tsx), 
> [ColorFacet](https://github.com/findify/ui-components/blob/master/src/widgets/ColorFacet/index.tsx), 
> [PriceFacet](https://github.com/findify/ui-components/blob/master/src/widgets/PriceFacet/index.tsx), 
> [RangeFacet](https://github.com/findify/ui-components/blob/master/src/widgets/RangeFacet/index.tsx), 
> [RatingFacet](https://github.com/findify/ui-components/blob/master/src/widgets/RatingFacet/index.tsx), 

#### props
```javascript
{

  label: String // Facet title,
  type: String // Facet type
  name: String // Field name
  values: [] // Facet values, you can slice or sort them,
  config: {} // Specific facet settings, check on GitHub
}
```

#### usage
```javascript
window.findifyApiRegistry = [
  {
    hook: '*.facet',
    mapProps: functions(props) {
      var config = props.config;
      var name = props.name;
      var values = props.values;

      if (name === 'brand') {
        config.i18n.search = 'Search for brand:'
      }

      return {
        config: config,
        values: _.sort(values, ['value'])
      };
    },
  }
]

```
