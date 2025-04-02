import type { Booleanifiable } from "~/booleans/types";

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
