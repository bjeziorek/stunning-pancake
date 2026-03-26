export function filter<Data>(m: Data, search: string) {
    return JSON.stringify(m).toLowerCase().includes(search.toLowerCase())
}
