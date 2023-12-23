/**
 * The A class, for Array, provides useful methods for working with arrays.
 */
class RawA extends Array {
  constructor() {
    super();
  }

  /**
   * A.from() should be able to convert Set and Map to Array.
   *
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
}

const A = new Proxy(RawA, {
  apply(target, thisArg, argArray) {
    // TODO: Implement.
    throw new Error("Not implemented.");
  },
});

export { A };
