export function removeElementFromArray<T>(arr: T[], index: number) {
  arr.splice(index, 1);
  return arr;
}
