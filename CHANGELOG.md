# @auaust/primitive-kit

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

- bf58ae1: Exclude undefined from Entries<T> type

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

- 1022614: R.run() to only execute callable values

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
