
type AsyncForeachCallback<T> = (obj: T, index: number, array: T[]) => void;

export async function asyncForEach<T>(array: T[], callback: AsyncForeachCallback<T>) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array)
  }
};