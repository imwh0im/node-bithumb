import { IBithumbResponse } from './bithumb-response.interface';

export interface IPostMarketSell extends IBithumbResponse {
  order_id: string;
}
