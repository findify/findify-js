import accounting from 'accounting';

export interface ICurrencyData {
  symbol?: string;
  thousandsSeparator?: string;
  decimalSeparator?: string;
  symbolOnLeft?: boolean;
  decimalDigits?: number;
  spaceBetweenAmountAndSymbol?: boolean;
  format?: {
    pos: string,
    neg: string,
    zero: string
  };
}

const formatMapping = [
  {
    symbolOnLeft: true,
    spaceBetweenAmountAndSymbol: false,
    format: {
      pos: '%s%v',
      neg: '-%s%v',
      zero: '%s%v'
    }
  },
  {
    symbolOnLeft: true,
    spaceBetweenAmountAndSymbol: true,
    format: {
      pos: '%s %v',
      neg: '-%s %v',
      zero: '%s %v'
    }
  },
  {
    symbolOnLeft: false,
    spaceBetweenAmountAndSymbol: false,
    format: {
      pos: '%v%s',
      neg: '-%v%s',
      zero: '%v%s'
    }
  },
  {
    symbolOnLeft: false,
    spaceBetweenAmountAndSymbol: true,
    format: {
      pos: '%v %s',
      neg: '-%v %s',
      zero: '%v %s'
    }
  }
];

const defaultCurrency = {
  symbol: '',
  thousandsSeparator: ',',
  decimalSeparator: '.',
  symbolOnLeft: true,
  spaceBetweenAmountAndSymbol: false,
  decimalDigits: 2
}

export default (currency: ICurrencyData = defaultCurrency) => (value: string) =>
accounting.formatMoney(value, {
  ...currency,
  format: currency.format || (formatMapping as any).find(f =>
      f.symbolOnLeft === currency.symbolOnLeft &&
      f.spaceBetweenAmountAndSymbol === currency.spaceBetweenAmountAndSymbol
    ).format
})
