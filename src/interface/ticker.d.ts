export interface IGetTicker {
  status: string;
  data: {
    opening_price: string;
    closing_price: string;
    min_price: string;
    max_price: string;
    units_traded: string;
    acc_trade_value: string;
    prev_closing_price: string;
    units_traded_24H: string;
    acc_trade_value_24H: string;
    fluctate_24H: string;
    flutate_rate_24H: string;
    date: string;
  };
}
