export const convertData = (data: string) => {
    return new Date(data).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric"
    });
};