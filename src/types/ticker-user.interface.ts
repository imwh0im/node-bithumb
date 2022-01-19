import { IBithumbResponse } from './bithumb-response.interface';
import { currencyType } from './currency-i18n.interface';

interface ITickerUser {
  order_currency: string;
  payment_currency: currencyType;
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
  date: number;
}

export interface IPostTickerUser extends IBithumbResponse {
  data: ITickerUser;
}
