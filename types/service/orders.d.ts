import { IBithumbResponse } from './bithumb-response';
import { currecnyType } from './currency-i18n';

interface IOrder {
  order_currency: string;
  payment_currency: currecnyType;
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
