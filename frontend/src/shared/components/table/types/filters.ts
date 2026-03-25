export type TableFiltersOpen = boolean;
export type TableFiltersSetOpen = React.Dispatch<React.SetStateAction<TableFiltersOpen>>;

export type TableFiltersIsPending = boolean;

export type TableFiltersFilters<Filters> = Filters;
export type TableFiltersSetFilters<T> = React.Dispatch<React.SetStateAction<TableFiltersFilters<T>>>;

export type TableFiltersHandleReset = () => void;
