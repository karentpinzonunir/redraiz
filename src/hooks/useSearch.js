// src/hooks/useSearch.js
import { useMemo, useState } from "react";

const normalizeText = (value = "") =>
    value
        .toString()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()
        .trim();

/**
 * useSearch - hook genérico de búsqueda en arrays de objetos
 * @param {Array} data - lista de objetos
 * @param {Array} fields - campos donde buscar (ej: ['nombre','descripcion'])
 */
export const useSearch = (data = [], fields = []) => {
    const [searchTerm, setSearchTerm] = useState("");

    const filteredData = useMemo(() => {
        const query = normalizeText(searchTerm);
        if (!query || !Array.isArray(data)) return data || [];

        return data.filter((item) => {
            const content = fields
                .map((f) => (item && item[f] ? item[f] : ""))
                .join(" ");
            return normalizeText(content).includes(query);
        });
    }, [data, fields, searchTerm]);

    return {
        searchTerm,
        setSearchTerm,
        filteredData,
        resultsCount: filteredData.length,
    };
};
export default useSearch;