import { IBithumbResponse } from './bithumb-response';

interface IBalance {
  total_coin: string
  total_krw: string;
  in_use_coin: string;
  in_use_krw: string;
  available_coin: string;
  available_krw: string
  xcoin_last_coin: string;
}
export interface IPostBalance extends IBithumbResponse {
  data: IBalance;
}
