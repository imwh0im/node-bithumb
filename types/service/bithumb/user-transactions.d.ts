import { IBithumbResponse } from './bithumb-response';

interface IUserTransactions {
  search: string;
  transfer_date: number;
  order_currenecy: string;
  payment_currency: string;
  units: string;
  price: string;
  amount: string;
  fee_currency: string;
  fee: string;
  order_balance: string;
  payment_balance: string;
}

export interface IPostUserTransactions extends IBithumbResponse {
  data: IUserTransactions[];
}
