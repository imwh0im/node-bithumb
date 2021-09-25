import { IBithumbResponse } from './bithumb-response';

export interface IPostMarketSell extends IBithumbResponse {
  order_id: string;
}
