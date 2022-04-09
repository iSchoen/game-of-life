export const rangeMap = <T>(range: number, fn: (i: number) => T) =>
  Array.from({ length: range }, (_, i) => fn(i));
