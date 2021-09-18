import { IBithumbResponse } from './bithumb-response';
import { currecnyType } from './currency-i18n';

interface ITickerUser {
  order_currency: string;
  payment_currency: currecnyType;
  opening_price: string;
  closing_price: string;
  min_price: string;
  max_price: string;
  average_price: string;
  units_traded: string;
  volume_1day: string;
  volume_7day: string;
  fluctate_24H: string;
  fluctate_rate_24H: string
  date: numbee;
}

export interface IGetTickerUser extends IBithumbResponse {
  data: ITickerUser;
}
