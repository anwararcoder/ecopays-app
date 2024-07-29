const item = typeof window !== "undefined" ? localStorage : undefined;

export const storage = {
  set: (key, value) => item?.setItem(key, JSON.stringify(value)),
  get: (key) => JSON.parse(item?.getItem(key) || '""'),
  remove: (key) => item?.removeItem(key),
};
