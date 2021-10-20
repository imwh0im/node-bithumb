import { IBithumbResponse } from './bithumb-response';

export interface IBithumbErrorResponse extends IBithumbResponse {
  status: string,
  message: string,
}
