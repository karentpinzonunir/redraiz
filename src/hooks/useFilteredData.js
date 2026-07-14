import { useMemo, useState } from "react";

const normalizeText = (value = "") =>
    value
        .toString()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()
        .trim();

export const useFilteredData = (productores = []) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [regionFilter, setRegionFilter] = useState("all");
    const [categoryFilter, setCategoryFilter] = useState("all");
    const [onlyActive, setOnlyActive] = useState(true);

    const regionOptions = useMemo(() => {
        return [...new Set(
            productores
                .map((p) => p.id_region)
                .filter((value) => value !== null && value !== undefined)
        )].sort((a, b) => Number(a) - Number(b));
    }, [productores]);

    const categoryOptions = useMemo(() => {
        return [...new Set(
            productores
                .map((p) => p.id_categoria)
                .filter((value) => value !== null && value !== undefined)
        )].sort((a, b) => Number(a) - Number(b));
    }, [productores]);

    const filteredData = useMemo(() => {
        const query = normalizeText(searchTerm);

        return productores.filter((p) => {
            const matchesActive = onlyActive ? Boolean(p.estado) : true;
            const matchesRegion =
                regionFilter === "all" ? true : String(p.id_region) === String(regionFilter);
            const matchesCategory =
                categoryFilter === "all" ? true : String(p.id_categoria) === String(categoryFilter);

            const haystack = normalizeText(
                [p.nombre, p.descripcion, p.historia, p.carpeta].filter(Boolean).join(" ")
            );
            const matchesSearch = !query || haystack.includes(query);

            return matchesActive && matchesRegion && matchesCategory && matchesSearch;
        });
    }, [productores, searchTerm, regionFilter, categoryFilter, onlyActive]);

    const resetFilters = () => {
        setSearchTerm("");
        setRegionFilter("all");
        setCategoryFilter("all");
        setOnlyActive(true);
    };

    return {
        searchTerm,
        setSearchTerm,
        regionFilter,
        setRegionFilter,
        categoryFilter,
        setCategoryFilter,
        onlyActive,
        setOnlyActive,
        regionOptions,
        categoryOptions,
        filteredData,
        totalCount: productores.length,
        filteredCount: filteredData.length,
        hasActiveFilters:
            searchTerm !== "" ||
            regionFilter !== "all" ||
            categoryFilter !== "all" ||
            onlyActive !== true,
        resetFilters,
    };
};