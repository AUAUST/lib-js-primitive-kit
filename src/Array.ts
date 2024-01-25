/**
 * The A class, for Array, provides useful methods for working with arrays.
 */
class RawA extends Array {
  constructor() {
    super();
  }

  /**
   * A.from() should be able to convert Set and Map to Array.
   * Also anything Array.from() can do.
   */

  /**
   * A.is() is the Primitive Kit alias for Array.isArray().
   */
  /**
   * A.isStrict() is the Primitive Kit alias for Array.isArray(), but it returns false for empty arrays.
   */

  /**
   * A.isIterable() should return true if the argument is iterable.
   */

  /**
   * A.collapse() should remove empty keys from an array, i.e. A.collapse([,,,1,,,2,3]) should return [1,2,3].
   * A cloned approach is to using Array.prototype.flat(0) which does exactly this (with 0 it actually doesn't flatten anything, but it removes empty keys).
   * Don't know of a way that'd do it out of the box in place.
   */

  /**
   * A.realLength() should return the length of an array without counting empty keys.
   * A.realLength([,,,1,,,2,3]) should return 3.
   */

  /**
   * A.clone() should clone an array recursively.
   */

  /**
   * A.equals() should compare two arrays recursively.
   */

  /**
   * A.deduplicate() should remove duplicate values from an array.
   * Modify the array in place and return it.
   */
  /**
   * A.toDeduplicated() should return a deduplicated version of an array.
   * Don't modify the original array and return a new one.
   */

  /**
   * A.hasDuplicates() should return true if an array has duplicate values.
   */
  /**
   * A.sort() should sort an array.
   */

  /**
   * A.toSorted() should return a sorted version of an array.
   */
  /**
   * A.shuffle() should shuffle an array.
   * https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
   * https://bost.ocks.org/mike/shuffle/
   */

  /**
   * A.toShuffled() should return a shuffled version of an array.
   */

  /**
   * A.random() should return a random value from an array.
   * Should be able to return multiple random values by passing a number as the second argument.
   */
}

const A = new Proxy(RawA, {
  apply(target, thisArg, argArray) {
    // TODO: Implement.
    throw new Error("Not implemented.");
  },
});

export { A };
