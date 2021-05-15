import dotenv from "dotenv";
dotenv.config();

import {mainLogger} from "./utils/logger";
import {getPrice} from "./utils/CoinbaseAPI";
import {getPayouts, getPoolData, PayoutInfo, PoolInfo} from "./utils/HPoolAPI";

const run = () => {
  mainLogger.debug("Obtaining Coinbase chia Price ...");

  getPrice().then(res => {
    const price = parseFloat(parseFloat(res.data.prices.latest).toFixed(2));
    mainLogger.info(`Current CoinbasePrice: ${price}€`);

    console.log();
    mainLogger.debug("Obtaining HPool Data ...");

    getPoolData().then(res => {
      const chiaPoolInfo : PoolInfo = res.data.list.find(pi => pi.coin === "chia");

      if (chiaPoolInfo) {
        const balance = parseFloat(chiaPoolInfo.pool_income);
        const uBalance = parseFloat(chiaPoolInfo.undistributed_income);
        const tBalance = balance + uBalance;

        mainLogger.info(`HPool Balance: ${balance} XCH undistributed: ${uBalance} XCH`);
        //mainLogger.info(`Total Balance: ${tBalance} XCH`);
        mainLogger.info(`Total Balance: ${tBalance} XCH x ${price}€ -> ${parseFloat((tBalance * price).toFixed(2))}€`);

        console.log();
        mainLogger.info("Obtaining Payout Data...");

        getPayouts().then(res => {
          const latestPayout : PayoutInfo = res.data.list[0];
          if (latestPayout) {

            const payoutDate = new Date(latestPayout.record_time * 1000);
            const hours = Math.abs(payoutDate.valueOf() - new Date().valueOf()) / 36e5;
            mainLogger.info(`Last Payout was ${hours.toFixed(2)} ago.`);

            const earningEstimate = uBalance * 24/hours;
            mainLogger.info(`Estimated Earning (24h): ${earningEstimate} XCH x ${price}€ -> ${parseFloat((earningEstimate * price).toFixed(2))}€`);


            /*console.log();
            mainLogger.info("Revenue Progress:");
            let previous = 0;*/

          } else {
            mainLogger.error("No chia Payouts found in your Account.");
          }
        }).catch(err => {
          mainLogger.error("Failed to Payout data:", err);
        })

      } else {
        mainLogger.error("No chia Pool found in your Account.");
      }
    }).catch(err => {
      mainLogger.error("Failed to HPool data:", err);
    });


  }).catch(err => {
    mainLogger.error("Failed to obtain coinbase price:", err);
  });
}

run();
