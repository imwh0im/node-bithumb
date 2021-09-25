type infoEndpointType = 'account' | 'balance' | 'wallet_address' | 'ticker' | 'orders' | 'order_detail' | 'user_transactions';
type tradeEndpointType = 'place' | 'cancel';

export type postEndpointType = infoEndpointType | tradeEndpointType;
