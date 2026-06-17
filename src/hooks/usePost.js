import { useState } from 'react';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

export function usePost(endpoint) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const post = async (body) => {
        setLoading(true);
        setError(null);

        try {
            const response = await axios.post(`${API_URL}${endpoint}`, body);
            setData(response.data.data);
            return { ok: true, data: response.data.data };
        } catch (err) {
            const msg = err.response?.data?.error || err.message || 'Error desconocido';
            setError(msg);
            return { ok: false, error: msg };
        } finally {
            setLoading(false);
        }
    };

    return { post, data, loading, error };
}