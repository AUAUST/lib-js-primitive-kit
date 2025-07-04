# @auaust/primitive-kit

## 0.41.9

### Patch Changes

- 299f8cc: Fix slug to replace all chars

## 0.41.8

### Patch Changes

- 5f7374d: New string utils

## 0.41.7

### Patch Changes

- a767834: `F.constant()` and a few minor fixes

## 0.41.6

### Patch Changes

- 1a43fdd: Internal improvements and deduplicate code in built project.

## 0.41.5

### Patch Changes

- 49ebe04: F.isConstructible

## 0.41.4

### Patch Changes

- 4d34b81: F.isBound() and F.isBindable()

## 0.41.3

### Patch Changes

- 53f2b2b: Add `S.ensureStart` and `S.ensureEnd`

## 0.41.2

### Patch Changes

- 77822d8: Fix type entry points in package.json

## 0.41.1

### Patch Changes

- fd35114: `isNot(String|Number|Boolean|Function|Array)` type guards and internal improvements

## 0.41.0

### Minor Changes

- af7273b: Improved exposed API, cleaned up internal code

## 0.40.0

### Minor Changes

- 8f0d133: Massive cleanup of the codebase, some naming improvements and new aliases, type-level fixes and a few new features.

## 0.39.0

### Minor Changes

- 77e00df: A few string helpers around `nthIndexOf` and helpers it made possible. `A.pull()` and `O.pull()` to get values while removing them from the target object. Some internal cleanups.

## 0.38.1

### Patch Changes

- f4e83c5: `P.isPropertyKey()` + `A.keyBy` helpers

## 0.38.0

### Minor Changes

- 3190abd: `F.once()` memoizes the return value of a function until reset

## 0.37.0

### Minor Changes

- c5c3fea: Several new fonctions-related helpers such as `F.identity()`, `F.noop()` and `F()`/`toFunction` which will wrap non-function values in functions returning them.

## 0.36.1

### Patch Changes

- 727ed74: `N.minMax()` and many coding style improvements

## 0.36.0

### Minor Changes

- 8fd6665: Numerous new helpers and a few improvements

## 0.35.3

### Patch Changes

- 1ad7b23: Various minor improvements

## 0.35.2

### Patch Changes

- 95e5063: Iterable proxies and improved docs

## 0.35.1

### Patch Changes

- eb642f7: Various proxy improvements and more helpers

## 0.35.0

### Minor Changes

- 46e16b9: Method chaining thanks to proxy and `s()`, `n()`, ...

## 0.34.0

### Minor Changes

- 8d4115a: New array helpers, `difference`, `intersection`, `includes`

### Patch Changes

- 5fac2a4: Improved typing of classes call signature

## 0.33.0

### Minor Changes

- 1b14684: Switched build tool to tsup, should fix usage with CJS

## 0.32.2

### Patch Changes

- eff8a37: `N.randInt+randFloat` can be invoked parameters-less

## 0.32.1

### Patch Changes

- ec99597: `O.omit+pick` only don't have to be mutable

## 0.32.0

### Minor Changes

- ce6663e: `O.omit()`
- f1ff82e: `O.pick()`

## 0.31.0

### Minor Changes

- 905f7ed: `O.groupBy`

### Patch Changes

- 2f7a65a: Fix type level errors

## 0.30.0

### Minor Changes

- 8e036aa: Add `A.last` and `A.lastKey`, opposite of `first` and `firstKey`

## 0.29.1

### Patch Changes

- 7fecd28: Fix `O.in` to be more useful and easy to use

## 0.29.0

### Minor Changes

- 17a79cc: P.isObject + P.isPrimitive

## 0.28.5

### Patch Changes

- a8337d8: Minor improvements on `A`'s code and tests

## 0.28.4

### Patch Changes

- bbbda47: Re-add main, module, types fields in package.json for compatibility

## 0.28.3

### Patch Changes

- 788273a: Fix S.to\*Case() methods to respect `unaccent` option

## 0.28.2

### Patch Changes

- e52577d: Remove `types`, `main`, `module` from package.json as exports should handle the same logic

## 0.28.1

### Patch Changes

- 815e2f4: Exports keys' order apparently matters

## 0.28.0

### Minor Changes

- f22d97f: Test a new structure for entry points

## 0.27.0

### Minor Changes

- e33e892: Drop support for S class instanciation

## 0.26.1

### Patch Changes

- 07a5376: A class tested on the type level too

## 0.26.0

### Minor Changes

- 9a419a2: S.splitNth() supports negative indexes, splits from the end

### Patch Changes

- a56958e: S.split() helper
- 99931be: S.remove() helper

## 0.25.0

### Minor Changes

- a931769: A class and a lot of helpers

### Patch Changes

- f49e0af: 100% coverage + fix on split\* on instances of S

## 0.24.2

### Patch Changes

- 61f8e10: Trigger CI

## 0.24.1

### Patch Changes

- 2df63f0: Might fix CI

## 0.24.0

### Minor Changes

- a6054d3: Important internal refactoring + few features

### Patch Changes

- 548ab4e: S.endsWith, startsWith, contains, equals support unaccent option

## 0.23.0

### Minor Changes

- 0c29597: S.increment+decrement support negative values by calling one another
- 5cff523: S.split(First|Last|Nth) helpers

## 0.22.0

### Minor Changes

- 6b9b0ea: String casing get a short alias each

