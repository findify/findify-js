import { format, currencies, defaultCurrency } from 'currency-formatter';

export interface ICurrencyData {
  code?: string;
  symbol?: string;
  thousandsSeparator?: string;
  decimalSeparator?: string;
  symbolOnLeft?: boolean;
  decimalDigits?: number;
  format?: string;
}

const mapConfigToAccountingFormat = (config: ICurrencyData) => ({
  symbol: config.symbol,
  thousand: config.thousandsSeparator,
  decimal: config.decimalSeparator,
  precision: config.decimalDigits,
  format: config.format || (config.symbolOnLeft ? '%s%v' : '%v%s')
})

const USD = currencies.find(c => c.code === 'USD')

export default (currency: ICurrencyData) => (value: string) => format(
  value,
  mapConfigToAccountingFormat(Object.assign(
    {},
    currencies.find(compare => currency.code === compare.code) || defaultCurrency,
    currency,
  ))
)
