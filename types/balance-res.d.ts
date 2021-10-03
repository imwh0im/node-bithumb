import { IBithumbResponse } from './bithumb-response';

// https://apidocs.bithumb.com/docs/balance
export interface IBalanceResponse extends IBithumbResponse {
  data: Record<string, string>;
}
