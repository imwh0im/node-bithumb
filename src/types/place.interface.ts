import { IBithumbResponse } from './bithumb-response.interface';

export interface IPostPlace extends IBithumbResponse {
  order_id: string;
}
