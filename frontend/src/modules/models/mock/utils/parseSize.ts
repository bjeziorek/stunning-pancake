   export function parseSize(value: string | number): number {
        if (typeof value === "number") return value;

        const num = parseFloat(value);

        if (value.toLowerCase().endsWith("b")) {
            return num * 1_000_000_000;
        }
        if (value.toLowerCase().endsWith("m")) {
            return num * 1_000_000;
        }
        if (value.toLowerCase().endsWith("k")) {
            return num * 1_000;
        }
        if (value.toLowerCase().endsWith("g")) {
            return num * 1_000_000_000;
        }

        return num;
    }
