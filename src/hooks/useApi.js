import { useEffect, useState } from 'react';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

export function useApi(endpoint) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!endpoint) return;

        setLoading(true);
        setError(null);

        const fetchData = async () => {
            try {
                const response = await axios.get(`${API_URL}${endpoint}`);
                setData(response.data.data);
            } catch (err) {
                const msg = err.response?.data?.error || err.message || 'Error desconocido';
                setError(msg);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [endpoint]);

    return { data, loading, error };
}