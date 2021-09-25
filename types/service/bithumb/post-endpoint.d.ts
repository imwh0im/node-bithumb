type infoEndpointType = 'account' | 'balance' | 'wallet_address' | 'ticker' | 'orders' | 'order_detail' | 'user_transactions';
type tradeEndpointType = 'place' | 'cancel' | 'market_buy' | 'market_sell';

export type postEndpointType = infoEndpointType | tradeEndpointType;
