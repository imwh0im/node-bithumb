<p align="center">
    <a href="https://www.npmjs.com/package/node-bithumb">
        <img src="https://img.shields.io/npm/v/node-bithumb.svg?style=flat-square&colorB=51C838" alt="NPM Version" \>
    </a>
</p>

# node-bithumb
- NodeJS wrapped for [Bithumb API](https://apidocs.bithumb.com/)
- See [NPM](https://www.npmjs.com/package/node-bithumb)

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

const BithumbApi = new ApiBithumb("apiKey", "secetKey", "BTC");
const buyRes = await BithumbApi.postMarketBuy(10, "ETH"); // {httpMethod}{ApiEndpoint(to camel case)} [eg. post, order_detail => postOrderDetail()]
const sellRes = await BithumbApi.postMarketSell(10, "ETH");
```
