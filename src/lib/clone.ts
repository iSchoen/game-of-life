export const deepCloneArray = <T>(array: T[]) =>
  JSON.parse(JSON.stringify(array)) as T[];
