export function removeElementFromArray<T>(arr: T[], index: number) {
  arr.splice(index, 1);
  return arr;
}

export function capitalize(str: string): string {
  return `${str[0].toUpperCase()}${str.slice(1)}`;
}
