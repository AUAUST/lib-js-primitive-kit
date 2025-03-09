import { describe, expect, test } from "vitest";
import { a, b, n, o, proxied, s } from "~/index";

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

describe("proxies", () => {
  test("forward methods to the handler", () => {
    expect(proxied(123).toNumber().toString()).toBe("123");
    expect(proxied("foo").toNumber()).toBe(NaN);
    expect(proxied("123").upper().toNumber()).toBe(123);
  });

  test("can switch from one type to another", () => {
    expect(proxied(123).s().wrap("<", ">").toString()).toBe("<123>");
    expect(proxied("123").n().value).toBe(123);
    expect(s("False").b().value).toBe(false);
    expect(n(3).a().value).toEqual([undefined, undefined, undefined]);
    expect(a(["a", "b", "c"]).o().value).toEqual({ 0: "a", 1: "b", 2: "c" });
    expect(b("False").n().s().value).toBe("0");
    expect(o(1).in("foo").value).toBe(false);
  });

  test("can be converted to primitives", () => {
    expect(proxied("100").toNumber()).toBe(100);
    expect(proxied(true).toString()).toBe("true");
    expect(proxied([1, 2, 3]).toArray()).toEqual([1, 2, 3]);
    expect(proxied({ foo: "bar" }).toObject()).toEqual({ foo: "bar" });
    expect(proxied("False").toBoolean()).toBe(false);
    expect(proxied(null)).toBe(undefined);
  });

  test("properly make use of [Symbol.toPrimitive]", () => {
    expect(+proxied("123")).toBe(123);
    // @ts-expect-error
    expect(proxied("123") + 1).toBe("1231");
    // @ts-expect-error
    expect(proxied(123) + 1).toBe(124);
    expect(`${proxied(123)}`).toBe("123");
    // @ts-expect-error
    expect(proxied("123") == 123).toBe(true);
  });

  test("have fallback methods", () => {
    expect(s().or("foo").value).toBe("foo");

    expect(n(0).or(123).value).toBe(0);
    expect(n(NaN).or(123).value).toBe(123);
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
    expect(s(123).valueOf()).toBe("123");
    expect(s(123) + "").toBe("123");
  });

  test("forwards methods to S", () => {
    expect(
      s("foo").afterFirst("f").capitalize().concat("p", "s").toString()
    ).toBe("Oops");
  });

  test("forwards methods to the prototype", () => {
    // charAt only comes from the prototype, while upper comes from S
    expect(s("foo").charAt(0).wrap("(", ")").upper().toString()).toBe("(F)");
  });

  test("can be chained with prototype and handler methods", () => {
    expect(s(123).wrap(" ", "  ").trim().toNumber()).toBe(123);
    expect(
      s(123)
        .wrap("<", ">") // "<123>"
        .toUpperCase() // "<123>"
        .substring(1, 3) // "12"
        .lower() // "12"
        .toNumber()
    ).toBe(12);
  });
});

describe("n() proxy", () => {
  test("is a function", () => {
    expect(typeof n).toBe("function");
  });

  test("returns an object holding the value of its argment", () => {
    expect(n(123)).toBeInstanceOf(Object);
    expect(n(123).value).toBe(123);
    expect(n(123).valueOf()).toBe(123);
    expect(n("123").valueOf()).toBe(123);
  });

  test("can be called without a parameter", () => {
    expect(n().value).toBe(0);
    expect(n().valueOf()).toBe(0);
    expect(n().toString()).toBe("0");
  });

  test("can be converted to a number", () => {
    expect(n("123").toNumber()).toBe(123);
    expect(n("123").toString()).toBe("123");
    expect(Number(n("123"))).toBe(123);
  });

  test("forwards methods to N", () => {
    expect(n(10).average(20).ceil().toNumber()).toBe(15);
  });

  // every prototype methods are overriden by `N` thus we can't test forwarding to the prototype

  test("can be chained", () => {
    expect(
      n(1)
        .sum(2, 4) // 7
        .divide(2) // 3.5
        .mod() // 0.5
        .multiply(10) // 5
        .power(2) // 25
        .mul(-1) // -25
        .abs() // 25
        .toNumber()
    ).toBe(25);
  });
});

describe("o() proxy", () => {
  test("allows to access object properties", () => {
    // note the accessed properties are also proxied
    expect(o({ foo: "bar" }).foo).toBeInstanceOf(Object);
    expect(o({ foo: "bar" }).foo.upper().value).toBe("BAR");
  });
});

describe("a() proxy", () => {
  test("allows to access array elements", () => {
    // note the accessed elements are also proxied
    expect(a([1, 2, 3])[0]).toBeInstanceOf(Object);
    expect(a([1, "hey"])[1].value).toBe("hey");
  });

  test("are iterable", () => {
    expect([...o({ foo: "bar", baz: "qux" }).keys()]).toEqual(
      expect.arrayContaining(["foo", "baz"])
    );

    expect([...a([1, 2, 3]), ...s("foo")]).toEqual([1, 2, 3, "f", "o", "o"]);
    // @ts-expect-error
    expect(() => [...b("True")]).toThrow();
  });

  test("", () => {
    expect(a(5, (_, i) => i).value).toEqual([0, 1, 2, 3, 4]);
    expect(a(5, (_, i) => i).last()?.value).toBe(4);
  });
});

describe("o() proxy", () => {
  test("allows to access object properties", () => {
    expect(o({ foo: "bar" }).foo).toBeInstanceOf(Object);
    expect(o({ foo: "bar" }).foo.upper().value).toBe("BAR");
  });

  test("are chainable", () => {
    expect(
      // @ts-expect-error
      o({
        foo: 1,
      })
        .assign({ bar: 2 })
        // @ts-expect-error
        .assign({ baz: 3 })
        .assign({
          some: { deep: { value: 4 } },
        })
        .defineProperty("qux", {
          value: 5,
          enumerable: true,
        })
        .definePropertyIfUnset("qux", {
          value: 6, // should not override
        })
        .flat().value
    ).toEqual({
      foo: 1,
      bar: 2,
      baz: 3,
      "some.deep.value": 4,
      qux: 5,
    });
  });

  test("handles method calls", () => {
    expect(
      o({
        myMethod() {
          return 1;
        },
      }).myMethod().value
    ).toBe(1);
  });
});
