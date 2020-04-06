export interface Data {
  name: string;
}

export function createData(
  name: string,
): Data {
  return { name };
}
