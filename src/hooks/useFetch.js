import {useState, useEffect} from 'react';
import { fetchData } from '../helper/fetching';

const useAxios = ({ url, method, body = null, headers = null}) => {
    const [response, setResponse] = useState(null);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);
    
    const fetch = async () => {
      setLoading(true);
      try {
        let result = await fetchData(url, method);
        setResponse(result.data.results);
      } catch (err) {
        setError(err);
        setResponse([]);
      } finally {
        setLoading(false);
      }
    }

    useEffect(() => {
      fetch()
    }, [method, url, body, headers]);
    return {response, error, loading}
}

export default useAxios;