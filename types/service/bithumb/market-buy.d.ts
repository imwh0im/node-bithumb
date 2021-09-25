import { IBithumbResponse } from './bithumb-response';

export interface IPostMarketBuy extends IBithumbResponse {
  order_id: string;
}
