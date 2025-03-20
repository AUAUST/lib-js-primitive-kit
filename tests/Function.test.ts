import { F } from "~/functions";

import { Equal, Expect } from "type-testing";
import { describe, expect, test, vitest } from "vitest";

describe("F class", () => {
  test("called as a function works", () => {
    expect(F()).toBeTypeOf("function");
    expect(F()()).toBe(undefined);
    expect(F(1)()).toBe(1);

    const fn = () => {};

    expect(F(fn)).toBe(fn);
  });

  test("conversion to function works", () => {
    const fn = () => {};

    expect(F.from(fn)).toBe(fn);
    expect(F.from(1)()).toBe(1);
    expect(F.from("string")()).toBe("string");
  });

  test("typecheck works", () => {
    expect(F.is(() => {})).toBe(true);
    expect(F.is(function () {})).toBe(true);
    expect(F.is(async () => {})).toBe(true);
    expect(F.is(function* () {})).toBe(true);
    expect(F.is(class {})).toBe(true);

    expect(F.is("")).toBe(false);
    expect(F.is(0)).toBe(false);
    expect(F.is(true)).toBe(false);
    expect(F.is({})).toBe(false);
    expect(F.is([])).toBe(false);
    expect(F.is(null)).toBe(false);
    expect(F.is(undefined)).toBe(false);
    expect(F.is(Symbol())).toBe(false);
  });

  test("async check works", () => {
    expect(F.isAsync(async () => {})).toBe(true);

    expect(F.isAsync(() => {})).toBe(false);
    expect(F.isAsync(function* () {})).toBe(false);
    expect(F.isAsync(class {})).toBe(false);
  });

  test("generator check works", () => {
    expect(F.isGenerator(function* () {})).toBe(true);

    expect(F.isGenerator(() => {})).toBe(false);
    expect(F.isGenerator(async () => {})).toBe(false);
    expect(F.isGenerator(class {})).toBe(false);
  });

  test("async generator check works", () => {
    expect(F.isAsyncGenerator(async function* () {})).toBe(true);

    expect(F.isAsyncGenerator(() => {})).toBe(false);
    expect(F.isAsyncGenerator(function* () {})).toBe(false);
    expect(F.isAsyncGenerator(class {})).toBe(false);
  });

  describe("try() works", () => {
    test("when arguments are passed", () => {
      const fn = vitest.fn((...args: number[]) => {
        return args.reduce((a, b) => a + b, 0);
      });

      // If the return value is correct, it means the function was called with the correct arguments.
      expect(F.try(fn, undefined, 1, 2, 3, 4)).toBe(10);
      expect(fn).toHaveBeenLastCalledWith(1, 2, 3, 4);
    });

    test("when the function does not throw", () => {
      expect(F.try(() => 1)).toBe(1);
      expect(F.try(() => undefined)).toBe(undefined);
      expect(F.try(() => false)).toBe(false);
      expect(F.try(() => new Error())).toBeInstanceOf(Error);
      expect(F.try(() => {})).toBe(undefined);
    });

    test("when the function throws", () => {
      expect(
        F.try(() => {
          throw new Error();
        })
      ).toBe(undefined);
      expect(
        F.try(() => {
          throw new Error();
        }, 1)
      ).toBe(1);
    });
  });

  describe("tryAsync() works", () => {
    test("when arguments are passed", async () => {
      const fn = vitest.fn(async (...args: number[]) => {
        return args.reduce((a, b) => a + b, 0);
      });

      // If the return value is correct, it means the function was called with the correct arguments.
      expect(await F.tryAsync(fn, undefined, 1, 2, 3, 4)).toBe(10);
      expect(fn).toHaveBeenLastCalledWith(1, 2, 3, 4);
    });

    test("when the function does not throw", async () => {
      expect(await F.tryAsync(async () => 1)).toBe(1);
      expect(await F.tryAsync(async () => undefined)).toBe(undefined);
      expect(await F.tryAsync(async () => false)).toBe(false);
      expect(await F.tryAsync(async () => new Error())).toBeInstanceOf(Error);
      expect(await F.tryAsync(async () => {})).toBe(undefined);
    });

    test("when the function throws", async () => {
      expect(
        await F.tryAsync(async () => {
          throw new Error();
        })
      ).toBe(undefined);
      expect(
        await F.tryAsync(async () => {
          throw new Error();
        }, 1)
      ).toBe(1);
    });
  });

  test("call() works", () => {
    const fn = vitest.fn((...args: number[]) => {
      return args.reduce((a, b) => a + b, 0);
    });

    expect(F.call(fn, undefined, 1, 2, 3, 4)).toBe(10);
    expect(fn).toHaveBeenLastCalledWith(1, 2, 3, 4);

    expect(F.call(() => 1)).toBe(1);
    expect(F.call(() => undefined)).toBe(undefined);
    expect(F.call(() => {})).toBe(undefined);

    expect(F.call("", "fallback", 1, 2, 3, 4)).toBe("fallback");
    expect(F.call({}, "fallback", 1, 2, 3, 4)).toBe("fallback");
  });

  test("identity() works", () => {
    expect(F.identity(1)).toBe(1);
    expect(F.identity()).toBe(undefined);

    const value = Symbol();

    expect(F.identity(value)).toBe(value);

    const fn = vitest.fn(() => {});

    expect(F.identity(fn)).toBe(fn);
    expect(fn).not.toHaveBeenCalled();
  });

  test("noop() works", () => {
    expect(F.noop()).toBe(undefined);
    expect(F.noop(1)).toBe(undefined);
    expect(F.noop(1, 2, 3)).toBe(undefined);
  });

  test("or() works", () => {
    const fn1 = vitest.fn(() => 1);
    const fn2 = vitest.fn(() => 2);
    const fn3 = vitest.fn(() => 3);

    expect(F.or(fn1, fn2, fn3)()).toBe(1);
    expect(fn1).toHaveBeenCalled();
    expect(fn2).not.toHaveBeenCalled();
    expect(fn3).not.toHaveBeenCalled();

    expect(F.or(undefined, fn2, fn3)()).toBe(2);
    expect(fn2).toHaveBeenCalled();

    expect(F.or(Symbol(), {}, fn3)()).toBe(3);
    expect(fn3).toHaveBeenCalled();

    expect(F.or(null, undefined, false)()).toBe(undefined);
  });

  test("once() works", () => {
    {
      const fn = vitest.fn(() => 1);

      const once = F.once(fn);
      expect(once()).toBe(1);
      expect(once()).toBe(1); // should only call fn once
      expect(fn).toHaveBeenCalledTimes(1);
    }

    {
      const once = F.once(Math.random);

      const first = once();

      expect(once()).toBe(first);
      expect(once.value).toBe(first);

      once.reset();

      expect(once.value).toBe(undefined);

      const second = once();

      expect(second).not.toBe(first);
      expect(once.value).toBe(second);

      type Test = Expect<Equal<typeof once.value, number | undefined>>;

      if (once.called) {
        type Test = Expect<Equal<typeof once.value, number>>;
      }

      if (!once.called) {
        type Test = Expect<Equal<typeof once.value, number | undefined>>;
      }
    }
  });
});
