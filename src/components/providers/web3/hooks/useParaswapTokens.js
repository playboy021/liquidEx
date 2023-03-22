import { useState, useEffect } from 'react';
import axios from 'axios';

const useParaswapTokens = () => {
  const [tokens, setTokens] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTokens = async () => {
      setLoading(true);
      try {
        const response = await axios.get('https://api.paraswap.io/v2/tokens');
        setTokens(response.data.tokens);
      } catch (error) {
        setError(error);
      }
      setLoading(false);
    };

    fetchTokens();
  }, []);

  return { tokens, loading, error };
};

export default useParaswapTokens;
