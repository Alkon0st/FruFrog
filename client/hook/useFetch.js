import { useState, useEffect } from 'react';
import axios from 'axios';

const useFetch = (url) => {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const response = await axios.get(url);
                setData(response.data);
            } catch (error) {
                setError(error);
                alert('API call is not working');
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [url]); // Fetch data when `url` changes

    return { data, isLoading, error };
};

export default useFetch;
