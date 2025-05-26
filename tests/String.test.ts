import { S } from "@auaust/primitive-kit";

import { describe, expect, test } from "vitest";

describe("Static S class", () => {
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

    {
      const str = S.from({
        toString() {
          return "foo" as const;
        },
      });
      expect(str === "foo").toBe(true); // Check for TypeScript type inference.
      expect(str).toBe("foo");
    }

    {
      const str = S.from({
        [Symbol.toPrimitive]() {
          return 0 as const;
        },
      });
      expect(str === "0").toBe(true); // Check for TypeScript type inference.
      expect(str).toBe("0");
    }

    expect(S.from([])).toBe("");
    expect(S.from([1, 2, 3])).toBe("1,2,3");
    expect(S.from(null)).toBe("");
    expect(S.from(undefined)).toBe("");
  });

  test("is() and isNot() works", () => {
    const strings = ["", "string"];

    const notString = [
      new String(""),
      new String("string"),
      0,
      false,
      {},
      [],
      null,
      undefined,
    ];

    for (const str of strings) {
      expect(S.is(str)).toBe(true);
      expect(S.isNot(str)).toBe(false);
    }

    for (const str of notString) {
      expect(S.is(str)).toBe(false);
      expect(S.isNot(str)).toBe(true);
    }
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

  describe("splitWords() works", () => {
    test("with basic sentence case", () => {
      expect(S.splitWords("This is a string.")).toEqual([
        "This",
        "is",
        "a",
        "string",
      ]);
    });

    test("with camel case", () => {
      expect(S.splitWords("ThisIsAString.")).toEqual([
        "This",
        "Is",
        "A",
        "String",
      ]);
    });

    test("with a boolean as options", () => {
      expect(S.splitWords("CAPS")).toEqual(["C", "A", "P", "S"]);
      expect(S.splitWords("CAPS", false)).toEqual(["C", "A", "P", "S"]);
      expect(S.splitWords("CAPS", true)).toEqual(["CAPS"]);
    });

    test("with diacritics", () => {
      expect(
        S.splitWords("Ça c'est très élégant", { unaccent: false })
      ).toEqual(["Ça", "c", "est", "très", "élégant"]);
      expect(
        S.splitWords("ÇaÇaÉtéCommeCœurLætitiaSouﬁfreÀLaPlaceŒuf", {
          unaccent: false,
        })
      ).toEqual([
        "Ça",
        "Ça",
        "Été",
        "Comme",
        "Cœur",
        "Lætitia",
        "Souﬁfre",
        "À",
        "La",
        "Place",
        "Œuf",
      ]);
      expect(
        S.splitWords("ÇaÇaÉtéCommeCœurLætitiaSouﬁfreÀLaPlaceŒuf", {})
      ).toEqual([
        "Ca",
        "Ca",
        "Ete",
        "Comme",
        "Coeur",
        "Laetitia",
        "Soufifre",
        "A",
        "La",
        "Place",
        "Oeuf",
      ]);

      expect(
        S.splitWords("ÇaÇaÉtéCommeHiverÀLaPlaceŒuf", {
          unaccent: true,
        })
      ).toEqual([
        "Ca",
        "Ca",
        "Ete",
        "Comme",
        "Hiver",
        "A",
        "La",
        "Place",
        "Oeuf",
      ]);
    });

    test("with options", () => {
      expect(
        S.splitWords("ThisIsAString.", {
          ignoreCaps: true,
        })
      ).toEqual(["ThisIsAString"]);

      expect(
        S.splitWords("ThisIsAString.", {
          ignoreCaps: false,
        })
      ).toEqual(["This", "Is", "A", "String"]);

      expect(
        S.splitWords("Ça c'est très élégant", {
          unaccent: false,
        })
      ).toEqual(["Ça", "c", "est", "très", "élégant"]);

      expect(
        S.splitWords("Ça c'est très élégant", {
          unaccent: true,
        })
      ).toEqual(["Ca", "c", "est", "tres", "elegant"]);
    });
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

    // Unchanged case if the case is specified to something that doesn't exist.
    expect(
      S.toCustomCase("foo bar baz", {
        // @ts-expect-error
        wordCase: "noexist",
      })
    ).toBe("foobarbaz");

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

    expect(
      S.toCustomCase("I ate a crème brûlée", {
        separator: "_",
        wordCase: "upper",
        unaccent: true,
      })
    ).toBe("I_ATE_A_CREME_BRULEE");

    expect(
      S.toCustomCase("04d3f2a0-8b9b-4b9a-jh32-98df7a8d7f6a", {
        separator: " ",
        ignoreCaps: true,
        wordCase: "upper",
      })
    ).toBe("04D3F2A0 8B9B 4B9A JH32 98DF7A8D7F6A");

    expect(S.toCustomCase).toBe(S.custom);
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

  test("equals() works with various string features", () => {
    expect(S.equals("foo", "foo")).toBe(true);
    expect(S.equals("foo", "bar")).toBe(false);
    expect(S.equals("foo", "FOO")).toBe(true);
    expect(S.equals("foo", "FOO", { caseSensitive: true })).toBe(false);
    expect(S.equals(" foo ", "foo")).toBe(false);
    expect(S.equals(" foo ", "foo", { trim: true })).toBe(true);
    expect(S.equals("héllo, fiou", "hello, ﬁou")).toBe(false);
    expect(S.equals("héllo, fiou", "hello, ﬁou", { unaccent: true })).toBe(
      true
    );
    expect(S.equals("", "")).toBe(true);
    expect(S.equals(null, null)).toBe(true); // converted to ""
    expect(S.equals("foo", null)).toBe(false);
  });

  test("afterFirst() works", () => {
    expect(S.afterFirst("foo", "f")).toBe("oo");
    expect(S.afterFirst("foo", "o")).toBe("o");
    expect(S.afterFirst("foo", "oo")).toBe("");
    expect(S.afterFirst("foo", "a")).toBe("");
    expect(S.afterFirst("foo bar foo", "foo")).toBe(" bar foo");
  });

  test("afterLast() works", () => {
    expect(S.afterLast("foo", "f")).toBe("oo");
    expect(S.afterLast("foo", "o")).toBe("");
    expect(S.afterLast("foo", "oo")).toBe("");
    expect(S.afterLast("foo", "a")).toBe("");
    expect(S.afterLast("foo bar foo", "foo")).toBe("");
  });

  test("afterStart() works", () => {
    expect(S.afterStart("foo", "f")).toBe("oo");
    expect(S.afterStart("foo", "o")).toBe("");
    expect(S.afterStart("foo", "oo")).toBe("");
    expect(S.afterStart("foo", "a")).toBe("");
    expect(S.afterStart("foo bar foo", "foo")).toBe(" bar foo");
  });

  test("afterNth() works", () => {
    expect(S.afterNth("0.1.2.3", ".", 0)).toBe("1.2.3");
    expect(S.afterNth("0.1.2.3", ".", 1)).toBe("2.3");
    expect(S.afterNth("0.1.2.3", ".", 2)).toBe("3");
    expect(S.afterNth("0.1.2.3", ".", 3)).toBe("");

    expect(S.afterNth("0.1.2.3", ".", -1)).toBe("3");
    expect(S.afterNth("0.1.2.3", ".", -3)).toBe("1.2.3");
    expect(S.afterNth("0.1.2.3", ".", -5)).toBe("");
  });

  test("beforeFirst() works", () => {
    expect(S.beforeFirst("foo", "f")).toBe("");
    expect(S.beforeFirst("foo", "o")).toBe("f");
    expect(S.beforeFirst("foo", "oo")).toBe("f");
    expect(S.beforeFirst("foo", "a")).toBe("");
    expect(S.beforeFirst("bar foo bar foo", "foo")).toBe("bar ");
  });

  test("beforeLast() works", () => {
    expect(S.beforeLast("foo", "f")).toBe("");
    expect(S.beforeLast("foo", "o")).toBe("fo");
    expect(S.beforeLast("foo", "oo")).toBe("f");
    expect(S.beforeLast("foo", "a")).toBe("");
    expect(S.beforeLast("bar foo bar foo", "bar")).toBe("bar foo ");
  });

  test("beforeEnd() works", () => {
    expect(S.beforeEnd("foo", "f")).toBe("");
    expect(S.beforeEnd("foo", "o")).toBe("fo");
    expect(S.beforeEnd("foo", "oo")).toBe("f");
    expect(S.beforeEnd("foo", "a")).toBe("");
    expect(S.beforeEnd("bar foo bar foo", "bar")).toBe("");
    expect(S.beforeEnd("bar foo bar foo", "foo")).toBe("bar foo bar ");
  });

  test("beforeNth() works", () => {
    expect(S.beforeNth("0.1.2.3", ".", 0)).toBe("0");
    expect(S.beforeNth("0.1.2.3", ".", 1)).toBe("0.1");
    expect(S.beforeNth("0.1.2.3", ".", 2)).toBe("0.1.2");
    expect(S.beforeNth("0.1.2.3", ".", 3)).toBe("");

    expect(S.beforeNth("0.1.2.3", ".", -1)).toBe("0.1.2");
    expect(S.beforeNth("0.1.2.3", ".", -3)).toBe("0");
    expect(S.beforeNth("0.1.2.3", ".", -4)).toBe("");
  });

  test("between() works", () => {
    expect(S.between("foo", "f", "o")).toBe("o");
    expect(S.between("foo", "o", "f")).toBe("");
    expect(S.between("foo", "o", "o")).toBe("");
    expect(S.between("foo", "a", "b")).toBe("");
    expect(S.between("foo bar foo", "foo", "foo")).toBe(" bar ");
  });

  test("contains() works", () => {
    expect(S.contains("foo", "f")).toBe(true);
    expect(S.contains("foo bar foo", "foo")).toBe(true);
    expect(S.contains("foo", "")).toBe(true); // Empty substring should always be contained
    expect(S.contains("foo", "F")).toBe(false);
    expect(S.contains("foo", "F", { caseSensitive: false })).toBe(true);
    expect(S.contains("foo", " o ")).toBe(false);
    expect(S.contains("foo", " o ", { trim: true })).toBe(true);
    expect(S.contains("héllo, ﬁou", "fiou")).toBe(false);
    expect(S.contains("héllo, ﬁou", "fiou", { unaccent: true })).toBe(true);
    expect(
      S.contains("FœU", "  FOE ", {
        caseSensitive: false,
        trim: true,
        unaccent: true,
      })
    ).toBe(true);
  });

  test("startsWith() works with various string features", () => {
    // Basic usage
    expect(S.startsWith("foo", "f")).toBe(true);
    expect(S.startsWith("foobar", "foo")).toBe(true);
    expect(S.startsWith("foo", "bar")).toBe(false);

    // Case sensitivity
    expect(S.startsWith("foo", "F")).toBe(false);
    expect(S.startsWith("foo", "F", { caseSensitive: false })).toBe(true);

    // Trimming
    expect(S.startsWith(" foo", " f ")).toBe(false);
    expect(S.startsWith(" foo", " f ", { trim: true })).toBe(false);
    expect(S.startsWith(" foo", " f", { trim: true })).toBe(true);
    expect(S.startsWith(" f oo", " f ", { trim: true })).toBe(true);

    // Unaccent
    expect(S.startsWith("héllo, fiou", "hello")).toBe(false);
    expect(S.startsWith("héllo, fiou", "hello", { unaccent: true })).toBe(true);

    expect(S.startsWith("foo", "")).toBe(true);
    expect(S.startsWith("", "foo")).toBe(false);
  });

  test("ensureStart() works", () => {
    expect(S.ensureStart("foo", "f")).toBe("foo");
    expect(S.ensureStart("oo", "f")).toBe("foo");
    expect(S.ensureStart("Hi!", "IMPORTANT MESSAGE: ")).toBe(
      "IMPORTANT MESSAGE: Hi!"
    );
  });

  test("endsWith() works", () => {
    // Basic usage
    expect(S.endsWith("foo", "o")).toBe(true);
    expect(S.endsWith("foobar", "bar")).toBe(true);
    expect(S.endsWith("foo", "bar")).toBe(false);

    // Case sensitivity
    expect(S.endsWith("foo", "O")).toBe(false);
    expect(S.endsWith("foo", "O", { caseSensitive: false })).toBe(true);

    // Trimming
    expect(S.endsWith("foo ", " o ")).toBe(false);
    expect(S.endsWith("foo ", " o ", { trim: true })).toBe(false);
    expect(S.endsWith("foo ", "o ", { trim: true })).toBe(true);
    expect(S.endsWith("foo o ", " o ", { trim: true })).toBe(true);

    // Unaccent
    expect(S.endsWith("héllo, fiou", "ﬁou")).toBe(false);
    expect(S.endsWith("héllo, fiou", "ﬁou", { unaccent: true })).toBe(true);

    expect(S.endsWith("foo", "")).toBe(true);
    expect(S.endsWith("", "foo")).toBe(false);
  });

  test("ensureEnd() works", () => {
    expect(S.ensureEnd("foo", "o")).toBe("foo");
    expect(S.ensureEnd("f", "oo")).toBe("foo");
    expect(S.ensureEnd("Hi!", " - THIS WAS AN IMPORTANT MESSAGE")).toBe(
      "Hi! - THIS WAS AN IMPORTANT MESSAGE"
    );
  });

  test("increment() works", () => {
    expect(S.increment("foo")).toBe("foo1");
    expect(S.increment("foo1")).toBe("foo2");
    expect(S.increment("foo-9")).toBe("foo-10");
    expect(S.increment("foo", 2)).toBe("foo2");
    expect(S.increment("foo", 10)).toBe("foo10");
    expect(S.increment("foo", 0)).toBe("foo");
    expect(
      S.increment("foo", {
        increment: 2,
        separator: "-",
        pad: 3,
        filler: "0",
      })
    ).toBe("foo-002");

    // @ts-expect-error
    expect(S.increment("foo", "bar")).toBe("foo1");

    expect(S.increment("foo", -2)).toBe(S.decrement("foo", 2));
  });

  test("decrement() works", () => {
    expect(S.decrement("foo")).toBe("foo");
    expect(S.decrement("foo", 0)).toBe("foo");
    expect(S.decrement("foo1")).toBe("foo");
    expect(S.decrement("foo1", { keepZero: false })).toBe("foo");
    expect(S.decrement("foo1", { keepZero: true })).toBe("foo0");
    expect(S.decrement("foo2")).toBe("foo1");
    expect(S.decrement("foo-10", 5)).toBe("foo-5");
    expect(
      S.decrement("meep-0", {
        decrement: 2,
        keepZero: false,
        separator: "-",
      })
    ).toBe("meep");
    expect(
      S.decrement("foo-1001", {
        decrement: 2,
        pad: 5,
        filler: "0",
      })
    ).toBe("foo-00999");
    expect(S.decrement("foo-0", { keepZero: true })).toBe("foo-0");
    expect(S.decrement("foo2", { decrement: 3 })).toBe("foo");
    expect(S.decrement("map2", { decrement: 3, keepZero: true })).toBe("map0");
    expect(S.decrement("foo2", { separator: "" })).toBe("foo1");
    expect(S.decrement("foo2", { separator: "-" })).toBe("foo-1");
    expect(S.decrement("foo2", { separator: "-", pad: false })).toBe("foo-1");
    expect(
      S.decrement("foo2", {
        separator: "-",
        decrement: 3,
        keepZero: true,
        pad: 3,
        filler: "0",
      })
    ).toBe("foo-000");

    expect(S.decrement("foo2", -2)).toBe(S.increment("foo2", 2));
  });

  test("random() works", () => {
    expect(S.random()).toMatch(/^[a-zA-Z0-9]{8}$/);
    expect(S.random(NaN)).toMatch(/^[a-zA-Z0-9]{8}$/);
    expect(S.random(0)).toBe("");
    expect(S.random(512)).toMatch(/^[a-zA-Z0-9]{512}$/);

    expect(S.random()).toHaveLength(8);
    expect(S.random(512)).toHaveLength(512);
    expect(S.random({ case: "upper" })).toHaveLength(8);

    expect(S.random(10, "é")).toBe("éééééééééé");
    expect(S.random(512, "_.a90")).toMatch(/^[-_\.a90]{512}$/);

    expect(S.random({ case: "upper", length: 256 })).toMatch(/^[A-Z0-9]{256}$/);
    expect(S.random({ case: "lower", length: 256 })).toMatch(/^[a-z0-9]{256}$/);
    expect(
      S.random({
        numbers: false,
        case: "mixed",
        length: 256,
      })
    ).toMatch(/^[a-zA-Z]{256}$/);
    expect(
      S.random({
        numbers: true,
        case: "mixed",
        length: 256,
      })
    ).toMatch(/^[a-zA-Z0-9]{256}$/);
    expect(
      S.random({
        numbers: "01234",
        length: 256,
      })
    ).toMatch(/^[a-zA-Z01234]{256}$/);
    expect(
      S.random({
        numbers: false,
        case: "mixed",
        symbols: "*%&/",
        length: 256,
      })
    ).toMatch(/^[a-zA-Z\*%&/]{256}$/);
    expect(
      S.random({
        numbers: false,
        case: "mixed",
        symbols: true,
        length: 256,
      })
    ).toMatch(/^[a-zA-Z_-]{256}$/);
    expect(S.random({ length: 512, chars: "**41+===" })).toMatch(
      /^[\*41\+=]{512}$/
    );

    expect(() => S.random(-1)).toThrow(RangeError);
    expect(() => S.random(Infinity)).toThrow(RangeError);
    expect(() => S.random(-Infinity)).toThrow(RangeError);
    expect(() =>
      S.random({
        chars: "",
      })
    ).toThrow(RangeError);

    // Passing chars as a number should use the number as the radix for random number stringification.
    expect(S.random({ chars: 16 })).toMatch(/^[0-9a-f]{8}$/);
    expect(S.random(256, 16)).toMatch(/^[0-9a-f]{256}$/);
    expect(S.random(256, 2)).toMatch(/^[01]{256}$/);
    expect(S.random(256, 8)).toMatch(/^[0-7]{256}$/);
    expect(S.random(256, 10)).toMatch(/^[0-9]{256}$/);
    expect(S.random(256, 36)).toMatch(/^[0-9a-z]{256}$/);
  });

  describe("mapReplace() works", () => {
    test("with an array input of strings", () => {
      expect(S.mapReplace("foo", [["foo", "bar"]])).toBe("bar");
      expect(S.mapReplace("foofoo", [["foo", "bar"]], true)).toBe("barbar");
      expect(S.mapReplace("foofoo", [["fooo", "bar"]])).toBe("foofoo");
      expect(
        S.mapReplace("hello", [
          ["h", "j"],
          ["jello", "world"],
        ])
      ).toBe("world");
    });

    test("with an array input of RegExp", () => {
      expect(S.mapReplace("foo", [[/foo/, "bar"]])).toBe("bar");
      expect(S.mapReplace("foo", [[/\w+/, "_"]])).toBe("_");
      expect(S.mapReplace("foo", [[/\w/g, "_"]])).toBe("___");
    });

    test("with a 2-dimensional array input of strings and RegExp", () => {
      expect(
        S.mapReplace(
          "foofoo barbar bazbaz",
          [
            [/foo/g, "mip"], // global so replaces both "foo"
            ["bar", "map"], // `true` passed so global replacements
            [/baz/, "mop"], // not global so replaces only the first "baz" (regex not impacted by `replaceAll` option)
          ],
          true
        )
      ).toBe("mipmip mapmap mopbaz");

      expect(
        S.mapReplace("This  is a   fun test with fun things", [
          // should deduplicate and transform all whitespace to a single dash
          [/\s+/g, "-"],
          // should bring much fun
          ["fun", "really fun"],
          // should prepend "« " to the start of the string
          [/^/, "« "],
          // should append " »" to the end of the string
          [/$/, " »"],
          // should trim all words to maximum 3 characters
          [/(\w{3})\w+/g, "$1"],
        ])
      ).toBe("« Thi-is-a-rea fun-tes-wit-fun-thi »");
    });

    test("with a simple object", () => {
      // replace the first occurrence
      expect(S.mapReplace("foofoofoo", { foo: "bar" })).toBe("barfoofoo");
      // replace all occurrences
      expect(S.mapReplace("foofoofoo", { foo: "bar" }, true)).toBe("barbarbar");
    });
  });
});
