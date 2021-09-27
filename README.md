# node-bithumb
NodeJS wrapped for [Bithumb API](https://apidocs.bithumb.com/)

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
