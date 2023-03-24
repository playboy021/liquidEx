import axios from "axios";
import BigNumber from "bignumber.js";


const API_URL = "https://apiv5.paraswap.io";

const PARTNER = "chucknorris";
const SLIPPAGE = 1; // 1%

function createSwapper(networkID, apiURL) {
  const getRate = async ({ srcToken, destToken, srcAmount, partner = PARTNER, srcDecimals, destDecimals }) => {
    console.log('getRate ', srcToken, destToken, srcAmount, partner, srcDecimals, destDecimals)
    const queryParams = {
      srcToken: srcToken,
      destToken: destToken,
      srcDecimals: srcDecimals,
      destDecimals: destDecimals,
      amount: srcAmount,
      side: "SELL",
      network: networkID?.toString(),
      partner,
    };

    const searchString = new URLSearchParams(queryParams);

    const pricesURL = `${apiURL}/prices/?${searchString}`;
    console.log("GET /price URL", pricesURL);

    const {
      data: { priceRoute },
    } = await axios.get(pricesURL);

    return priceRoute;
  };

  const buildSwap = async ({
    srcToken,
    destToken,
    srcAmount,
    minAmount,
    priceRoute,
    userAddress,
    receiver,
    partner,
  }) => {
    console.log('buildSwap ', srcToken, destToken, srcAmount, minAmount, priceRoute, userAddress, receiver, partner)
    const txURL = `${apiURL}/transactions/${networkID}`;

    const txConfig = {
      priceRoute,
      srcToken,
      //srcDecimals,
      destToken,
      //destDecimals,
      srcAmount,
      destAmount: minAmount,
      userAddress,
      partner,
      receiver,
    };
    
    const { data } = await axios.post(txURL, txConfig);


    return data;
  };

  return { getRate, buildSwap };
  
}

export async function getSwapTransaction({
  srcToken,
  destToken,
  srcDecimals,
  destDecimals,
  srcAmount: _srcAmount,
  networkID,
  slippage = SLIPPAGE,
  ...rest
}) {
  try {
    console.log('getSwapTransaction ', srcToken, destToken, srcDecimals, destDecimals, _srcAmount, networkID, slippage)

    const srcAmount = new BigNumber(_srcAmount)
      .times(10 ** srcDecimals)
      .toFixed(0);

    const ps = createSwapper(networkID, API_URL);

    const priceRoute = await ps.getRate({
      srcDecimals,
      destDecimals,
      srcToken,
      destToken,
      srcAmount,
    });

    const minAmount = new BigNumber(priceRoute?.destAmount)
      .times(1 - slippage / 100)
      .toFixed(0);

    const transactionRequest = await ps.buildSwap({
      srcDecimals,
      destDecimals,
      srcToken,
      destToken,
      srcAmount,
      minAmount,
      priceRoute,
      ...rest,
    });
    console.log("TransactionRequest", transactionRequest);

    return transactionRequest;
  } catch (error) {
    console.error(error.response.data);
    throw new Error(error.response.data.error);
  }
}

// export const getExampleSwapTransaction = () => 
//   getSwapTransaction({
//     srcAmount: "1",
//     srcToken: "MATIC",
//     destToken: "WBTC",
//     networkID: Networks.POLYGON,
//     userAddress: USER_ADDRESS,
//   });

