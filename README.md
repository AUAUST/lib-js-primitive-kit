###### AUAUST LIBRARIES — JavaScript — PrimitiveKit

> This repository is made public to open the codebase to contributors.
> When contributing to this repo, you agree to assign your copyrights to AUAUST.

# PrimitiveKit

A lightweight and modular utility library designed to simplify working with JavaScript primitive types through a complete and type-safe API.

## Overview

```ts
// Some methods are simply aliases for native methods.
S.toUpperCase("hello world"); // 'HELLO WORLD'

// Some methods are aliases for native methods with stronger typing.
O.keys({ a: 1, b: 2 }); // ['a', 'b'] instead of PropertyKey[]

// Some methods simplify common operations.
B.from("false"); // false
B.from("False"); // false
B.from("0"); // false

O.clone({ a: 1, b: 2 }); // { a: 1, b: 2 }, but not the same object (and is deeply cloned!)

// Some methods simplifies common operations, with type safety!
const obj = {
  foo: {
    bar: {
      baz: 1,
    },
    meep: [
      {
        deep: [2],
      },
    ],
  },
};

O.deepGet(obj, "foo", "baz", "baz"); // 1 typed as number
O.deepGet(obj, "foo", "not", "found"); // undefined typed as unknown, because it may exist but not be inferred correctly
O.deepGet(obj, "foo", "meep", 0, "deep", 0); // 2 typed as number

// … and more!
```

## Key Features

- **Type Safety** – Strongly typed. Always. No more `any`!
- **Intuitive** – Simplifies common operations, organized into static classes for each primitive type.
- **Chaining** – Includes proxy-based helpers which allow chaining of methods.
- **Robust** – Mostly based on native methods, adding a layer of type safety and convenience.
- **No Dependencies** – No external dependencies. Just pure TypeScript. Isomorphic as it uses only native APIs.

## Installation

```sh
pnpm add @auaust/primitive-kit
```

or if you prefer Yarn:

```sh
yarn add @auaust/primitive-kit
```

## Library Structure

The library is structured around static utility classes, each dedicated to a specific primitive type. These classes expose various methods to operate on the respective types. Additionally, proxy-based helpers allow to use these methods in a chained manner.

Each primitive type has a corresponding static utility class, named after the first letter of the type:

- `S` class for strings
- `N` class for numbers
- `B` class for booleans
- `A` class for arrays
- `O` class for objects
- `F` class for functions

and the convenient `P` class for general primitive operations.

## Proxies

The library provides many helper functions through the static classes (which you can read more about below). However, when multiple operations are needed, static methods can become cumbersome as functions need to be nested. To solve this, the library provides a convenient proxy-based approach to chaining methods.

The idea is simple: all static methods are available as properties on the proxy object, as well as the native methods of the primitive type. This allows for a fluent use of both native and custom methods.

See the example below, using the static classes:

```ts
const path = "/A/Path/To/A/File.txt";
const filename = S.beforeFirst(S.afterLast(path, "/")).toLowerCase(); // "file"
```

While this works, it is quite hard to read and get the order of execution at a glance. The proxy-based approach simplifies this:

```ts
const filename = s(path)
  .afterLast("/")
  .beforeFirst("/")
  .toLowerCase()
  .toString(); // "file"
```

### Proxy Type

The proxy object is associated with a "handler", which is one of the static classes. This provides two benefits: it automatically converts the input to the correct type, and provides all the methods of the static class. `s()` will create a proxy which handler is the `S` class, `n()` will create a proxy which handler is the `N` class, and so on.

```ts
n("100") // here, the value is automatically converted to the number 100
  .pow(2) // and we can straight away use the methods provided by the N class
  .div(2) // and chain them together
  .toNumber(); // until we want to retrieve the value
```

### Proxy Value

Because the proxy automatically converts the input to the correct type, most of the time you can simply extract the raw value. To do so, you may use either the special property `value` or call the `valueOf()` method.

```ts
s(124).concat(" cats").value; // "124 cats"
b("False").not().value; // true
n("1.1").round().valueOf(); // 1
```

Because proxies provide `valueOf`, `toString` and `[Symbol.toPrimitive]` methods, you can also most of the time don't convert the value manually. Whether that is through string literals, loose comparisons, or other operations, JavaScript's type coercion will automatically convert the proxy object to the correct type.

```ts
s("Hello") + " World"; // "Hello World"
n("1") + 1; // 2 (while this work at runtime, TypeScript will complain)
b("False") == false; // true
```

