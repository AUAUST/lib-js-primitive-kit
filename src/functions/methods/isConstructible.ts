import type { Constructor } from "~/functions/types";

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
