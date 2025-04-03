import { isArray } from "~/arrays/methods";
import { keys } from "./keys";

export function equals<T>(obj1: T, obj2: unknown): obj2 is T;
export function equals<T>(obj1: unknown, obj2: T): obj1 is T;
export function equals(obj1: unknown, obj2: unknown): boolean {
  // Will return true for equal primitives, NaN and objects that are the same instance.
  if (Object.is(obj1, obj2)) {
    return true;
  }

  // If the values aren't objects and failed the Object.is() check, they aren't equal.
  if (typeof obj1 !== "object" || typeof obj2 !== "object") {
    return false;
  }

  // Ensures the typeof === "object" didn't false-positive for null.
  // If both were null, they would have been equal using Object.is() already so it's safe.
  if (obj1 === null || obj2 === null) {
    return false;
  }

  // Two objects that aren't sharing the same prototype aren't equal.
  if (obj1.constructor !== obj2.constructor) {
    return false;
  }

  if (isArray(obj1) && isArray(obj2)) {
    if (obj1.length !== obj2.length) {
      return false;
    }

    for (let i = 0; i < obj1.length; i++) {
      if (!equals(obj1[i], obj2[i])) {
        return false;
      }
    }

    return true;
  }

  // Checks equality for class instances.
  if (obj1.constructor !== Object) {
    // The two objects are of the same class, not Object nor Array, and aren't strictly equal.
    // The safest way to compare them is to use their toString() methods.
    const string1 = obj1.toString();
    const string2 = obj2.toString();

    // If the toString() methods returns a string matching [object ClassName], we return false.
    // This is because it means the class doesn't implement its own toString() method, thus doesn't share any information about its properties nor held values.
    if (string1 === string2) {
      return !/\[object \w+\]/.test(string1);
    }

    return false;
  }

  const keys1 = keys(obj1);
  const keys2 = keys(obj2);

  if (keys1.length !== keys2.length) {
    return false;
  }

  for (const key of keys1) {
    // `as never` required because the above checks reduce the type of objects to `{}`, which keys are typed as `never`.
    if (!equals(obj1[key as never], obj2[key as never])) {
      return false;
    }
  }

  return true;
}
