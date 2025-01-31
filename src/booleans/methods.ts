import { Booleanifiable } from "~/booleans/types";

function toBool(value: any, smart: boolean = false): boolean {
  return smart ? toBoolean(value) : Boolean(value);
}

export function toBoolean(bool: any): boolean {
  bool = bool?.valueOf();

  if (typeof bool === "string") {
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

export function booleanEquals(a: any, b: any): boolean {
  return toBoolean(a) === toBoolean(b);
}

export function and(a: any, b: any, smart?: boolean): boolean {
  return toBool(a, smart) && toBool(b, smart);
}

export function or(a: any, b: any, smart?: boolean): boolean {
  return toBool(a, smart) || toBool(b, smart);
}

export function not(a: any, smart?: boolean): boolean {
  return !toBool(a, smart);
}

export function xor(a: any, b: any, smart?: boolean): boolean {
  return toBool(a, smart) !== toBool(b, smart);
}

export function nand(a: any, b: any, smart?: boolean): boolean {
  return !and(a, b, smart);
}

export function nor(a: any, b: any, smart?: boolean): boolean {
  return !or(a, b, smart);
}

export function xnor(a: any, b: any, smart?: boolean): boolean {
  return !xor(a, b, smart);
}

export function allTrue(values: any[], smart?: boolean): boolean {
  return values.every((x) => toBool(x, smart));
}

export function anyTrue(values: any[], smart?: boolean): boolean {
  return values.some((x) => toBool(x, smart));
}

export function allFalse(values: any[], smart?: boolean): boolean {
  return !anyTrue(values, smart);
}

export function anyFalse(values: any[], smart?: boolean): boolean {
  return !allTrue(values, smart);
}

export function toNumber(value: any): number {
  return toBoolean(value) ? 1 : 0;
}
