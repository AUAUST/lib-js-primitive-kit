import { defineMethod } from "~/compiler";
import type { Fn } from "~/functions/types";

export default defineMethod({
  instanceCallable: "chainable",
});

type MappedArguments<Mapper> = Mapper extends (...args: infer Args) => any
  ? Args
  : never;

type ArgumentsMapper<T extends Fn, Mapper> = Mapper extends (
  ...args: any[]
) => infer Result
  ? Result extends readonly [...Parameters<T>]
    ? Mapper
    : Parameters<T> extends [infer Parameter]
      ? Result extends readonly (infer Value)[]
        ? unknown extends Value
          ? never
          : Value extends Parameter
            ? Mapper
            : never
        : never
      : never
  : never;

/**
 * Creates a function that maps its arguments before passing them to another function.
 */
export function mapArguments<const T extends Fn, const Mapper>(
  fn: T,
  mapper: Mapper & ArgumentsMapper<T, Mapper>,
): Fn<MappedArguments<Mapper>, ReturnType<T>>;
export function mapArguments(fn: Fn, mapper: Fn) {
  return function (this: any, ...args: any[]) {
    return fn.apply(this, mapper.apply(this, args));
  };
}
