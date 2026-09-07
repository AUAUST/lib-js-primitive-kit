import type { Constructor, Fn } from "~/functions/types";

function wrap(method: Fn) {
  return function (this: { valueOf(): unknown }, ...args: any[]) {
    return method(this.valueOf(), ...args);
  };
}

function wrapChainable(method: Fn, constructor: Constructor) {
  return function (this: { valueOf(): unknown }, ...args: any[]) {
    return new constructor(method(this.valueOf(), ...args));
  };
}

export function assignMethods(
  constructor: Constructor,
  methods: Record<string, Fn>,
  chainable: boolean,
) {
  const cache = new WeakMap();
  const wrapper = chainable ? wrapChainable : wrap;

  let wrapped: Fn;

  Object.defineProperties(
    constructor.prototype,
    Object.fromEntries(
      Object.entries(methods).map(([name, value]) => [
        name,
        {
          configurable: true,
          writable: true,
          value:
            cache.get(value) ??
            ((wrapped = wrapper(value, constructor)),
            cache.set(value, wrapped),
            wrapped),
        },
      ]),
    ),
  );
}
