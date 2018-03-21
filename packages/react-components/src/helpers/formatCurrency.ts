import { format } from 'currency-formatter';

export default (currency: any) => (value: string) => format(value, currency);
