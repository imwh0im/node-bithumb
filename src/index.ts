import axios, { AxiosResponse } from 'axios';
import crypto from 'crypto';
import queryString from 'query-string';

import {
  currencyType,
  getEndpointType,
  postEndpointType,
  tradeType,

  IGetTicker,
  IGetOrderBook,
  IBithumbResponse,
  IGetTransactionHistory,
  IGetAssetsStatus,
  IGetBtci,
  IPostAccount,
  IPostBalance,
  IPostWalletAddress,
  IPostTickerUser,
  IPostOrdersParams,
  IPostOrders,
  IPostOrderDetail,
  IPostUserTransactions,
  IPostPlace,
  IPostCancel,
  IPostMarketBuy,
  IPostMarketSell,
  IPostWithdrawalCoin,
  IPostWithDrawalKrw,
  IBalanceResponse,
  IBithumbErrorResponse,
  Time,
  IGetCandlestick,
  IGetCandlestickData,
} from './types';

export default class ApiBithumb {
  constructor(
    private apiKey: string,
    private secretKey: string,
    private paymentCurrency: currencyType,
  ) {}

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
   * provides a Candlestick data.
   * https://apidocs.bithumb.com/docs/candlestick
   */
  public async GetCandlestick(
    orderCurrency: string,
    paymentCurrency: string,
    chartIntervals: Time,
  ): Promise<IGetCandlestickData[]> {
    const endpoint = `/candlestick/${orderCurrency}_${paymentCurrency}`;
    const res = <IGetCandlestick> await this.requestPublic(endpoint, chartIntervals);

    const candleData: IGetCandlestickData[] = res.data.map((candle) => ({
      timestamp: candle[0],
      opening_price: candle[1],
      closing_price: candle[2],
      max_price: candle[3],
      min_price: candle[4],
      volume: candle[5],
    }));

    return candleData;
  }


