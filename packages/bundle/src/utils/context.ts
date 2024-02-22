enum Platform {
    shopify = 'shopify',
    maropost = 'maropost',
    bigcommerce = 'bigcommerce',
}

declare global {
    interface Window { Shopify?: { locale: string, country: string, currency: { active: string; rate: string; } } }
}

export const getContext = (config) => {
    switch (config.get('platform')) {
        case Platform.shopify:
            return getShopifyContext();
        case Platform.maropost:
            return getMaropostContext();
        case Platform.bigcommerce:
            return getBigCommerceContext();
        default:
            return getCustomContext();
    }
}

const getShopifyContext = () => {
    if (!window.Shopify) return {};
    return {
        language: window.Shopify.locale,
        region: window.Shopify.country,
        currency: window.Shopify.currency.active,
    }
}

const getMaropostContext = () => ({})

const getBigCommerceContext = () => ({})

const getCustomContext = () => ({})