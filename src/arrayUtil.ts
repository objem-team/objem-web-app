export function nextItem<T>(array: T[], current: T): T {
  const index = array.indexOf(current);
  if (index >= array.length) return array[0];
  return array[index + 1];
}