  /**
   * Provide information on membership and coin transaction fees.
   * https://apidocs.bithumb.com/docs/account
   */
  public async postAccount(coinCode: string): Promise<IPostAccount> {
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
  public async postBalance(coinCode = 'BTC'): Promise<IPostBalance> {
    const params = {
      currency: coinCode,
    };
    const res = <IBalanceResponse> await this.requestInfo('balance', params);
    const data = this.refineBalance(res, coinCode);
    return data;
  }

  /**
   * Provide the address of the member's coin deposit wallet.
   * https://apidocs.bithumb.com/docs/wallet_address
   */
  public async postWalletAddress(coinCode?: string): Promise<IPostWalletAddress> {
    const params = {
      currency: coinCode || 'BTC',
    };
    const res = <IPostWalletAddress> await this.requestInfo('wallet_address', params);
    return res;
  }

  /**
   * provides members' virtual asset transaction information.
   * https://apidocs.bithumb.com/docs/ticker_user
   */
  public async postTickerUser(orderCurrency: string): Promise<IPostTickerUser> {
    const params = {
      order_currency: orderCurrency,
    };
    const res = <IPostTickerUser> await this.requestInfo('ticker', params);
    return res;
  }

  /**
   * Provide details of the member's purchase/sale registration waiting or transaction.
   * https://apidocs.bithumb.com/docs/orders
   */
  public async postOrders(params: IPostOrdersParams): Promise<IPostOrders> {
    const param = {
      ...params,
    };
    const res = <IPostOrders> await this.requestInfo('orders', param);
    return res;
  }

  /**
   * Provide details of the member's purchase/sale details.
   * https://apidocs.bithumb.com/docs/orders_detail
   */
  public async postOrderDetail(orderId: string, orderCurrency: string): Promise<IPostOrderDetail> {
    const param = {
      orderId,
      order_currency: orderCurrency,
    };
    const res = <IPostOrderDetail> await this.requestInfo('order_detail', param);
    return res;
  }

  /**
   * Provide information on the member's transaction completion history.
   * https://apidocs.bithumb.com/docs/transactions
   */
  public async postUserTransctions(
    searchGb: number, orderCurrency: string, offset?: number, count?: number,
  ): Promise<IPostUserTransactions> {
    const param = {
      searchGb,
      order_currency: orderCurrency,
      offset,
      count,
    };
    const res = <IPostUserTransactions> await this.requestInfo('user_transactions', param);
    return res;
  }

  /**
   * provides a designated price purchase/sale registration function.
   * https://apidocs.bithumb.com/docs/place
   */
  public async postPlace(orderCurrency: string, units: number, price: number, type: tradeType): Promise<IPostPlace> {
    const param = {
      order_currency: orderCurrency,
      units,
      price,
      type,
    };
    const res = <IPostPlace> await this.requestTrade('place', param);
    return res;
  }

  /**
   * provides a registered purchase/sale order cancellation function.
   * https://apidocs.bithumb.com/docs/cancel
   */
  public async postCancel(type: tradeType, orderId: string, orderCurrency: string): Promise<IPostCancel> {
    const param = {
      type,
      order_id: orderId,
      order_currency: orderCurrency,
    };
    const res = <IPostCancel> await this.requestTrade('cancel', param);
    return res;
  }

  /**
   * provides market price buying.
   * https://apidocs.bithumb.com/docs/market_buy
   */
  public async postMarketBuy(units: number, orderCurrency: string): Promise<IPostMarketBuy> {
    const param = {
      units,
      order_currency: orderCurrency,
    };
    const res = <IPostMarketBuy> await this.requestTrade('market_buy', param);
    return res;
  }

  /**
   * provides market price selling function.
   * https://apidocs.bithumb.com/docs/market_sell
   */
  public async postMarketSell(units: number, orderCurrency: string): Promise<IPostMarketSell> {
    const param = {
      units,
      order_currency: orderCurrency,
    };
    const res = <IPostMarketSell> await this.requestTrade('market_sell', param);
    return res;
  }

  /**
   * provides a virtual asset withdrawal application function.
   * https://apidocs.bithumb.com/docs/withdrawal_coin
   */
  public async postWithdrawalCoin(units: number, address: string, currency = 'BTC', desination?: string): Promise<IPostWithdrawalCoin> {
    const param = {
      units,
      address,
      currency,
      desination,
    };
    const res = <IPostWithdrawalCoin> await this.requestTrade('btc_withdrawal', param);
    return res;
  }

  /**
   * provides a KRW withdrawal application function.
   * https://apidocs.bithumb.com/docs/withdrawal_krw
   */
  public async postWithdrawalKrw(bank: string, account: string, price: number): Promise<IPostWithDrawalKrw> {
    const param = {
      bank,
      account,
      price,
    };
    const res = <IPostWithDrawalKrw> await this.requestTrade('krw_withdrawal', param);
    return res;
  }

  /**
   * request Public API
   */
  private async requestPublic(endpoint: getEndpointType, param?: string): Promise<IBithumbResponse> {
    const res = <AxiosResponse<IBithumbResponse>> await axios({
      method: 'GET',
      url: `${this.hosts.publicHost}/${endpoint}/${param || ''}`,
    });
    this.checkStatus(res);
    return res.data;
  }

  /**
   * request Info API
   */
  private async requestInfo(endpoint: postEndpointType, params: Record<string, unknown> = {}): Promise<IBithumbResponse> {
    const param = Object.assign(params, {
      payment_currency: this.paymentCurrency,
    });
    const headers = this.getBithumbHeaders(`/info/${endpoint}`, param);
    const res = <AxiosResponse<IBithumbResponse>> await axios({
      method: 'POST',
      url: `${this.hosts.infoHost}/${endpoint}`,
      data: queryString.stringify(param),
      headers,
    });
    this.checkStatus(res);
    return res.data;
  }

  /**
   * request Trade API
   */
  private async requestTrade(endpoint: postEndpointType, params: Record<string, unknown> = {}): Promise<IBithumbResponse> {
    const param = Object.assign(params, {
      payment_currency: this.paymentCurrency,
    });
    const headers = this.getBithumbHeaders(`/trade/${endpoint}`, param);
    const res = <AxiosResponse<IBithumbResponse>> await axios({
      method: 'POST',
      url: `${this.hosts.tradeHost}/${endpoint}`,
      data: queryString.stringify(param),
      headers,
    });
    this.checkStatus(res);
    return res.data;
  }

  /**
   * Check the status and throw
   */
  private checkStatus(res: AxiosResponse<IBithumbResponse>) {
    if (res.data?.status !== '0000') {
      const errRes = <IBithumbErrorResponse> res.data;
      throw new Error(
        `${JSON.stringify(errRes)} [Check the documents: https://apidocs.bithumb.com/docs/err_code]`,
      );
    }
  }

  private getBithumbHeaders(endpoint: string, parameters: Record<string, unknown> = {}) {
    const nonce = new Date().getTime();
    const requestSignature = `${endpoint}${String.fromCharCode(0)}${queryString.stringify(parameters)}${String.fromCharCode(0)}${nonce}`;
    const hmacSignature = Buffer.from(
      crypto.createHmac('sha512', this.secretKey)
        .update(requestSignature)
        .digest('hex'),
    ).toString('base64');

    return {
      'Api-Key': this.apiKey,
      'Api-Sign': hmacSignature,
      'Api-Nonce': nonce,
    };
  }

  private refineBalance(res: IBalanceResponse, coinCode: string) {
    const data: IPostBalance = {
      ...res,
      data: {
        total_coin: res.data[`total_${coinCode}`],
        total_krw: res.data.total_krw,
        in_use_coin: res.data[`in_use_${coinCode}`],
        in_use_krw: res.data.in_use_krw,
        available_coin: res.data[`available_${coinCode}`],
        available_krw: res.data.available_krw,
        xcoin_last_coin: res.data[`xcoin_last_${coinCode}`],
      },
    };
    return data;
  }
}
