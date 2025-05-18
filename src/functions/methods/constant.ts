export function constant<T>(): () => undefined;
export function constant<T>(value: T): () => T;
export function constant<T>(value?: T): () => T | undefined {
  return () => value;
}
