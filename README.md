<p align="center">
    <a href="https://www.npmjs.com/package/node-bithumb">
        <img src="https://img.shields.io/npm/v/node-bithumb.svg?style=flat-square&colorB=51C838" alt="NPM Version" />
    </a>
    <a href="https://github.com/semantic-release/semantic-release">
        <img src="https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg" />
    </a>
</p>

# node-bithumb
- NodeJS wrapped for [Bithumb API](https://apidocs.bithumb.com/)
- See [NPM](https://www.npmjs.com/package/node-bithumb)

---
## Description
- Typescript Support
- SDK for bithumb API

---
## How to Use
```bash
$ npm i --save node-bithumb
```

```typescript
import ApiBithumb from "node-bithumb";

/** 'apiKey', 'secretKey', 'payment currency (krw, btc, eth, etc..)' */
const BithumbApi = new ApiBithumb("apiKey", "secretKey", "BTC");

/** {httpMethod}{ApiEndpoint(to camel case)} [eg. post, order_detail => postOrderDetail()] */
const buyRes = await BithumbApi.postMarketBuy(10, "ETH");
const sellRes = await BithumbApi.postMarketSell(10, "ETH");
```
