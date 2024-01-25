type TFun = (...args: any[]) => any;

/**
 * The F class, for Function, provides useful methods for working with functions.
 */
class RawF extends Function {
  /**
   * A simple is-function check.
   * Returny the result of `typeof x === "function"`.
   */
  static is(x: any): x is TFun {
    return typeof x === "function";
  }

  /**
   * A strict is-function check.
   */

  /**
   * Returns a boolean whether the function is async.
   * If the value is not a function, it returns false.
   */
  static isAsync(fn: TFun): boolean {
    return typeof fn === "function" && fn.constructor.name === "AsyncFunction";
  }

  /**
   * Returns a boolean whether the function is a generator.
   * If the value is not a function, it returns false.
   */
  static isGenerator(fn: TFun): boolean {
    return (
      typeof fn === "function" && fn.constructor.name === "GeneratorFunction"
    );
  }

  /**
   * Runs a function in a try-catch block, passing the down the arguments and returning either the return value or the error.
   */
  static try<T extends TFun>(
    fn: T,
    ...args: Parameters<T>
  ): ReturnType<T> | Error {
    try {
      return fn(...args);
    } catch (error) {
      if (error instanceof Error) {
        return error;
      } else {
        return new Error(error?.toString());
      }
    }
  }
}

// Note: the `F` class has no point in being called as it has no `F.from()` method.
// const F = new Proxy(
//   // The proxy makes it callable, using the `from()` method.
//   RawF as typeof RawF & {
//     (input: any): boolean;
//   },
//   {
//     apply(target, _, argumentsList) {
//       // @ts-ignore
//       return target.from(...argumentsList);
//     },
//   }
// );

export { RawF as F };
export type { TFun };
