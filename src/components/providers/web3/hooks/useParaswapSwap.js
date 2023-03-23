import axios from "axios";
import BigNumber from "bignumber.js";
import useParaswapTokens from "./useParaswapTokens";


const API_URL = "https://apiv5.paraswap.io";

const PARTNER = "chucknorris";
const SLIPPAGE = 1; // 1%

const Networks = {
  MAINNET: 1,
  POLYGON: 137,
};

const tokens = {
  [Networks.MAINNET]: [
    {
      decimals: 18,
      symbol: "ETH",
      address: "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
    },
    {
      decimals: 6,
      symbol: "USDC",
      address: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
    },
    {
      decimals: 18,
      symbol: "DAI",
      address: "0x6B175474E89094C44Da98b954EedeAC495271d0F",
    },
  ],
  [Networks.POLYGON]: [
    {
      decimals: 18,
      symbol: "MATIC",
      address: "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
    },
    {
      decimals: 8,
      symbol: "WBTC",
      address: "0x1bfd67037b42cf73acf2047067bd4f2c47d9bfd6",
    },
  ],
};

function getToken(symbol) {
  for (let i = 0; i < tokens.length; i++) {
    if (tokens[i].symbol === symbol) {
      const token = tokens[i]
      console.log('token: ', token)
      if (!token)
        throw new Error(`Token ${symbol} not available`);
      return token;
    }
  }
}

function createSwapper(networkID, apiURL) {
  const getRate = async ({ srcToken, destToken, srcAmount, partner = PARTNER }) => {
    const queryParams = {
      srcToken: srcToken.address,
      destToken: destToken.address,
      srcDecimals: srcToken.decimals.toString(),
      destDecimals: destToken.decimals.toString(),
      amount: srcAmount,
      side: "SELL",
      network: networkID.toString(),
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
    const txURL = `${apiURL}/transactions/${networkID}`;

    const txConfig = {
      priceRoute,
      srcToken: srcToken.address,
      srcDecimals: srcToken.decimals,
      destToken: destToken.address,
      destDecimals: destToken.decimals,
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
  srcToken: srcTokenSymbol,
  destToken: destTokenSymbol,
  srcAmount: _srcAmount,
  networkID,
  slippage = SLIPPAGE,
  ...rest
}) {
  try {
    console.lop('getSwapTransaction 1')
    console.log(srcTokenSymbol, destTokenSymbol, _srcAmount, networkID, slippage)
    const srcToken = getToken(srcTokenSymbol);
    const destToken = getToken(destTokenSymbol);
    console.log('getSwapTransaction 2')

    const srcAmount = new BigNumber(_srcAmount)
      .times(10 ** srcToken?.decimals)
      .toFixed(0);
    console.log('getSwapTransaction 3')

    const ps = createSwapper(networkID, API_URL);
    console.log('getSwapTransaction 4')

    const priceRoute = await ps.getRate({
      srcToken,
      destToken,
      srcAmount,
    });
    console.log('getSwapTransaction 5')

    const minAmount = new BigNumber(priceRoute?.destAmount)
      .times(1 - slippage / 100)
      .toFixed(0);

    console.log('getSwapTransaction 6')
    const transactionRequest = await ps.buildSwap({
      srcToken,
      destToken,
      srcAmount,
      minAmount,
      priceRoute,
      ...rest,
    });
    console.log('getSwapTransaction 7')
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