### Patch Changes

- 82da9bf: Add missed casing aliases

## 0.21.0

### Minor Changes

- 876ea8f: `P.isSet()` helper

### Patch Changes

- 88f6889: Better types for O class
- 808cea9: Building produces a single declaration file
- 8657164: Fix type issues + cleaner S class

## 0.20.1

### Patch Changes

- 480553c: Update the build and testing tools; ensure CI works

## 0.20.0

### Minor Changes

- ffde199: F.tryAsync()

## 0.19.2

### Patch Changes

- 3e7625b: Cleaner `P.is()` check

## 0.19.1

### Patch Changes

- c414630: Fix type inference of strings

## 0.19.0

### Minor Changes

- 514c499: S class made instantiable

### Patch Changes

- bf58ae1: Exclude undefined from `Entries<T>` type

## 0.18.3

### Patch Changes

- bb016d8: Fix typings using type-fest

## 0.18.2

### Patch Changes

- 41a0ce9: Require type-testing in production to provide types

## 0.18.1

### Patch Changes

- 6d7006a: Improve type for `O.entries`

## 0.18.0

### Minor Changes

- 1022614: F.run() to only execute callable values

### Patch Changes

- 10a5472: Improve handling of nullish in O.values, keys and entries
- 6f76036: Improved types for O.keys|values|entries

## 0.17.1

### Patch Changes

- 3ceb0fb: Update S.is to exclude objects and better typings for B.isLoose()

## 0.17.0

### Minor Changes

- 3d32e15: F.try() now returns a fallback instead of the error
- 24d23ae: Simplify and improve various type checks (is|isStrict|isLoose)

### Patch Changes

- c96aac5: Codebase improvements
- 4fffefb: N.hasDecimal, bitwise operations instead of % 2 for even/odd checks

## 0.16.0

### Minor Changes

- f56baf0: O.definePropertyIfUnset() + strong type for O.defineProperty()

## 0.15.0

### Minor Changes

- 23efc11: New N.subtract,sum,average and better O typings

## 0.14.0

### Minor Changes

- 8688438: Improved implementation and types of O.entries, values and keys

## 0.13.1

### Patch Changes

- 3e9c46a: `O.keys` handles null and undefined

## 0.13.0

### Minor Changes

- 1067b58: `F` + methods for Functions
- 926d558: No more default export and remove PrimitiveKit class
- d7529b9: `P.isNullish` returns true for NaN

## 0.12.0

### Minor Changes

- e2d29b5: `N.from()` trims spaces and underscores

## 0.11.2

### Patch Changes

- 06c5d11: Fix string containing numbers in `S.splitWords()`

## 0.11.1

### Patch Changes

- f077ad1: Fix entry points

## 0.11.0

### Minor Changes

- df38659: Improved `S.unaccent()` + added `S.mapReplace()`

## 0.10.2

### Patch Changes

- 863a0c5: Fix types issues

## 0.10.1

### Patch Changes

- f7ef520: Simplify TCapitalized

## 0.10.0

### Minor Changes

- 46bdcad: S.unaccent()

### Patch Changes

- f0311ea: Slug-like cases unaccented

## 0.9.4

### Patch Changes

- ada97f0: Fix some functions being typed as () => any

## 0.9.3

### Patch Changes

- d634c7c: Minify bundles

## 0.9.2

### Patch Changes

- 17ee732: Set `files` field in package.json

## 0.9.1

### Patch Changes

- 983c898: Fix license in package.json

## 0.9.0

### Minor Changes

- 9b3bdc3: O.in() for property checks

## 0.8.0

### Minor Changes

- 4bf5d69: N.round, N.ceil, N.floor

## 0.7.0

### Minor Changes

- 9fe7e62: S.random() for non-cryptographically secure random strings

## 0.6.1

### Patch Changes

- ee87191: Re-export P class from index

## 0.6.0

### Minor Changes

- 7d1c9ed: P class for generic primitive convertions and checks

## 0.5.0

### Minor Changes

- 6f6a9e2: Typings improvements and S.concat()

### Patch Changes

- c9d77d4: Fix TypeScript compiling issue

## 0.4.0

### Minor Changes

- 0847c74: New S helpers + 100% tests coverage

## 0.3.0

### Minor Changes

- b93dfa7: O.hasKeys()

## 0.2.0

### Minor Changes

- adaab3f: Made classes callable using proxies

## 0.1.9

### Patch Changes

- 1bbc4de: S.to\*Case() utilities to work with text cases.

## 0.1.8

### Patch Changes

- d14a188: O.deepGet() supports dot notation

## 0.1.7

### Patch Changes

- fd25e39: Add README

## 0.1.6

### Patch Changes

- 940c96c: Add O.clone()

## 0.1.5

### Patch Changes

- 85485fe: Great improvement of O.flat() + O.deepGet()'s typings

## 0.1.4

### Patch Changes

- 734790d: Add all essential methods for the N class

## 0.1.3

### Patch Changes

- 2b52457: Add all essential methods for the B class

## 0.1.2

### Patch Changes

- 25a2156: Add all essential methods for the O class

## 0.1.1

### Patch Changes

- fd9bcdf: Add essential docs
- 1ad48df: Add all essential methods for the S class

## 0.1.0

### Minor Changes

- dc450b1: Scaffold the helper classes and exports

## 0.0.1

### Patch Changes

- cc7356d: Test
