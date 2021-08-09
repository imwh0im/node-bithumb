interface ITransactionHistory {
  transaction_date: string;
  type: string;
  units_traded: string;
  price: string;
  total: string;
}

export interface IGetTransactionHistory {
  status: string;
  data: ITransactionHistory[];
}
