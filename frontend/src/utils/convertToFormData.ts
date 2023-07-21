export const convertToFormData = (data: Partial<IProduct> | Partial<IUser>) => {
    const formData = new FormData();
    for (const [key, value] of Object.entries(data)) {
        formData.append(key, value as string);
    }
    return formData;
};