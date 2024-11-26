import NodeCache from "node-cache";

const cache = new NodeCache({ stdTTL: 3600 }); // Cache expires after 1 hour

export const setCache = (key: string, value: any) => cache.set(key, value);
export const getCache = <T>(key: string): T | null => {
  const value = cache.get(key);
  if (value === undefined) {
    return null;
  }
  return value as T;
};
export const delCache = (key: string) => cache.del(key);
