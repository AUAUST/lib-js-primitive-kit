import type { Constructor } from "~/functions/types";

/**
 * Checks if the value is constructible. This means `new value()` will work.
 */
export function isConstructible(fn: unknown): fn is Constructor {
  if (typeof fn !== "function") {
    return false;
  }

  try {
    // @ts-expect-error
    new new Proxy(fn, {
      construct() {
        return {};
      },
    })();

    return true;
  } catch {
    return false;
  }
}
