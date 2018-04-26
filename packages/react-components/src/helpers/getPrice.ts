import { isImmutable, List } from 'immutable'
import formatCurrency from 'helpers/formatCurrency';

const arrayOrImmutableList = (candidate: any[] | List<any>) => (
  Array.isArray(candidate) || (isImmutable(candidate) && (candidate.length || candidate.size))
)


export const priceIsSampleArray = price => {
  if (!arrayOrImmutableList(price)) return false;
  return price.reduce((a, b) => (a === b ? a : void 0)) !== void 0;
};

export const getPrice = (maybeImmutablePrice, currency) => {
  const format = formatCurrency(currency)
  if (!arrayOrImmutableList(maybeImmutablePrice)) return format(maybeImmutablePrice);
  const price = Array.isArray(maybeImmutablePrice) ? maybeImmutablePrice : maybeImmutablePrice.toJS()

  if (price.reduce((a, b) => (a === b ? a : void 0)) !== void 0) {
    return format(price[0]);
  }

  return [
    format(Math.min.apply(Math, price)),
    format(Math.max.apply(Math, price)),
  ].join(' - ');
};
