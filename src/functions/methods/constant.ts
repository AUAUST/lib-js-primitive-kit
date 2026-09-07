export function constant<const T>(): () => undefined;
export function constant<const T>(value: T): () => T;
export function constant<const T>(value?: T): () => T | undefined {
  return () => value;
}
