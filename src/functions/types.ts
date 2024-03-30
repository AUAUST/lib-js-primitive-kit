/** A generic function type. */
export type Fn<Args extends any[] = any[], Return = any> = (
  ...args: Args
) => Return;

/** A generic async function type. */
export type AsyncFn<Args extends any[] = any[], Return = any> = (
  ...args: Args
) => Promise<Return>;
