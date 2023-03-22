// hooks/useFetchData.js
import { useState, useEffect } from 'react';
import axios from 'axios';

const useFetchData = (transactionHash) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let timer;

    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get('https://scanapi.multichain.org/v3/tx/' + transactionHash);
        setData(response.data);
      } catch (error) {
        setError(error);
      }
      setLoading(false);
    };

    if (transactionHash) {
      fetchData();

      timer = setInterval(() => {
        fetchData();
      }, 5000);
    }

    return () => {
      if (timer) {
        clearInterval(timer);
      }
    };
  }, [transactionHash]);

  return { data, loading, error };
};

export default useFetchData;
