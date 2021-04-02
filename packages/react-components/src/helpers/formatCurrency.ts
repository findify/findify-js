import accounting from 'accounting';
import memoizeOne from 'memoize-one';

export interface ICurrencyData {
  symbol?: string;
  thousand?: string;
  decimal?: string;
  precision?: number;
  symbolOnLeft?: boolean;
  spaceBetweenAmountAndSymbol?: boolean;
  format?: {
    pos: string;
    neg: string;
    zero: string;
  };
}

const formatMapping = [
  {
    symbolOnLeft: true,
    spaceBetweenAmountAndSymbol: false,
    format: {
      pos: '%s%v',
      neg: '-%s%v',
      zero: '%s%v',
    },
  },
  {
    symbolOnLeft: true,
    spaceBetweenAmountAndSymbol: true,
    format: {
      pos: '%s %v',
      neg: '-%s %v',
      zero: '%s %v',
    },
  },
  {
    symbolOnLeft: false,
    spaceBetweenAmountAndSymbol: false,
    format: {
      pos: '%v%s',
      neg: '-%v%s',
      zero: '%v%s',
    },
  },
  {
    symbolOnLeft: false,
    spaceBetweenAmountAndSymbol: true,
    format: {
      pos: '%v %s',
      neg: '-%v %s',
      zero: '%v %s',
    },
  },
];

const defaultCurrency = {
  symbol: '',
  thousand: ',',
  decimal: '.',
  precision: 2,
  symbolOnLeft: true,
  spaceBetweenAmountAndSymbol: false,
};

export default memoizeOne(
  (currency: ICurrencyData = defaultCurrency) => (value: string) =>
    accounting.formatMoney(value, {
      ...currency,
      format:
        currency.format ||
        (formatMapping as any).find(
          (f) =>
            f.symbolOnLeft === currency.symbolOnLeft &&
            f.spaceBetweenAmountAndSymbol ===
              currency.spaceBetweenAmountAndSymbol
        ).format,
    })
);
