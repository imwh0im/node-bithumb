import axios, { AxiosResponse } from 'axios';

import {
  currencyType,
  getEndpointType,

  IGetTicker,
  IGetOrderBook,
  IBithumbResponse,
  IGetTransactionHistory,
  IGetAssetsStatus,
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
   * Bithumb public host
   */
  private publicHost = 'https://api.bithumb.com/public';

  /**
   * Bithumb private host
   */
  private privateHost = 'https://api.bithumb.com/private';

  /**
   * Provides the current price of the asset in the bithumb
   * https://apidocs.bithumb.com/docs/ticker
   */
  public async getTicker(coinCode: string): Promise<IGetTicker> {
    const param = `${coinCode}_${this.paymentCurrency}`;
    const res = <IGetTicker> await this.requestGet('ticker', param);
    return res;
  }

  /**
   * Provides current sales information for assets in the bithumb
   * https://apidocs.bithumb.com/docs/order_book
   */
  public async getOrderBook(coinCode: string): Promise<IGetOrderBook> {
    const param = `${coinCode}_${this.paymentCurrency}`;
    const res = <IGetOrderBook> await this.requestGet('orderbook', param);
    return res;
  }

  /**
   * Provides details of the completion of the transaction in the bithumb
   * https://apidocs.bithumb.com/docs/transaction_history
   */
  public async getTransactionHistory(coinCode: string): Promise<IGetTransactionHistory> {
    const param = `${coinCode}_${this.paymentCurrency}`;
    const res = <IGetTransactionHistory> await this.requestGet('transaction_history', param);
    return res;
  }

  /**
   * Provides information about the status of an asset's deposits and withdrawals in the bithumb
   * https://apidocs.bithumb.com/docs/assets_status
   */
  public async getAssetsStatus(orderCurrency: string): Promise<IGetAssetsStatus> {
    const res = <IGetAssetsStatus> await this.requestGet('assetsstatus', orderCurrency);
    return res;
  }

  /**
   * request get method
   */
  private async requestGet(endpoint: getEndpointType, param: string): Promise<IBithumbResponse> {
    const res: AxiosResponse<IBithumbResponse> = await axios.get(
      `${this.publicHost}/${endpoint}/${param}`,
    );
    this.checkStatus(res);
    return res.data;
  }

  /**
   * Check the status and throw
   */
  private checkStatus(res: AxiosResponse<IBithumbResponse>): void {
    if (res.data?.status !== '0000') {
      throw new Error(`Error: ${JSON.stringify(res)}`);
    }
  }
}
