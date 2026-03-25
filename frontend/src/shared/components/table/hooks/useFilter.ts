
import { useCallback, useMemo, useState, useTransition } from "react";
import type { TableData } from "../types/data";
import type { TableSearchSearch } from "../types/search";
import type { TableFiltersFilters } from "../types/filters";

export function useFilter<Data,Filters>(
    data:TableData<Data>, 
    search:TableSearchSearch, 
    propFilters:TableFiltersFilters<Filters>, 
    defaultFilters:TableFiltersFilters<Filters>
) {

    const [filters, setFilters] = useState(propFilters);
    const [isPending, startTransition] = useTransition();

    const filterFn1 = useCallback((m:Data) =>
        JSON.stringify(m).toLowerCase().includes(search.toLowerCase()), [search]);


    // const filterFn2 = useCallback((m) => {
    //     if (filters.query && !(
    //         m.name.toLowerCase().includes(filters.query.toLowerCase()) ||
    //         m.description.toLowerCase().includes(filters.query.toLowerCase())
    //     )) return false;

    //     if (filters.status && filters.status !== '__all__' && m.status !== filters.status) return false;

    //     if (filters.type && filters.type !== '__all__' && m.type !== filters.type) return false;

    //     if (filters.tag && !m.tags.includes(filters.tag)) return false;

    //     if (filters.baseModel && !m.baseModel.toLowerCase().includes(filters.baseModel.toLowerCase())) return false;

    //     if (filters.loraMin && m.loraCount < Number(filters.loraMin)) return false;
    //     if (filters.loraMax && m.loraCount > Number(filters.loraMax)) return false;

    //     if (filters.sizeMin && Number(m.size) < Number(filters.sizeMin)) return false;
    //     if (filters.sizeMax && Number(m.size) > Number(filters.sizeMax)) return false;

    //     return true;
    // }, [filters.baseModel, filters.loraMax, filters.loraMin, filters.query, filters.sizeMax, filters.sizeMin, filters.status, filters.tag, filters.type])

    // const filtered = useMemo(() => [...data]
    //     .filter(filterFn1)
    //     .filter(filterFn2), [data, filterFn1, filterFn2]);

        const filtered = useMemo(() => [...data]
        .filter(filterFn1), [data, filterFn1]);

    const handleReset = () => {
        startTransition(() => {
            setFilters(defaultFilters);
        });
    };

    return {
        filtered,
        filters,
        setFilters,
        handleReset,
        isPending,
        startTransition
    }
}