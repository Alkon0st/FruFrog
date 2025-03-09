import { useState, useEffect } from 'react';
import axios from 'axios';

const useFetch = () => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const apicall =  {
        method: 'GET',
        url: `localhost:5000`,
    };
    const fetchData = async () => {
        setIsLoading(true);
    
        try {
            const response = await axios.request(apicall);
            setData(response.data.data);
            setIsLoading(false);
        } catch{
            setError(error)
            alert('apicall is not working')
        } finally {
            setIsLoading(false);
        }
    };
    useEffect(() => {
        fetchData();
    }, []);

    const refetch = () => {
        setIsLoading(true);
        fetchData();
    }

    return{ data, isLoading, error, refetch}
}

export default useFetch;
