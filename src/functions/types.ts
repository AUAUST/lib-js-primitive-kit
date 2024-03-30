/** A generic function type. */
export type Fn<Args extends unknown[] = unknown[], Return = unknown> = (
  ...args: Args
) => Return;

/** A generic async function type. */
export type AsyncFn<Args extends unknown[] = unknown[], Return = unknown> = (
  ...args: Args
) => Promise<Return>;