This also applies to iterating over arrays or strings, as `[Symbol.iterator]` forwards to the value's iterator.

```ts
for (const char of s("Hello")) {
  console.log(char); // "H", "e", "l", "l", "o"
}

for (const el of a([1, 2, 3])) {
  console.log(el); // 1, 2, 3
}
```

For the sake of clarity or to convert the value to a specific type, you may also use the `toString()`, `toNumber()`, `toBoolean()`, `toArray()` and `toObject()` methods. These methods return the value without wrapping it in a proxy object.

```ts
s("false").toBoolean(); // false
s("1").toNumber(); // 1
b("False").toString(); // "false"
```

Lastly, you may want to convert the proxy to a specific type while further chaining methods. For that sake, you may chain the `s()`, `n()`, `b()`, `a()` and `o()` methods which return a proxy of the desired type.

```ts
s("10") // "10"
  .n() // 10
  .pow(2) // 100
  .div(2) // 50
  .s() // "50"
  .concat("%") // "50%"
  .wrap("(", ")"); // "(50%)"
```

### Prototype Methods

The proxies also support the usual prototype methods of the primitive types. This means you can use `push()` on a proxied array, `substring()` on a proxied string, and so on. They are wrapped in a function that passes the arguments but wrap the return value in a proxy object based on the return type. For example, since `s("hello").indexOf("h")` returns a number, the result will be equivalent to `n(0)` — a proxy which handler is the `N` class.

```ts
s("hello")
  .indexOf("h") // proxied `0`
  .isInteger() // proxied `true`
  .valueOf(); // true
```

## Static Classes

To get a complete list of the available methods, please refer to the source code; tests are also a good place to look for examples and intended usage. Please note that all the static methods can also be imported individually from the following exports:

- `@auaust/primitive-kit/strings` for the `S` class
- `@auaust/primitive-kit/numbers` for the `N` class
- `@auaust/primitive-kit/booleans` for the `B` class
- `@auaust/primitive-kit/arrays` for the `A` class
- `@auaust/primitive-kit/objects` for the `O` class
- `@auaust/primitive-kit/functions` for the `F` class
- `@auaust/primitive-kit/primitives` for the `P` class

For example, the following two achieves the same result:

```ts
import { S } from "@auaust/primitive-kit";

const kebab = S.toKebabCase("Hello World"); // "hello-world"

import { toKebabCase } from "@auaust/primitive-kit/strings";

const kebab = toKebabCase("Hello World"); // "hello-world"
```

Please note that some names may vary slightly, for example `S.is` and `S.from` are respectively available as `isString` and `toString` from `@auaust/primitive-kit/strings`. The aliases provided by the static classes may also not exist in the individual exports. For example, while both `S.snake` and `S.toSnakeCase` are available, only `toSnakeCase` is exported from `@auaust/primitive-kit/strings`.

