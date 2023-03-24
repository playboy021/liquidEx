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
          setTokens(response.data.tokens);
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
