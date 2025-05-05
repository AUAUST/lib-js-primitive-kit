import { S, type Stringifiable, type ToString } from "~/strings";
import { casingOptions, comparisonOptions } from "~/strings/helpers";

import { type Equal, type Expect } from "type-testing";
import { describe, expect, test } from "vitest";

describe("String helpers", () => {
  type Tests = [
    Expect<Equal<ToString<null>, "">>,
    Expect<Equal<ToString<Stringifiable>, string>>,
    Expect<Equal<ToString<"foo">, "foo">>,
    Expect<Equal<ToString<0>, "0">>,
    Expect<
      Equal<
        ToString<{
          toString(): "foo";
        }>,
        "foo"
      >
    >
  ];

  test("comparisonOptions works", () => {
    expect(comparisonOptions()).toEqual({
      caseSensitive: false,
      trim: false,
      unaccent: false,
    });
    expect(comparisonOptions(true)).toEqual({
      caseSensitive: true,
      trim: false,
      unaccent: false,
    });
    expect(comparisonOptions(false)).toEqual({
      caseSensitive: false,
      trim: false,
      unaccent: false,
    });
    expect(comparisonOptions({ trim: true })).toEqual({
      caseSensitive: false,
      trim: true,
      unaccent: false,
    });
    expect(comparisonOptions(undefined, { trim: true })).toEqual({
      caseSensitive: false,
      trim: true,
      unaccent: false,
    });
    expect(
      comparisonOptions({ trim: false, unaccent: true }, { trim: true })
    ).toEqual({
      caseSensitive: false,
      trim: false,
      unaccent: true,
    });
  });

  test("casingOptions works", () => {
    expect(casingOptions()).toEqual({ ignoreCaps: false, unaccent: true });
    expect(casingOptions(true)).toEqual({ ignoreCaps: true, unaccent: true });
    expect(casingOptions(false)).toEqual({ ignoreCaps: false, unaccent: true });
    expect(casingOptions({ unaccent: false })).toEqual({
      ignoreCaps: false,
      unaccent: false,
    });
    expect(casingOptions(undefined, { unaccent: false })).toEqual({
      ignoreCaps: false,
      unaccent: false,
    });
    expect(casingOptions({ unaccent: true }, { unaccent: false })).toEqual({
      ignoreCaps: false,
      unaccent: true,
    });
  });
});

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

  test("concat() works", () => {
    expect(S.concat()).toBe("");
    expect(S.concat("foo")).toBe("foo");
    expect(S.concat("foo", "bar")).toBe("foobar");
    expect(S.concat("foo", "bar", "baz")).toBe("foobarbaz");
    expect(S.concat("foo", "bar", "baz", { separator: "" })).toBe("foobarbaz");
    expect(
      S.concat("foo", "bar", "baz", {
        separator: " ",
      })
    ).toBe("foo bar baz");
    expect(
      S.concat("foo", "bar", "baz", {
        separator: {
          toString() {
            return "_";
          },
        },
      })
    ).toBe("foo_bar_baz");
    expect(
      S.concat(
        "foo", // stays the same
        0, // becomes "0"
        BigInt(90), // becomes "90"
        false, // becomes "false"
        undefined, // becomes ""
        {
          toString() {
            return "bar";
          },
        }, // becomes "bar"
        {
          [Symbol.toPrimitive]() {
            return true;
          },
        }, // becomes "true"
        {
          separator: {
            [Symbol.toPrimitive]() {
              return 0;
            },
          }, // becomes "0"
        }
      )
      /**
       * Should become "foo" + "0" + "90" + "false" + "" + "bar" + "true",
       * filtered by truthiness (excluding undefined's "" conversion),
       * and joined by the stringified separator "0".
       */
    ).toBe("foo000900false0bar0true");

    // ensure the alias exists
    expect(S.concat).toBe(S.append);
  });

  test("prepend() works", () => {
    expect(S.prepend("foo", "bar")).toBe("barfoo");
    expect(S.prepend("foo", "bar", "baz")).toBe("barbazfoo");
    expect(
      S.prepend("foo", "bar", "baz", {
        separator: " ",
      })
    ).toBe("bar baz foo");
    expect(
      S.prepend("foo", "bar", "baz", {
        separator: {
          toString() {
            return "_";
          },
        },
      })
    ).toBe("bar_baz_foo");
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

  test("capitalize() works", () => {
    expect(S.capitalize("foo")).toBe("Foo");
    expect(S.capitalize("FooBar")).toBe("FooBar");
    expect(S.capitalize("0")).toBe("0");
    expect(S.capitalize("hello")).toBe("Hello");
  });

  test("capitalizeWords() works", () => {
    expect(S.capitalizeWords("hello world")).toBe("Hello World");
    expect(S.capitalizeWords("this is a test")).toBe("This Is A Test");
    expect(S.capitalizeWords("A B C")).toBe("A B C");
  });

  test("decapitalize() works", () => {
    expect(S.decapitalize("Foo")).toBe("foo");
    expect(S.decapitalize("fooBar")).toBe("fooBar");
    expect(S.decapitalize("HELLO")).toBe("hELLO");
  });

  test("decapitalizeWords() works", () => {
    expect(S.decapitalizeWords("Hello World")).toBe("hello world");
    expect(S.decapitalizeWords("This Is A Test")).toBe("this is a test");
    expect(S.decapitalizeWords("A B-C")).toBe("a b-C");
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
    expect(S.toTitleCase("I ate a crème brûlée")).toBe("I Ate A Crème Brûlée");

    expect(S.toTitleCase).toBe(S.title);
  });

  test("toLowerCase() works", () => {
    expect(S.toLowerCase("FOO")).toBe("foo");
    expect(S.toLowerCase("foo")).toBe("foo");
    expect(S.toLowerCase("Foo")).toBe("foo");
    expect(S.toLowerCase(0)).toBe("0");
    expect(S.toLowerCase("I ate a crème brûlée")).toBe("i ate a crème brûlée");

    expect(S.toLowerCase).toBe(S.lower);
  });

  test("toUpperCase() works", () => {
    expect(S.toUpperCase("FOO")).toBe("FOO");
    expect(S.toUpperCase("foo")).toBe("FOO");
    expect(S.toUpperCase("Foo")).toBe("FOO");
    expect(S.toUpperCase("I ate a crème brûlée")).toBe("I ATE A CRÈME BRÛLÉE");

    expect(S.toUpperCase).toBe(S.upper);
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
    expect(S.toCamelCase).toBe(S.camel);

    expect(S.camel("Foo")).toBe("foo");
    expect(S.camel("foo bar")).toBe("fooBar");
    expect(S.camel("foo-bar")).toBe("fooBar");
    expect(S.camel("Foo_Bar")).toBe("fooBar");
    expect(S.camel("foo.bar")).toBe("fooBar");
    expect(S.camel("foo bar baz")).toBe("fooBarBaz");
    expect(S.camel("Foo_Bar_Baz")).toBe("fooBarBaz");
    expect(S.camel("foo.bar.baz")).toBe("fooBarBaz");
    expect(S.camel("foo1.32.bar.baz489")).toBe("foo132BarBaz489");

    // Options: ignoreCaps
    expect(S.camel("FOO-BAR-BAZ")).toBe("fOOBARBAZ");
    expect(S.camel("FOO-BAR-BAZ", true)).toBe("fooBarBaz");
    expect(S.camel("FOO-BAR-BAZ", { ignoreCaps: true })).toBe("fooBarBaz");

    // Options: unaccent
    expect(S.camel("I ate a crème brûlée")).toBe("iAteACremeBrulee");
    expect(S.camel("I ate a crème brûlée", { unaccent: true })).toBe(
      "iAteACremeBrulee"
    );
    expect(S.camel("I ate a crème brûlée", { unaccent: false })).toBe(
      "iAteACrèmeBrûlée"
    );
  });

  test("toPascalCase() works", () => {
    expect(S.toPascalCase).toBe(S.pascal);

    expect(S.pascal("Foo")).toBe("Foo");
    expect(S.pascal("foo bar")).toBe("FooBar");
    expect(S.pascal("foo-bar")).toBe("FooBar");
    expect(S.pascal("Foo_Bar")).toBe("FooBar");
    expect(S.pascal("foo.bar")).toBe("FooBar");
    expect(S.pascal("foo bar baz")).toBe("FooBarBaz");
    expect(S.pascal("Foo_Bar_Baz")).toBe("FooBarBaz");
    expect(S.pascal("foo.bar.baz")).toBe("FooBarBaz");
    expect(S.pascal("foo1.32.bar.baz489")).toBe("Foo132BarBaz489");

    // Options: ignoreCaps
    expect(S.pascal("FOO-BAR-BAZ")).toBe("FOOBARBAZ");
    expect(S.pascal("FOO-BAR-BAZ", true)).toBe("FooBarBaz");
    expect(S.pascal("FOO-BAR-BAZ", { ignoreCaps: true })).toBe("FooBarBaz");

    // Options: unaccent
    expect(S.pascal("I ate a crème brûlée")).toBe("IAteACremeBrulee");
    expect(S.pascal("I ate a crème brûlée", { unaccent: true })).toBe(
      "IAteACremeBrulee"
    );
    expect(S.pascal("I ate a crème brûlée", { unaccent: false })).toBe(
      "IAteACrèmeBrûlée"
    );
  });

  test("toSnakeCase() works", () => {
    expect(S.toSnakeCase).toBe(S.snake);

    expect(S.snake("Foo")).toBe("foo");
    expect(S.snake("foo bar")).toBe("foo_bar");
    expect(S.snake("foo-bar")).toBe("foo_bar");
    expect(S.snake("Foo_Bar")).toBe("foo_bar");
    expect(S.snake("foo.bar")).toBe("foo_bar");
    expect(S.snake("foo bar baz")).toBe("foo_bar_baz");
    expect(S.snake("Foo_Bar_Baz")).toBe("foo_bar_baz");
    expect(S.snake("foo.bar.baz")).toBe("foo_bar_baz");
    expect(S.snake("foo1.32.bar.baz489")).toBe("foo1_32_bar_baz489");

    // Options: ignoreCaps
    expect(S.snake("FOO-BAR-BAZ")).toBe("f_o_o_b_a_r_b_a_z");
    expect(S.snake("FOO-BAR-BAZ", true)).toBe("foo_bar_baz");
    expect(S.snake("FOO-BAR-BAZ", { ignoreCaps: true })).toBe("foo_bar_baz");

    // Options: unaccent
    expect(S.snake("I ate a crème brûlée")).toBe("i_ate_a_creme_brulee");
    expect(S.snake("I ate a crème brûlée", { unaccent: true })).toBe(
      "i_ate_a_creme_brulee"
    );
    expect(S.snake("I ate a crème brûlée", { unaccent: false })).toBe(
      "i_ate_a_crème_brûlée"
    );
  });

  test("toKebabCase() works", () => {
    expect(S.toKebabCase).toBe(S.kebab);

    expect(S.kebab("Foo")).toBe("foo");
    expect(S.kebab("foo bar")).toBe("foo-bar");
    expect(S.kebab("foo-bar")).toBe("foo-bar");
    expect(S.kebab("Foo_Bar")).toBe("foo-bar");
    expect(S.kebab("foo.bar")).toBe("foo-bar");
    expect(S.kebab("foo bar baz")).toBe("foo-bar-baz");
    expect(S.kebab("Foo_Bar_Baz")).toBe("foo-bar-baz");
    expect(S.kebab("foo.bar.baz")).toBe("foo-bar-baz");
    expect(S.kebab("foo1.32.bar.baz489")).toBe("foo1-32-bar-baz489");

    // Options: ignoreCaps
    expect(S.kebab("FOO-BAR-BAZ")).toBe("f-o-o-b-a-r-b-a-z");
    expect(S.kebab("FOO-BAR-BAZ", true)).toBe("foo-bar-baz");
    expect(S.kebab("FOO-BAR-BAZ", { ignoreCaps: true })).toBe("foo-bar-baz");

    // Options: unaccent
    expect(S.kebab("I ate a crèmeBrûlée")).toBe("i-ate-a-creme-brulee");
    expect(S.kebab("I ate a crèmeBrûlée", { unaccent: true })).toBe(
      "i-ate-a-creme-brulee"
    );
    expect(S.kebab("I ate a crèmeBrûlée", { unaccent: false })).toBe(
      "i-ate-a-crème-brûlée"
    );
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

  test("unaccent() works", () => {
    expect(S.unaccent("éàç")).toBe("eac");
    expect(S.unaccent("ÉÀÇ")).toBe("EAC");
    expect(S.unaccent("ﬁèﬂ")).toBe("fiefl");

    expect(S.unaccent("ab$£0123*!")).toBe("ab$£0123*!"); // no change
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

  test("repeat() works", () => {
    expect(S.repeat("foo", 0)).toBe("");
    expect(S.repeat("foo", 1)).toBe("foo");
    expect(S.repeat("foo", 2)).toBe("foofoo");
    expect(S.repeat("foo", 3)).toBe("foofoofoo");
  });

  test("split() works", () => {
    expect(S.split("a.b.c.d.e", ".")).toEqual(["a", "b", "c", "d", "e"]);

    // Substrings that are not found are returned as the whole string
    expect(S.split("a.b.c.d.e", "-")).toEqual(["a.b.c.d.e"]);

    // Unlike String.prototype.split, no separator means splitting by each character instead of not splitting at all
    expect(S.split("a.b.c.d.e")).toEqual([
      "a",
      ".",
      "b",
      ".",
      "c",
      ".",
      "d",
      ".",
      "e",
    ]);

    // Limits lower than 1 are invalid, thus ignored
    expect(S.split("a.b.c.d.e", ".", 0)).toEqual(["a", "b", "c", "d", "e"]);
    expect(S.split("a.b.c.d.e", ".", -1)).toEqual(["a", "b", "c", "d", "e"]);

    // If the limit is 1, the whole string is returned
    expect(S.split("a.b.c.d.e", ".", 1)).toEqual(["a.b.c.d.e"]);

    // Limits of 2 and higher will split the string,
    // and as soon as the number of parts is reached the rest is returned as the last element
    expect(S.split("a.b.c.d.e", ".", 2)).toEqual(["a", "b.c.d.e"]);

    // If the limit is lower than the actual number of parts, it has no effect
    expect(S.split("a.b.c.d.e", ".", 5)).toEqual(["a", "b", "c", "d", "e"]);
    expect(S.split("a.b.c.d.e", ".", 6)).toEqual(["a", "b", "c", "d", "e"]);
  });

  test("splitFirst() works", () => {
    expect(S.splitFirst("foo", "f")).toEqual(["", "oo"]);
    expect(S.splitFirst("foo:bar:baz", ":")).toEqual(["foo", "bar:baz"]);
    expect(S.splitFirst("foo:--:baz:--:", ":--:")).toEqual(["foo", "baz:--:"]);
    expect(S.splitFirst("foo", "a")).toEqual(["foo", ""]);

    // Examples from the documentation so they better not fail
    expect(S.splitFirst("a.b.c.d.e", ".")).toEqual(["a", "b.c.d.e"]);
    expect(S.splitFirst("a.b.c.d.e", "-")).toEqual(["a.b.c.d.e", ""]);
  });

  test("splitLast() works", () => {
    expect(S.splitLast("foo", "f")).toEqual(["", "oo"]);
    expect(S.splitLast("foo:bar:baz", ":")).toEqual(["foo:bar", "baz"]);
    expect(S.splitLast(":--:foo:--:baz", ":--:")).toEqual([":--:foo", "baz"]);
    expect(S.splitLast("foo", "a")).toEqual(["foo", ""]);

    // Examples from the documentation so they better not fail
    expect(S.splitLast("a.b.c.d.e", ".")).toEqual(["a.b.c.d", "e"]);
    expect(S.splitLast("a.b.c.d.e", "-")).toEqual(["a.b.c.d.e", ""]);
  });

  test("splitNth() works", () => {
    // 0-based index
    expect(S.splitNth("foo:bar:baz", ":", 0)).toEqual(["foo", "bar:baz"]);
    expect(S.splitNth("foo:bar:baz", ":", 1)).toEqual(["foo:bar", "baz"]);
    // Negative index looks from the end
    expect(S.splitNth("foo:bar:baz", ":", -1)).toEqual(["foo:bar", "baz"]);
    expect(S.splitNth("foo:bar:baz", ":", -2)).toEqual(["foo", "bar:baz"]);
    // If the separator is not found, the whole string is returned
    expect(S.splitNth("foo", "a", 0)).toEqual(["foo", ""]);
    expect(S.splitNth("foo", "a", -1)).toEqual(["foo", ""]);
    // If the index is out of bounds, the whole string is returned
    expect(S.splitNth("foo:bar:baz", ":", 2)).toEqual(["foo:bar:baz", ""]);
    expect(S.splitNth("foo:bar:baz", ":", 3)).toEqual(["foo:bar:baz", ""]);
    expect(S.splitNth("foo:bar:baz", ":", -3)).toEqual(["foo:bar:baz", ""]);
    // Supports multi-character separators
    expect(S.splitNth("foo:--:baz:--:bar", ":--:", 1)).toEqual([
      "foo:--:baz",
      "bar",
    ]);
    expect(S.splitNth("foo:--:baz:--:bar", ":--:", -1)).toEqual([
      "foo:--:baz",
      "bar",
    ]);
  });

  test("remove() works", () => {
    expect(S.remove("foo", "f")).toBe("oo");
    expect(S.remove("foo", "o")).toBe("f");
    expect(S.remove("foo", "oo")).toBe("f");
    expect(S.remove("foo", "a")).toBe("foo");
    expect(S.remove("foo bar foo", "foo")).toBe(" bar ");

    expect(S.remove("abc123def456", /\d+/)).toBe("abcdef456");
    expect(S.remove("abc123def456", /\d+/g)).toBe("abcdef");
  });

  test("wrap() works", () => {
    expect(S.wrap("foo", "bar")).toBe("barfoobar");
    expect(S.wrap("hello", "« ", " »")).toBe("« hello »");
    expect(S.wrap(0, { toString: () => "{" }, { toString: () => "}" })).toBe(
      "{0}"
    );
  });

  test("or() works", () => {
    expect(S.or("foo", "bar")).toBe("foo");
    expect(S.or("", "bar")).toBe("bar");
    expect(S.or(null, "bar")).toBe("bar");
    expect(S.or(undefined, { toString: () => "" }, "bar")).toBe("bar");
    expect(S.or()).toBe("");
  });

  test("nthIndexOf() works", () => {
    // 0-based index
    expect(S.nthIndexOf("1.2.0", ".", 0)).toBe(1);
    expect(S.nthIndexOf("1.2.0", ".", 1)).toBe(3);

    // Negative index looks from the end
    expect(S.nthIndexOf("1.2.0", ".", -1)).toBe(3);
    expect(S.nthIndexOf("9.8.7.6.5.4.3.2.1", ".", -3)).toBe(11);

    // If the separator is not found, -1 is returned
    expect(S.nthIndexOf("foo", "a", 0)).toBe(-1);
    expect(S.nthIndexOf("foo", "a", -1)).toBe(-1);

    // If the index is out of bounds, -1 is returned
    expect(S.nthIndexOf("1.2.0", ".", 2)).toBe(-1);
    expect(S.nthIndexOf("1.2.0", ".", -3)).toBe(-1);
  });
});
