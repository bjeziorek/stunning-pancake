 export function formatSize(bytes: number): string {
        if (bytes >= 1_000_000_000) {
            return (bytes / 1_000_000_000).toFixed(1).replace(/\.0$/, "") + "B";
        }
        if (bytes >= 1_000_000) {
            return (bytes / 1_000_000).toFixed(1).replace(/\.0$/, "") + "M";
        }
        if (bytes >= 1_000) {
            return (bytes / 1_000).toFixed(1).replace(/\.0$/, "") + "K";
        }
        return bytes + "B";
    }