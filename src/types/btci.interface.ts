import { IBithumbResponse } from './bithumb-response.interface';

interface IBtciData {
  marker_index: string;
  width: string;
  rate: string
}

export interface IGetBtci extends IBithumbResponse {
  data: {
    btai: IBtciData;
    btmi: IBtciData;
    date: string;
  };
}
