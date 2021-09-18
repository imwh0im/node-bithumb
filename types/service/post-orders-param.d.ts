export interface IPostOrdersParams {
  orderOd?: string;
  type?: 'bid' | 'ask';
  count?: number;
  after?: number;
  orderCurrency: string;
}
