export function identity<T>(): undefined;
export function identity<T>(value: T): T;
export function identity<T>(value?: T): T | undefined {
  return value;
}
