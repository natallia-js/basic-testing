export const join = (...paths: string[]) => {
    return paths.join('');
};

export const existsSync = (fullPath: string) => {
    if (!fullPath) return false;
    return fullPath.endsWith('exists') ? true : false;
};

export const readFile = async (fullPath: string) => {
    if (!fullPath) return '';
    return 'file content';
};
