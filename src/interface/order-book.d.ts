interface IBidAsks {
  quantity: string;
  price: string;
}

export interface IGetOrderBook {
  status: string;
  data: {
    timestamp: string;
    order_currency: string;
    payment_currency: string;
    bids: IBidAsks[];
    asks: IBidAsks[];
  }
}
