import { S } from "~/String";

import { describe, expect, test } from "@jest/globals";

describe("S class", () => {
  test("called as a function works", () => {
    [
      "",
      new String(""),
      0,
      new Number(0),
      {},
      [],
      null,
      undefined,
      "false",
      "true",
    ].forEach((x) => {
      expect(S(x)).toBe(S.from(x));
    });
  });

  test("conversion to string works", () => {
    expect(S.from("foo")).toBe("foo");
    expect(S.from(new String("foo"))).toBe("foo");
    expect(S.from(0)).toBe("0");
    expect(S.from(new Number(0))).toBe("0");
    expect(S.from(false)).toBe("false");
    expect(S.from(new Boolean(false))).toBe("false");

    expect(S.from({})).toBe("[object Object]");

    expect(
      S.from({
        toString() {
          return "foo";
        },
      })
    ).toBe("foo");

    expect(
      S.from({
        [Symbol.toPrimitive]() {
          return 0;
        },
      })
    ).toBe("0");

    expect(S.from([])).toBe("");
    expect(S.from([1, 2, 3])).toBe("1,2,3");

    expect(S.from(null)).toBe("");
    expect(S.from(undefined)).toBe("");
  });

  test("non-strict typecheck works", () => {
    // Primitive strings and String objects should both pass the check.
    expect(S.is("string")).toBe(true);
    expect(S.is(new String("string"))).toBe(true);

    // Other types should fail the check.
    expect(S.is(0)).toBe(false);
    expect(S.is(new Number(0))).toBe(false);
    expect(S.is(false)).toBe(false);
    expect(S.is(new Boolean(false))).toBe(false);
    expect(S.is({})).toBe(false);
    expect(S.is([])).toBe(false);
    expect(S.is(null)).toBe(false);
    expect(S.is(undefined)).toBe(false);
  });

  test("strict typecheck works", () => {
    // Primitive strings should pass the check.
    expect(S.isStrict("string")).toBe(true);
    // Empty strings should fail the check.
    expect(S.isStrict("")).toBe(false);
    // String objects should fail the check.
    expect(S.isStrict(new String("string"))).toBe(false);

    // Other types should fail the check.
    expect(S.isStrict(0)).toBe(false);
    expect(S.isStrict(new Number(0))).toBe(false);
    expect(S.isStrict(false)).toBe(false);
    expect(S.isStrict(new Boolean(false))).toBe(false);
    expect(S.isStrict({})).toBe(false);
    expect(S.isStrict([])).toBe(false);
    expect(S.isStrict(null)).toBe(false);
    expect(S.isStrict(undefined)).toBe(false);
  });

  test("splitWords() works", () => {
    {
      const string = "This is a string.";
      const expected = ["This", "is", "a", "string"];
      const split = S.splitWords(string);

      expect(split).toEqual(expected);
    }

    {
      const string = "ThisIsAString.";
      const expected = ["This", "Is", "A", "String"];
      const split = S.splitWords(string);

      expect(split).toEqual(expected);
    }

    {
      const string = "CAPS";
      const expected = ["C", "A", "P", "S"];
      const split = S.splitWords(string);

      expect(split).toEqual(expected);
    }
  });

  test("capitalize() works", () => {
    expect(S.capitalize("foo")).toBe("Foo");
    expect(S.capitalize("FooBar")).toBe("FooBar");
    expect(S.capitalize("0")).toBe("0");
  });

  test("toTitleCase() works", () => {
    expect(S.toTitleCase("this is a string")).toBe("This Is A String");
    expect(S.toTitleCase("thisIsAString")).toBe("ThisIsAString");
    expect(S.toTitleCase("The brand FOOBAR is the best!")).toBe(
      "The Brand FOOBAR Is The Best!"
    );
    expect(S.toTitleCase("jean-claude van damme")).toBe(
      "Jean-Claude Van Damme"
    );
  });

  test("toLowerCase() works", () => {
    expect(S.toLowerCase("FOO")).toBe("foo");
    expect(S.toLowerCase("foo")).toBe("foo");
    expect(S.toLowerCase("Foo")).toBe("foo");
    expect(S.toLowerCase(0)).toBe("0");
  });

  test("toUpperCase() works", () => {
    expect(S.toUpperCase("FOO")).toBe("FOO");
    expect(S.toUpperCase("foo")).toBe("FOO");
    expect(S.toUpperCase("Foo")).toBe("FOO");
  });

  const locales = ["en-US", "en-GB", "fr-FR", "fr-CA", "TR"];
  const localizable = [
    "I",
    "İ",
    "ı",
    "İ",
    "i",
    "I",
    "ß",
    "SS",
    "ss",
    "istanbul",
    "İstanbul",
    "Gesäß",
    "GESÄSS",
  ];

  test("toLocaleLowerCase() works", () => {
    for (const locale of locales) {
      for (const str of localizable) {
        expect(S.toLocaleLowerCase(str, locale)).toBe(
          str.toLocaleLowerCase(locale)
        );
      }
    }
  });

  test("toLocaleUpperCase() works", () => {
    for (const locale of locales) {
      for (const str of localizable) {
        expect(S.toLocaleUpperCase(str, locale)).toBe(
          str.toLocaleUpperCase(locale)
        );
      }
    }
  });

  test("toCamelCase() works", () => {
    expect(S.toCamelCase("foo")).toBe("foo");
    expect(S.toCamelCase("foo bar")).toBe("fooBar");
    expect(S.toCamelCase("foo-bar")).toBe("fooBar");
    expect(S.toCamelCase("foo_bar")).toBe("fooBar");
    expect(S.toCamelCase("foo.bar")).toBe("fooBar");
    expect(S.toCamelCase("foo bar baz")).toBe("fooBarBaz");
    expect(S.toCamelCase("FOO-BAR-BAZ")).toBe("fOOBARBAZ");
    expect(S.toCamelCase("FOO-BAR-BAZ", true)).toBe("fooBarBaz");
    expect(S.toCamelCase("Foo_Bar_Baz")).toBe("fooBarBaz");
    expect(S.toCamelCase("foo.bar.baz")).toBe("fooBarBaz");
  });

  test("toUpperCamelCase() works", () => {
    expect(S.toUpperCamelCase("foo")).toBe("Foo");
    expect(S.toUpperCamelCase("foo bar")).toBe("FooBar");
    expect(S.toUpperCamelCase("foo-bar")).toBe("FooBar");
    expect(S.toUpperCamelCase("foo_bar")).toBe("FooBar");
    expect(S.toUpperCamelCase("foo.bar")).toBe("FooBar");
    expect(S.toUpperCamelCase("foo bar baz")).toBe("FooBarBaz");
    expect(S.toUpperCamelCase("FOO-BAR-BAZ")).toBe("FOOBARBAZ");
    expect(S.toUpperCamelCase("FOO-BAR-BAZ", true)).toBe("FooBarBaz");
    expect(S.toUpperCamelCase("Foo_Bar_Baz")).toBe("FooBarBaz");
    expect(S.toUpperCamelCase("foo.bar.baz")).toBe("FooBarBaz");
  });

  test("toSnakeCase() works", () => {
    expect(S.toSnakeCase("foo")).toBe("foo");
    expect(S.toSnakeCase("foo bar")).toBe("foo_bar");
    expect(S.toSnakeCase("foo-bar")).toBe("foo_bar");
    expect(S.toSnakeCase("foo_bar")).toBe("foo_bar");
    expect(S.toSnakeCase("foo.bar")).toBe("foo_bar");
    expect(S.toSnakeCase("foo bar baz")).toBe("foo_bar_baz");
    expect(S.toSnakeCase("FOO-BAR-BAZ")).toBe("f_o_o_b_a_r_b_a_z");
    expect(S.toSnakeCase("FOO-BAR-BAZ", true)).toBe("foo_bar_baz");
    expect(S.toSnakeCase("Foo_Bar_Baz")).toBe("foo_bar_baz");
    expect(S.toSnakeCase("foo.bar.baz")).toBe("foo_bar_baz");
  });

  test("toKebabCase() works", () => {
    expect(S.toKebabCase("foo")).toBe("foo");
    expect(S.toKebabCase("foo bar")).toBe("foo-bar");
    expect(S.toKebabCase("foo-bar")).toBe("foo-bar");
    expect(S.toKebabCase("foo_bar")).toBe("foo-bar");
    expect(S.toKebabCase("foo.bar")).toBe("foo-bar");
    expect(S.toKebabCase("foo bar baz")).toBe("foo-bar-baz");
    expect(S.toKebabCase("FOO-BAR-BAZ")).toBe("f-o-o-b-a-r-b-a-z");
    expect(S.toKebabCase("FOO-BAR-BAZ", true)).toBe("foo-bar-baz");
    expect(S.toKebabCase("Foo_Bar_Baz")).toBe("foo-bar-baz");
    expect(S.toKebabCase("foo.bar.baz")).toBe("foo-bar-baz");
  });

  test("toCustomCase() works", () => {
    expect(S.toCustomCase("foo bar", "_")).toBe("foo_bar");
    expect(S.toCustomCase("Foo-bar", " ")).toBe("Foo bar");

    expect(
      S.toCustomCase("foo bar baz", {
        separator: "",
        firstWordCase: "lower",
        wordCase: "capital",
      })
    ).toBe("fooBarBaz");

    expect(
      S.toCustomCase("fOo-Bar-Baz", {
        separator: "~",
        firstWordCase: "keep",
        wordCase: "upper",
        ignoreCaps: true,
      })
    ).toBe("fOo~BAR~BAZ");

    expect(
      S.toCustomCase("FOO BAR BAZ", {
        ignoreCaps: true,
        separator: " ",
      })
    ).toBe("FOO BAR BAZ");

    expect(
      S.toCustomCase("FOO BAR BAZ", {
        ignoreCaps: false,
      })
    ).toBe("FOOBARBAZ");
  });

  test("trim() works", () => {
    expect(S.trim(" \r foo \n\t")).toBe("foo");
    expect(S.trim(" foo")).toBe("foo");
    expect(S.trim("foo ")).toBe("foo");
    expect(S.trim("foo")).toBe("foo");

    expect(S.trim("foo", "f")).toBe("oo");
    expect(S.trim("foo", "o")).toBe("f");
    expect(S.trim("foo", "fo")).toBe("");
    expect(S.trim("foo", "a")).toBe("foo");

    expect(S.trim("yolollololo", /lo/)).toBe("yolol");
    expect(S.trim("tatatatafalatatata", /tatata/)).toBe("tafala");
    expect(S.trim("lolooolyolollololo", /[lo]/)).toBe("y");

    // @ts-expect-error
    expect(() => S.trim("foo", {})).toThrow(TypeError);
  });

  test("trimStart() works", () => {
    expect(S.trimStart("\r\r\t foo ")).toBe("foo ");
    expect(S.trimStart(" foo")).toBe("foo");
    expect(S.trimStart("foo ")).toBe("foo ");
    expect(S.trimStart("foo")).toBe("foo");

    expect(S.trimStart("foo", "f")).toBe("oo");
    expect(S.trimStart("foo", "o")).toBe("foo");

    expect(S.trimStart("foo", "fo")).toBe("");
    expect(S.trimStart("foo", "a")).toBe("foo");

    expect(S.trimStart("lolololooooooyolollolo", /lo/)).toBe("oooooyolollolo");
    expect(S.trimStart("tatatatatafalatata", /tatata/)).toBe("tatafalatata");
    expect(S.trimStart("lolololooooooyolollololo", /[lo]/)).toBe("yolollololo");

    // @ts-expect-error
    expect(() => S.trimStart("foo", {})).toThrow(TypeError);
  });

  test("trimEnd() works", () => {
    expect(S.trimEnd(" foo \r\t")).toBe(" foo");
    expect(S.trimEnd(" foo")).toBe(" foo");
    expect(S.trimEnd("foo ")).toBe("foo");
    expect(S.trimEnd("foo")).toBe("foo");

    expect(S.trimEnd("foo", "f")).toBe("foo");
    expect(S.trimEnd("foo", "o")).toBe("f");

    expect(S.trimEnd("foo", "fo")).toBe("");
    expect(S.trimEnd("foo", "a")).toBe("foo");

    expect(S.trimEnd("yolollololo", /lo/)).toBe("yolol");
    expect(S.trimEnd("ratatatatatatata", /tatata/)).toBe("rata");
    expect(S.trimEnd("yolollololo", /[lo]/)).toBe("y");

    // @ts-expect-error
    expect(() => S.trimEnd("foo", {})).toThrow(TypeError);
  });

  test("padStart() works", () => {
    expect(S.padStart("foo", 3)).toBe("foo");
    expect(S.padStart("foo", 2)).toBe("foo");

    expect(S.padStart("foo", 5, ".")).toBe("..foo");
    expect(S.padStart("foo", 5, "123")).toBe("12foo");
  });

  test("padEnd() works", () => {
    expect(S.padEnd("foo", 3)).toBe("foo");
    expect(S.padEnd("foo", 2)).toBe("foo");

    expect(S.padEnd("foo", 5, ".")).toBe("foo..");
    expect(S.padEnd("foo", 5, "123")).toBe("foo12");
  });

  test("truncateStart() works", () => {
    expect(S.truncateStart("foo", 3)).toBe("foo");
    expect(S.truncateStart("foo", 2)).toBe("oo");

    expect(S.truncateStart("foo", 3, "...")).toBe("foo");
    expect(S.truncateStart("aaaaaaaaaaaaaaa", 5, "...")).toBe("...aa");
    expect(S.truncateStart("aaaaaaaaaaaaaaa", 5, "…")).toBe("…aaaa");

    expect(() => S.truncateStart("foo", 2, "....")).toThrow(RangeError);
  });

  test("truncateEnd() works", () => {
    expect(S.truncateEnd("foo", 3)).toBe("foo");
    expect(S.truncateEnd("foo", 2)).toBe("fo");

    expect(S.truncateEnd("foo", 3, "...")).toBe("foo");
    expect(S.truncateEnd("aaaaaaaaaaaaaaa", 5, "...")).toBe("aa...");
    expect(S.truncateEnd("aaaaaaaaaaaaaaa", 5, "…")).toBe("aaaa…");

    expect(() => S.truncateEnd("foo", 2, "....")).toThrow(RangeError);
  });

  test("equals() works", () => {
    expect(S.equals("foo", "foo")).toBe(true);
    expect(S.equals("foo", "bar")).toBe(false);
    expect(S.equals("foo", "Foo")).toBe(true);
    expect(S.equals("foo", "FOO")).toBe(true);

    expect(
      S.equals("foo", "Foo", {
        caseSensitive: true,
      })
    ).toBe(false);
  });
});
