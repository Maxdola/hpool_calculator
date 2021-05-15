import axios from "axios";

export const getPoolData = () : Promise<PoolData> => {
  return new Promise<PoolData>((resolve, reject) => {

    axios.get<PoolData>("https://www.hpool.com/api/pool/list?language=en&type=opened", {
      headers: {
        cookie: `auth_token=${process.env.AUTH_TOKEN};`
      }
    }).then(res => {
      if (res.data) {
        resolve(res.data);
      } else {
        reject();
      }
    }).catch(err => {
      reject(err);
    })

  });
}

export const getPayouts = () : Promise<Payouts> => {
  return new Promise<Payouts>((resolve, reject) => {

    axios.get<Payouts>("https://www.hpool.com/api/pool/miningincomerecord?language=en&type=chia&count=15&page=1", {
      headers: {
        cookie: `auth_token=${process.env.AUTH_TOKEN};`
      }
    }).then(res => {
      if (res.data) {
        resolve(res.data);
      } else {
        reject();
      }
    }).catch(err => {
      reject(err);
    })

  });
}

export interface Payouts {
  code: number;
  data: PayoutData;
}

export interface PayoutData {
  list:  PayoutInfo[];
  total: number;
}

export interface PayoutInfo {
  amount:      string;
  coin:        string;
  name:        string;
  record_time: number;
  type:        string;
}


export interface PoolData {
  code: number;
  data: Data;
}

export interface Data {
  list:  PoolInfo[];
  total: number;
}

export interface PoolInfo {
  api_key:                            string;
  block_reward:                       string;
  block_time:                         number;
  capacity:                           number;
  coin:                               string;
  deposit_mortgage_balance:           string;
  deposit_mortgage_effective_balance: string;
  deposit_mortgage_free_balance:      string;
  deposit_rate:                       string;
  fee:                                number;
  loan_mortgage_balance:              string;
  mortgage:                           string;
  name:                               string;
  offline:                            number;
  online:                             number;
  payment_time:                       string;
  point_deposit_balance:              string;
  pool_address:                       string;
  pool_income:                        string;
  pool_type:                          string;
  previous_income_pb:                 string;
  theory_mortgage_balance:            string;
  type:                               string;
  undistributed_income:               string;
}
