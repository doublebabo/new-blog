export const dateFormat = (s: string) => {
    const date = new Date(s)
    return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
}
