export const parseJson = <T>(json: string | null): T | null => {
    if (!json) {
        return null;
    }

    try {
        return JSON.parse(json) as T;
    } catch (error) {
        return null;
    }
};
