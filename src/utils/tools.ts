export const dateFormat = (s: string) => {
    const date = new Date(s)
    return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
}

export const dateFormatForChat = (s: number) => {
    const date = new Date(s);
    const minutes = date.getMinutes() < 10 ? 0 + String(date.getMinutes()) : date.getMinutes()
    if (date.toDateString() === new Date().toDateString()) {
        return '今天' + ' ' + date.getHours() + ':' + minutes;
    }
    return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
        + ' ' + date.getHours() + ':' + minutes;
}

export const trim = (s: string) => {
    const reg = new RegExp( /(^\s*|\s*$)/g);
    return s.replace(reg, '');
}

