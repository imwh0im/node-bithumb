import { IBithumbResponse } from './bithumb-response.interface';

export interface IPostMarketBuy extends IBithumbResponse {
  order_id: string;
}
