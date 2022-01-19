import { IBithumbResponse } from './bithumb-response.interface';

export interface IBithumbErrorResponse extends IBithumbResponse {
  status: string,
  message: string,
}