If the set of methods you use is limited, you may want to import methods individually to allow tree-shaking. However, PrimitiveKit being tiny — about [6kB minified and gzipped](https://bundlephobia.com/package/@auaust/primitive-kit@0.33.0) — the convenience of using the static classes may be worth the extra size.

### `S` for Strings

```ts
import { S, s } from "@auaust/primitive-kit";

S.kebab("Hello World"); // "hello-world"

s("a very nice sentence")
  .toTitleCase() // "A Very Nice Sentence"
  .afterFirst(" ") // "Very Nice Sentence"
  .splitFirst(" ") // ["Very", "Nice Sentence"]
  .map(S.upper) // ["VERY", "NICE SENTENCE"]
  .join(" "); // "VERY NICE SENTENCE"
```

Most methods are self-explanatory.

⚠️ **This list might be outdated. Look at the source code if you can't find a method that suits your needs. Feel free to open an issue if one is missing!** ⚠️

`afterFirst`, `afterLast`, `afterStart`, `beforeEnd`, `beforeFirst`, `beforeLast`, `between`, `capitalize`, `concat`, `contains`, `decrement`, `endsWith`, `increment`, `isStrictString`, `isString`, `mapReplace`, `or`, `padEnd`, `padStart`, `prepend`, `randomString`, `remove`, `repeat`, `split`, `splitFirst`, `splitLast`, `splitNth`, `splitWords`, `startsWith`, `stringEquals`, `toCamelCase`, `toCustomCase`, `toKebabCase`, `toLocaleLowerCase`, `toLocaleUpperCase`, `toLowerCase`, `toPascalCase`, `toSnakeCase`, `toString`, `toTitleCase`, `toUpperCase`, `trim`, `trimEnd`, `trimStart`, `truncateEnd`, `truncateStart`, `unaccent`, `wrap`

### `B` for Booleans

```ts
import { B, b } from "@auaust/primitive-kit";

// Smart conversion to boolean, respecting the value of a Boolean object or a string representing `false`.
B.from("false"), B.from("False"), B.from("0"); // false for all
B.from("true"), B.from("True"), B.from("1"); // true for all
B.from(new Boolean(false)); // false
B.from({
  valueOf() {
    return false;
  },
}); // false

// Type-checking, concise equivalent to `typeof value === "boolean"`
B.is(false); // true
B.is(0); // false

b("False") // false
  .not() // true
  .and(true) // true
  .or(false) // true
  .xor(true) // false
  .toNumber(); // 0
```

⚠️ **This list might be outdated. Look at the source code if you can't find a method that suits your needs. Feel free to open an issue if one is missing!** ⚠️

`allFalse`, `allTrue`, `and`, `anyFalse`, `anyTrue`, `booleanEquals`, `isBoolean`, `isLooseBoolean`, `nand`, `nor`, `not`, `or`, `toBoolean`, `toNumber`, `toString`, `xnor`, `xor`

### `N` (Number)

```ts
import { N } from "@auaust/primitive-kit";

// Easy conversion from any value to a number
N.from("1"); // 1
N.from("1.1"); // 1.1
N.from("foo123foo"); // 123
N.from(""); // 0
N.from(null); // 0

// Type-checking, concise equivalent to `typeof num === "number" && !isNaN(num)`
N.is(1), N.is(Infinity); // true
N.is("1"), N.is(NaN); // false

// … or stricter type-checking, equivalent to `typeof num === "number" && isFinite(num)`
N.isStrict(-1), N.isStrict(0.1); // true
N.isStrict("1"), N.isStrict(Infinity), N.isStrict(NaN); // false

n(1) // 1
  .add(3) // 4
  .pow(2) // 16
  .mod(4) // 0
  .div(0) // Infinity
  .isFinite() // false
  .n() // 0
  .randFloat(5); // random float between 0 and 5
```

⚠️ **This list might be outdated. Look at the source code if you can't find a method that suits your needs. Feel free to open an issue if one is missing!** ⚠️

`abs`, `average`, `ceil`, `clamp`, `divide`, `floor`, `formatNumber`, `hasDecimal`, `isBetween`, `isEven`, `isInteger`, `isLooseNumber`, `isMultipleOf`, `isNegative`, `isNumber`, `isOdd`, `isPositive`, `isStrictNumber`, `max`, `min`, `multiply`, `numberToString`, `power`, `randFloat`, `randInt`, `remainder`, `round`, `subtract`, `sum`, `toExponential`, `toFixed`, `toLocaleString`, `toNumber`, `toPrecision`

### `A` (Array)

⚠️ **This list might be outdated. Look at the source code if you can't find a method that suits your needs. Feel free to open an issue if one is missing!** ⚠️

`arrayEquals`, `collapse`, `deduplicate`, `difference`, `first`, `firstKey`, `flat`, `hasDuplicates`, `includes`, `intersection`, `isArray`, `isIterable`, `isStrictArray`, `last`, `lastKey`, `random`, `randoms`, `realLength`, `reverse`, `shuffle`, `sort`, `toArray`, `toCollapsed`, `toCopiedArray`, `toDeduplicated`, `toReversed`, `toShuffled`, `toSorted`, `wrap`

### `O` (Object)

⚠️ **This list might be outdated. Look at the source code if you can't find a method that suits your needs. Feel free to open an issue if one is missing!** ⚠️

`clone`, `deepGet`, `defineProperty`, `definePropertyIfUnset`, `entries`, `equals`, `flat`, `groupBy`, `hasKey`, `hasKeys`, `isObject`, `isStrictObject`, `keys`, `omit`, `pick`, `toObject`, `values`

## Environment Support

PrimitiveKit is compatible with all modern browsers. Since it doesn't use any advanced APIs, it is likely to work on older browsers as well, but it hasn't been tested. If it doesn't work on your browser but you think it should, please feel free to contribute!

It also works in Node.js environments, is fully implemented in TypeScript.

## Sponsor

This library is a project by us, [AUAUST](https://auaust.ch/). We sponsor ourselves!
