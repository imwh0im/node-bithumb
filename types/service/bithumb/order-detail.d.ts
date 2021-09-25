import { IBithumbResponse } from './bithumb-response';
import { currencyType } from './currency-i18n'

interface IContract {
  transaction_date: string;
  price: string;
  units: string;
  fee_currency: currencyType;
  fee: string;
  total: string;
}

interface IOrderDetail {
  transction_date: string;
  type: 'bid' | 'ask';
  order_status: string;
  order_currency: string;
  payment_currency: currencyType;
  order_price: string;
  order_qty: string;
  cancel_date: string;
  cancel_type: string;
  contract: IContract[];
}

export interface IPostOrderDetail extends IBithumbResponse {
  data: IOrderDetail[];
}
