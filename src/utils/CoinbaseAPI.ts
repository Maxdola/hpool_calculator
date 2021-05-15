import axios from "axios";

export const getPrice = () : Promise<CoinbasePrice> => {
  return new Promise<CoinbasePrice>((resolve, reject) => {

    axios.get<CoinbasePrice>("https://www.coinbase.com/api/v2/assets/prices/cf1f1de6-0a6e-5e15-a68c-e4678a67e60e?base=EUR").then(res => {
      if (res.data && res.status === 200) {
        resolve(res.data);
      } else reject();
    }).catch(err => {
      resolve(err);
    })

  });
}


export interface CoinbasePrice {
  data: Data;
}

export interface Data {
  base:             string;
  base_id:          string;
  unit_price_scale: number;
  currency:         string;
  prices:           Prices;
}

export interface Prices {
  latest:       string;
  latest_price: LatestPrice;
  hour:         All;
  day:          All;
  week:         All;
  month:        All;
  year:         All;
  all:          All;
}

export interface All {
  percent_change: number;
  prices:         Array<Array<number | string>>;
}

export interface LatestPrice {
  amount:         Amount;
  timestamp:      Date;
  percent_change: PercentChange;
}

export interface Amount {
  amount:   string;
  currency: string;
  scale:    string;
}

export interface PercentChange {
  hour:  number;
  day:   number;
  week:  number;
  month: number;
  year:  number;
  all:   number;
}
