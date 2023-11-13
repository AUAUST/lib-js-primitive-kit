###### AUAUST LIBRARIES — JavaScript — PrimitiveKit

> This repository is made public to open the codebase to contributors.
> When contributing to this repo, you agree to assign your copyrights to AUAUST.

# PrimitiveKit

<!-- The library provides a robust and intuitive set of classes for handling JavaScript primitives. Each class extends its respective JavaScript primitive type (Array, String, Boolean, Number, Object) and offers a suite of static methods to simplify and enhance the manipulation and processing of these types.
 -->

PrimitiveKit provides a robust and intuitive set of classes for handling JavaScript primitives. Each class extends its respective JavaScript primitive type (`A` extends `Array`, `B` extends `Boolean`, `N` extends `Number`…) and offers a suite of static methods to simplify and enhance the manipulation and processing of these types.

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
- **Intuitive** – Simplifies common operations, namespaced under classes that make sense.
- **Robust** – Mostly based on native methods, adding a layer of type safety and convenience.
- **No Dependencies** – No external dependencies. Just pure JavaScript. (Or TypeScript, if you prefer.)
- **Isomorphic** – No usage of special APIs. Only primitives.

## Installation

```sh
yarn add @auaust/primitive-kit
```

or if you prefer Bun:

```sh
bun add @auaust/primitive-kit
```

## Usage

Each class works as a namespace for a primitive type, named after the first letter of the primitive type.

`Array` → `A`
`Boolean` → `B`
`Number` → `N`
`Object` → `O`
`String` → `S`

### `B` (Boolean)

```ts
import { B } from "@auaust/primitive-kit";

// Easy conversion from any value to a boolean, and a little bit more input-aware than Boolean()
B.from("false"); // false
B.from("False"); // false
B.from("0"); // false

B.from("true"); // true
B.from("True"); // true
B.from("1"); // true

B.from(new Boolean(false)); // false
B.from({
  valueOf() {
    return false;
  },
}); // false

// Type-checking
B.is(false); // true
B.is(new Boolean(false)); // true
B.is(0); // false

// … or stricter type-checking
B.isStrict(false); // true
B.isStrict(true); // true
B.isStrict(new Boolean(false)); // false

// Loose comparison
B.equals(false, 0); // true
B.equals(false, "false"); // true
B.equals(false, true); // false

// Many logical operations
B.and(true, true); // true
B.or(true, false); // true

B.xor(true, true); // false
B.xor(true, false); // true
// … and not(), nand(), nor(), xnor()
```

### `N` (Number)

```ts
import { N } from "@auaust/primitive-kit";

// Easy conversion from any value to a number
N.from("1"); // 1
N.from("1.1"); // 1.1
N.from("foo123foo"); // 123
N.from(""); // 0
N.from(null); // 0

// Loose type-checking
N.is(1); // true
N.is(new Number(1)); // true
N.is("1"); // true
N.is(Infinity); // true
N.is(NaN); // false

// … or stricter type-checking -> only primitive and finite numbers
N.isStrict(1); // true
N.isStrict(new Number(1)); // false
N.isStrict("1"); // false
N.isStrict(Infinity); // false

// All native number methods are available
// N.isFinite(), N.isInteger(), N.isNaN(), N.isSafeInteger(), N.parseFloat(), N.parseInt(), N.toExponential(), N.toFixed(), N.toPrecision(), …

// And some custom helpers
N.isPositive(1); // true
N.isNegative(-1); // true
N.randInt(1, 10); // 5 (or 1, 2, 3, 4, 6, 7, 8, 9, 10)
N.randFloat(), N.clamp(), N.isOdd(), N.isEven(), N.isBetween(), N.min(), N.max(), …
```

> Many other methods and classes are available. Please refer to the source code for more information, or for more advanced usage.

## Browser Support

PrimitiveKit is compatible with all modern browsers. Since it doesn't use any advanced APIs, it should work on older browsers as well, but it hasn't been tested.
If it doesn't work on your browser but you think it should, please feel free to contribute!

## Sponsor

This library is a project by us, [AUAUST](https://auaust.ch/). We sponsor ourselves!
