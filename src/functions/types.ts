/** A generic function type. */
export type Fn<Args extends any[] = any[], Return = any> = (
  ...args: Args
) => Return;

/** A generic async function type. */
export type AsyncFn<Args extends any[] = any[], Return = any> = (
  ...args: Args
) => Promise<Return>;

/** A generic constructor function type. */
export type Constructor<
  C = unknown,
  Arguments extends unknown[] = any[]
> = new (...args: Arguments) => C;
