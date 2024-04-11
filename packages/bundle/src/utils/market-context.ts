enum Platform {
  shopify = 'shopify',
  maropost = 'maropost',
  bigcommerce = 'bigcommerce',
}

declare global {
  interface Window {
    Shopify?: {
      locale: string;
      country: string;
      currency: { active: string; rate: string };
    };
  }
}

export const getMarketContext = (config) => {
  switch (config.get('platform')) {
    case Platform.shopify:
      return getShopifyMarketContext();
    case Platform.maropost:
      return getMaropostMarketContext();
    case Platform.bigcommerce:
      return getBigCommerceMarketContext();
    default:
      return getCustomMarketContext();
  }
};

const getShopifyMarketContext = () => {
  if (!window.Shopify) return {};
  return {
    locale: window.Shopify.locale,
    region: window.Shopify.country,
    currency: window.Shopify.currency?.active,
  };
};

const getMaropostMarketContext = () => ({});

const getBigCommerceMarketContext = () => ({});

const getCustomMarketContext = () => ({});
