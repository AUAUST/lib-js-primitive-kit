import { describe, expect, test } from "vitest";
import { proxied, s } from "~/proxy";

describe("proxied()", () => {
  test("matches the type of the input", () => {
    expect(proxied(123).value).toBe(123);
    expect(proxied(0.5).valueOf()).toBe(0.5);

    expect(proxied("foo").value).toBe("foo");
    expect(proxied("").valueOf()).toBe("");

    expect(proxied(true).value).toBe(true);
    expect(proxied(false).valueOf()).toBe(false);

    expect(proxied([1, 2, 3]).value).toEqual([1, 2, 3]);
    expect(proxied([]).valueOf()).toEqual([]);

    expect(proxied({ foo: "bar" }).value).toEqual({ foo: "bar" });
    expect(proxied({}).valueOf()).toEqual({});

    expect(proxied(null)).toBe(undefined);
    expect(proxied(undefined)).toBe(undefined);
  });
});

describe("s() proxy", () => {
  test("is a function", () => {
    expect(typeof s).toBe("function");
  });

  test("returns an object holding the value of its argment", () => {
    expect(s("foo")).toBeInstanceOf(Object);
    expect(s("foo").value).toBe("foo");
    expect(s("foo").valueOf()).toBe("foo");
    expect(s(123).valueOf()).toBe("123");
  });

  test("can be called without a parameter", () => {
    expect(s().value).toBe("");
    expect(s().valueOf()).toBe("");
    expect(s().toString()).toBe("");
  });

  test("can be converted to a string", () => {
    expect(s("foo").toString()).toBe("foo");
    expect(s(123).toString()).toBe("123");
    expect(s(123) + "").toBe("123");
    expect(s(123).wrap(" ", "  ").trim().toNumber()).toBe(123);
  });

  test("forwards methods to S", () => {
    expect(
      s("foo").afterFirst("f").capitalize().concat("p", "s").toString()
    ).toBe("Oops");
  });

  test("forwards methods to the prototype", () => {
    expect(s("foo").charAt(0).wrap("(", ")").upper().toString()).toBe("(F)");
  });
});
