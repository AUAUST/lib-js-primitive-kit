/**
 * Returns the first argument passed to it, unchanged. It is useful as a fallback function, for example when a transformer callback is optional.
 *
 * @example ```ts
 * function doSomething(value, transformer) {
 *   return (transformer || F.identity)(value);
 * }
 * ```
 */
export function identity<T>(): undefined;
export function identity<T>(value: T): T;
export function identity<T>(value?: T): T | undefined {
  return value;
}
