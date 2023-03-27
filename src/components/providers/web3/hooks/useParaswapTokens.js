import { useState, useEffect } from 'react';
import axios from 'axios';
import { useWalletInfo } from '@/components/hooks/web3';

const useParaswapTokens = () => {
  const [tokens, setTokens] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { network } = useWalletInfo()

  useEffect(() => {
    const fetchTokens = async () => {
      setLoading(true);
      try {
        if(network.data == 250) {
          const response = await axios.get(`https://raw.githubusercontent.com/SpookySwap/spooky-info/master/src/constants/token/spookyswap.json`);
          const response2 = await axios.get(`https://apiv5.paraswap.io/tokens/${network.data}`);

          const data1 = response.data.tokens;
          const data2 = response2.data.tokens;

          const concatenatedData = data1.concat(data2);

          const uniqueData = [...new Map(concatenatedData.map(item => [item.symbol, item])).values()];

          setTokens(uniqueData);
        } else if (network.data == 137) {
          const response = await axios.get(`https://unpkg.com/quickswap-default-token-list@latest/build/quickswap-default.tokenlist.json`);
          const response2 = await axios.get(`https://apiv5.paraswap.io/tokens/${network.data}`);

          const data1 = response.data.tokens;
          const data2 = response2.data.tokens;

          const concatenatedData = data1.concat(data2);

          const uniqueData = [...new Map(concatenatedData.map(item => [item.symbol, item])).values()];

          setTokens(uniqueData);
        } else if (network.data == 56) {
          const response = await axios.get(`https://tokens.pancakeswap.finance/pancakeswap-extended.json`);
          const response2 = await axios.get(`https://apiv5.paraswap.io/tokens/${network.data}`);

          const data1 = response.data.tokens;
          const data2 = response2.data.tokens;

          const concatenatedData = data1.concat(data2);

          const uniqueData = [...new Map(concatenatedData.map(item => [item.symbol, item])).values()];

          setTokens(uniqueData);
        } else if (network.data == 43114) {
          const response = await axios.get(`https://raw.githubusercontent.com/traderjoe-xyz/joe-tokenlists/main/mc.tokenlist.json`);
          const response2 = await axios.get(`https://apiv5.paraswap.io/tokens/${network.data}`);

          const data1 = response.data.tokens;
          const data2 = response2.data.tokens;

          const concatenatedData = data1.concat(data2);

          const uniqueData = [...new Map(concatenatedData.map(item => [item.symbol, item])).values()];

          setTokens(uniqueData);
        } else if (network.data == 1) {
          const response = await axios.get(`https://gateway.ipfs.io/ipns/tokens.uniswap.org`);
          const response2 = await axios.get(`https://apiv5.paraswap.io/tokens/${network.data}`);

          const data1 = response.data.tokens;
          const data2 = response2.data.tokens;

          const concatenatedData = data1.concat(data2);

          const uniqueData = [...new Map(concatenatedData.map(item => [item.symbol, item])).values()];

          setTokens(uniqueData);
        } else {
          const response = await axios.get(`https://apiv5.paraswap.io/tokens/${network.data}`);
          setTokens(response.data.tokens);
        }
        
        setTokens(response.data.tokens);
      } catch (error) {
        setError(error);
      }
      setLoading(false);
    };

    fetchTokens();
  }, [network.data]);

  return { tokens, loading, error };
};

export default useParaswapTokens;
