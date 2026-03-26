    export const tagColor = (tag: string) => {
        if (tag.includes("coding")) return "blue";
        if (tag.includes("chat")) return "green";
        if (tag.includes("math")) return "purple";
        if (tag.includes("polish")) return "red";
        return "gray";
    };