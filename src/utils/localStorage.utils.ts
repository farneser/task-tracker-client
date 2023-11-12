export const getLocalStorageItem = <T>(key: string) => {
    return parseJson<T>(localStorage.getItem(key));
}

export const setLocalStorage = <T>(key: string, value: T) => {
    localStorage.setItem(key, JSON.stringify(value))
}

export const removeLocalStorage = (key: string) => {
    localStorage.removeItem(key);
}