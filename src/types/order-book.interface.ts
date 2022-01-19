import { IBithumbResponse } from './bithumb-response.interface';

interface IBidAsks {
  quantity: string;
  price: string;
}

export interface IGetOrderBook extends IBithumbResponse {
  data: {
    timestamp: string;
    order_currency: string;
    payment_currency: string;
    bids: IBidAsks[];
    asks: IBidAsks[];
  }
}
