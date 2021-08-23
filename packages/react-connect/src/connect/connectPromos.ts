import createConnect from './createConnect';
import { Item } from '../immutable/item';
import { List, Map } from 'immutable';
import { Immutable } from '@findify/store-configuration';

type PromoCard = {
  position: number;
  cards: [
    {
      type: 'banner';
      redirectLink?: string;
      title?: string;
      topHeader?: string;
      subHeader?: string;
      ctaText?: string;
      footer?: string;
      imageUrl?: string;
    }
  ];
};

type Promo = {
  /** List of items */
  items: List<Immutable.Factory<PromoCard>>;
};

/**
 * Used to connect to items field of response, which is subset of products,
 * enhance it with Analytics and pass down further the modified products
 */
const { hook, connect } = createConnect<Promo>({
  field: 'promoSpots',
  mapProps: (items) => ({
    items: items?.map(Map) || List(),
  }),
});

export { hook, connect };
