export function filter<Data>(row: Data, search: string) {
    return JSON.stringify(row).toLowerCase().includes(search.toLowerCase())
}
