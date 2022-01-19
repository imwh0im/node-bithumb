import { IBithumbResponse } from './bithumb-response.interface';

interface IWallerAddress {
    wallet_address: string;
    currency: string;
}

export interface IPostWalletAddress extends IBithumbResponse {
  data: IWallerAddress;
}
