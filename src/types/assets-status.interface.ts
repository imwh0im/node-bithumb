import { IBithumbResponse } from './bithumb-response.interface';

interface IAssetsStatus {
  deposit_status: number;
  withdrawl_status: number;
}

export interface IGetAssetsStatus extends IBithumbResponse {
  data: IAssetsStatus[];
}
