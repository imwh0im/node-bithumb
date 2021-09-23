export interface IPostOrdersParams {
  orderId?: string;
  type?: 'bid' | 'ask';
  count?: number;
  after?: number;
  orderCurrency: string;
}
