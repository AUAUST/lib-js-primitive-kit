import type { Booleanifiable } from "~/booleans/types";
import { isString } from "~/strings/methods";

export function toBoolean(bool: any): boolean {
  bool = bool?.valueOf();

  if (isString(bool)) {
    bool = bool.trim();

    if (bool === "" || bool === "0" || bool.toLowerCase() === "false") {
      return false;
    }
  }

  return !!bool;
}

export function isBoolean(x: any): x is boolean {
  return typeof x === "boolean";
}

export function isLooseBoolean(x: any): x is Booleanifiable {
  x = x?.valueOf();

  switch (typeof x) {
    case "boolean":
      return true;
    case "string":
      x = x.trim().toLowerCase();
      return x === "true" || x === "false";
    case "number":
      return x === 0 || x === 1;
  }

  return false;
}

export function equals(a: any, b: any): boolean {
  return toBoolean(a) === toBoolean(b);
}

export function and(a: any, b: any): boolean {
  return toBoolean(a) && toBoolean(b);
}

export function or(a: any, b: any): boolean {
  return toBoolean(a) || toBoolean(b);
}

export function not(a: any): boolean {
  return !toBoolean(a);
}

export function xor(a: any, b: any): boolean {
  return toBoolean(a) !== toBoolean(b);
}

export function nand(a: any, b: any): boolean {
  return !and(a, b);
}

export function nor(a: any, b: any): boolean {
  return !or(a, b);
}

export function xnor(a: any, b: any): boolean {
  return !xor(a, b);
}

export function allTrue(values: any[]): boolean {
  return values.every((x) => toBoolean(x));
}

export function anyTrue(values: any[]): boolean {
  return values.some((x) => toBoolean(x));
}

export function allFalse(values: any[]): boolean {
  return !anyTrue(values);
}

export function anyFalse(values: any[]): boolean {
  return !allTrue(values);
}

export function toNumber(value: any): number {
  return toBoolean(value) ? 1 : 0;
}

export function toString(value: any): string {
  return toBoolean(value) ? "true" : "false";
}
