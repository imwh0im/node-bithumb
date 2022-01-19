import { IBithumbResponse } from './bithumb-response.interface';
import { currencyType } from './currency-i18n.interface';

interface IOrder {
  order_currency: string;
  payment_currency: currencyType;
  order_id: string;
  order_data: string;
  type: string;
  units: string;
  units_remaining: string;
  price: string;
}

export interface IPostOrders extends IBithumbResponse {
  data: IOrder[]
}
