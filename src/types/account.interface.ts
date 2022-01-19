import { IBithumbResponse } from './bithumb-response.interface';

interface IAccount {
  created: number;
  account_id: string;
  order_currency: string;
  payment_currency: string;
  trade_fee: string;
  balance: string;
}

export interface IPostAccount extends IBithumbResponse {
  data: IAccount;
}
