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

  test("normal typecheck works", () => {
    // Primitive strings and String objects should both pass the check.
    expect(S.is("string")).toBe(true);

    // String objects should fail the check.
    expect(S.is(new String("string"))).toBe(false);

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

  test("concat() works", () => {
    // @ts-expect-error
    expect(S.concat()).toBe("");
    expect(S.concat("foo")).toBe("foo");
    expect(S.concat("foo", "bar")).toBe("foobar");
    expect(S.concat("foo", "bar", "baz")).toBe("foobarbaz");

    expect(
      S.concat("foo", "bar", "baz", {
        separator: "",
      })
    ).toBe("foobarbaz");

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
  });

  test("toLowerCase() works", () => {
    expect(S.toLowerCase("FOO")).toBe("foo");
    expect(S.toLowerCase("foo")).toBe("foo");
    expect(S.toLowerCase("Foo")).toBe("foo");
    expect(S.toLowerCase(0)).toBe("0");

    expect(S.toLowerCase("I ate a crème brûlée")).toBe("i ate a crème brûlée");
  });

  test("toUpperCase() works", () => {
    expect(S.toUpperCase("FOO")).toBe("FOO");
    expect(S.toUpperCase("foo")).toBe("FOO");
    expect(S.toUpperCase("Foo")).toBe("FOO");

    expect(S.toUpperCase("I ate a crème brûlée")).toBe("I ATE A CRÈME BRÛLÉE");
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

    expect(S.toCamelCase("I ate a crème brûlée")).toBe("iAteACremeBrulee");
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

    expect(S.toUpperCamelCase("I ate a crème brûlée")).toBe("IAteACremeBrulee");
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

    expect(S.toSnakeCase("1.ab2cd3 4ef5gh6")).toBe("1_ab2cd3_4ef5gh6");

    expect(S.toSnakeCase("I ate a crème brûlée")).toBe("i_ate_a_creme_brulee");
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

    expect(S.toKebabCase("foo1.32.bar.baz489")).toBe("foo1-32-bar-baz489");

    expect(S.toKebabCase("I ate a crème brûlée")).toBe("i-ate-a-creme-brulee");
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

  test("between() works", () => {
    expect(S.between("foo", "f", "o")).toBe("o");
    expect(S.between("foo", "o", "f")).toBe("");
    expect(S.between("foo", "o", "o")).toBe("");

    expect(S.between("foo", "a", "b")).toBe("");

    expect(S.between("foo bar foo", "foo", "foo")).toBe(" bar ");
  });

  test("contains() works", () => {
    expect(S.contains("foo", "f")).toBe(true);
    expect(S.contains("foo", "o")).toBe(true);
    expect(S.contains("foo", "oo")).toBe(true);
    expect(S.contains("foo", "OO")).toBe(false);
    expect(
      S.contains("foo", "OO", {
        caseSensitive: false,
      })
    ).toBe(true);

    expect(S.contains("foo", "a")).toBe(false);

    expect(S.contains("foo bar foo", "foo")).toBe(true);

    expect(S.contains("foo", "ff")).toBe(false);
    expect(S.contains("foo", "fooo")).toBe(false);
  });

  test("startsWith() works", () => {
    expect(S.startsWith("foo", "f")).toBe(true);
    expect(S.startsWith("foo", "o")).toBe(false);
    expect(S.startsWith("foo", "fo")).toBe(true);
    expect(S.startsWith("foo", "FO")).toBe(false);
    expect(
      S.startsWith("foo", "FO", {
        caseSensitive: false,
      })
    ).toBe(true);

    expect(S.startsWith("foo", " FO")).toBe(false);
    expect(
      S.startsWith("  foo", "FO", {
        trim: true,
        caseSensitive: false,
      })
    ).toBe(true);

    expect(S.startsWith("foo", "a")).toBe(false);

    expect(S.startsWith("foo bar foo", "foo")).toBe(true);

    expect(S.startsWith("foo", "ff")).toBe(false);
    expect(S.startsWith("foo", "fooo")).toBe(false);
  });

  test("endsWith() works", () => {
    expect(S.endsWith("foo", "f")).toBe(false);
    expect(S.endsWith("foo", "o")).toBe(true);
    expect(S.endsWith("foo", "oo")).toBe(true);
    expect(S.endsWith("foo", "OO")).toBe(false);
    expect(
      S.endsWith("foo", "OO", {
        caseSensitive: false,
      })
    ).toBe(true);

    expect(S.endsWith("foo   ", "OO")).toBe(false);
    expect(
      S.endsWith("foo   ", "OO", {
        trim: true,
        caseSensitive: false,
      })
    ).toBe(true);

    expect(S.endsWith("foo", "a")).toBe(false);

    expect(S.endsWith("foo bar foo", "foo")).toBe(true);

    expect(S.endsWith("foo", "ff")).toBe(false);
    expect(S.endsWith("foo", "fooo")).toBe(false);
  });

  test("increment() works", () => {
    expect(S.increment("foo")).toBe("foo1");
    expect(S.increment("foo1")).toBe("foo2");
    expect(S.increment("foo9")).toBe("foo10");

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
  });

  test("decrement() works", () => {
    expect(() => S.decrement("foo")).toThrow();
    expect(S.decrement("foo", 0)).toBe("foo");
    expect(
      S.decrement("foobar", {
        ignoreNegative: true,
      })
    ).toBe("foobar");

    expect(S.decrement("foo1")).toBe("foo");
    expect(
      S.decrement("foo1", {
        keepZero: false,
      })
    ).toBe("foo");
    expect(
      S.decrement("foo1", {
        keepZero: true,
      })
    ).toBe("foo0");

    expect(S.decrement("foo2")).toBe("foo1");
    expect(S.decrement("foo-10", 5)).toBe("foo-5");

    expect(
      S.decrement("meep-0", {
        decrement: 2,
        ignoreNegative: true,
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

    expect(
      S.decrement("foo-0", {
        ignoreNegative: true,
        keepZero: true,
      })
    ).toBe("foo-0");

    expect(() =>
      S.decrement("foo2", {
        decrement: 3,
      })
    ).toThrow();

    expect(
      S.decrement("foo2", {
        decrement: 3,
        ignoreNegative: true,
      })
    ).toBe("foo");

    expect(
      S.decrement("map2", {
        decrement: 3,
        ignoreNegative: true,
        keepZero: true,
      })
    ).toBe("map0");

    expect(
      S.decrement("foo2", {
        separator: "",
      })
    ).toBe("foo1");
    expect(
      S.decrement("foo2", {
        separator: "-",
      })
    ).toBe("foo-1");

    expect(
      S.decrement("foo2", {
        separator: "-",
        pad: false,
      })
    ).toBe("foo-1");

    expect(
      S.decrement("foo2", {
        separator: "-",
        decrement: 3,
        keepZero: true,
        pad: 3,
        filler: "0",
        ignoreNegative: true,
      })
    ).toBe("foo-000");
  });

  test("random() works", () => {
    /**
     * Since the random string is random, we can only test it against regex and length.
     * 256-chars long random strings are generated to reduce the probability of missing a bug.
     */
    expect(S.random(0)).toBe("");
    expect(S.random()).toMatch(/^[a-zA-Z0-9]{16}$/);
    expect(S.random(512)).toMatch(/^[a-zA-Z0-9]{512}$/);

    expect(S.random(10, "a")).toBe("aaaaaaaaaa");
    expect(S.random(10, "é")).toBe("éééééééééé");
    expect(S.random(512, "_.a90")).toMatch(/^[-_\.a90]{512}$/);

    expect(
      S.random({
        case: "upper",
        length: 256,
      })
    ).toMatch(/^[A-Z0-9]{256}$/);
    expect(
      S.random({
        case: "lower",
        length: 256,
      })
    ).toMatch(/^[a-z0-9]{256}$/);
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
    expect(
      S.random({
        length: 512,
        chars: "**41+===",
      })
    ).toMatch(/^[\*41\+=]{512}$/);

    expect(() => S.random(-1)).toThrow(RangeError);
    expect(() => S.random(NaN)).toThrow(RangeError);
    expect(() => S.random(Infinity)).toThrow(RangeError);
    expect(() => S.random(-Infinity)).toThrow(RangeError);
    expect(() =>
      S.random({
        chars: "",
      })
    ).toThrow(RangeError);
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
