interface IAssetsStatus {
  deposit_status: number;
  withdrawl_status: number;
}

export interface IGetAssetsStatus {
  status: string;
  data: IAssetsStatus[];
}
