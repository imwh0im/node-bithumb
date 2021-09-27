import { IBithumbResponse } from './bithumb-response';

interface IWallerAddress {
    wallet_address: string;
    currency: string;
}

export interface IPostWalletAddress extends IBithumbResponse {
  data: IWallerAddress;
}
