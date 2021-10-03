import { IBithumbResponse } from './bithumb-response';

type currencyType = string
type totalCoinType = `total_${currencyType}`;
type inUseType = `in_use_${currencyType}`;
type availableType = `available_${currencyType}`;
type xcoinLastType = `xcoin_last_${currencyType}`;

interface IBalance {
  total_coin: {
    [k in totalCoinType]: string;
  };
  total_krw: string;
  in_use: {
    [k in inUseType]: string;
  };
  
}
export interface IPostBalance extends IBithumbResponse {
  data: IBalance;
}

// "total_btc" : "665.40127447",
// "total_krw" : "305507280",
// "in_use_btc" : "127.43629364",
// "in_use_krw" : "8839047.0000000000",
// "available_btc" : "537.96498083",
// "available_krw" : "294932685.000000000000",
// "xcoin_last_btc": "505000"