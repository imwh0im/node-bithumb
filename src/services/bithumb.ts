import axios, { AxiosResponse } from 'axios';

import {
  currencyType,
  getEndpointType,
  postEndpointType,

  IGetTicker,
  IGetOrderBook,
  IBithumbResponse,
  IGetTransactionHistory,
  IGetAssetsStatus,
  IGetBtci,
  IPostAccount,
  IPostBalance,
  IPostWalletAddress,
} from '../interface';

export default class ApiBithumb {
  constructor(
    private apiKey: string,
    private secretKey: string,
    private paymentCurrency: currencyType,
  ) {
    this.apiKey = apiKey;
    this.secretKey = secretKey;
    this.paymentCurrency = paymentCurrency;
  }

  /**
   * Bithumb hosts
   */
  private hosts = {
    publicHost: 'https://api.bithumb.com/public',
    infoHost: 'https://api.bithumb.com/info',
    tradeHost: 'https://api.bithumb.com/trade',
  };

  /**
   * Provides the current price of the asset in the bithumb
   * https://apidocs.bithumb.com/docs/ticker
   */
  public async getTicker(coinCode: string): Promise<IGetTicker> {
    const param = `${coinCode}_${this.paymentCurrency}`;
    const res = <IGetTicker> await this.requestPublic('ticker', param);
    return res;
  }

  /**
   * Provides current sales information for assets in the bithumb
   * https://apidocs.bithumb.com/docs/order_book
   */
  public async getOrderBook(coinCode: string): Promise<IGetOrderBook> {
    const param = `${coinCode}_${this.paymentCurrency}`;
    const res = <IGetOrderBook> await this.requestPublic('orderbook', param);
    return res;
  }

  /**
   * Provides details of the completion of the transaction in the bithumb
   * https://apidocs.bithumb.com/docs/transaction_history
   */
  public async getTransactionHistory(coinCode: string): Promise<IGetTransactionHistory> {
    const param = `${coinCode}_${this.paymentCurrency}`;
    const res = <IGetTransactionHistory> await this.requestPublic('transaction_history', param);
    return res;
  }

  /**
   * Provides information about the status of an asset's deposits and withdrawals in the bithumb
   * https://apidocs.bithumb.com/docs/assets_status
   */
  public async getAssetsStatus(orderCurrency: string): Promise<IGetAssetsStatus> {
    const res = <IGetAssetsStatus> await this.requestPublic('assetsstatus', orderCurrency);
    return res;
  }

  /**
   * Provides Bithumb Index (BTMI, BTAI) information.
   * https://apidocs.bithumb.com/docs/btci
   */
  public async getBtci(): Promise<IGetBtci> {
    const res = <IGetBtci> await this.requestPublic('btci');
    return res;
  }

  /**
   * Provide information on membership and coin transaction fees.
   * https://apidocs.bithumb.com/docs/account
   */
  public async getAccount(coinCode: string): Promise<IPostAccount> {
    const params = {
      order_currency: coinCode,
    };
    const res = <IPostAccount> await this.requestInfo('account', params);
    return res;
  }

  /**
   * Provide information on assets held by members.
   * This API Response could be change the name on the key.
   * https://apidocs.bithumb.com/docs/balance
   */
  public async getBalance(coinCode?: string): Promise<IPostBalance> {
    const params = {
      currency: coinCode || 'BTC',
    };
    const res = <IPostBalance> await this.requestInfo('balance', params);
    return res;
  }

  /**
   * Provide the address of the member's coin deposit wallet.
   * https://apidocs.bithumb.com/docs/wallet_address
   */
  public async getWalletAddress(coinCode?: string): Promise<IPostWalletAddress> {
    const params = {
      currency: coinCode || 'BTC',
    };
    const res = <IPostWalletAddress> await this.requestInfo('wallet_address', params);
    return res;
  }

  /**
   * request Public API
   */
  private async requestPublic(endpoint: getEndpointType, param?: string): Promise<IBithumbResponse> {
    const res: AxiosResponse<IBithumbResponse> = await axios.get(
      `${this.hosts.publicHost}/${endpoint}/${param || ''}`,
    );
    this.checkStatus(res);
    return res.data;
  }

  /**
   * request Info API
   */
  private async requestInfo(endpoint: postEndpointType, params?: Record<string, unknown>): Promise<IBithumbResponse> {
    const param = {
      params,
      ...{
        apiKey: this.apiKey,
        secretKey: this.secretKey,
        paymentCurrency: this.paymentCurrency,
      },
    };
    const res: AxiosResponse<IBithumbResponse> = await axios.post(
      `${this.hosts.infoHost}/${endpoint}`,
      param,
    );
    this.checkStatus(res);
    return res.data;
  }

  /**
   * Check the status and throw
   */
  private checkStatus(res: AxiosResponse<IBithumbResponse>): void {
    if (res.data?.status !== '0000') {
      throw new Error(
        `Error: ${JSON.stringify(res)}
        Check the documents: https://apidocs.bithumb.com/docs/err_code`,
      );
    }
  }
}
