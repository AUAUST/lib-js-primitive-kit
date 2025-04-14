import { isString } from "~/strings/methods";

export function toBoolean(bool?: any): boolean {
  if (isString((bool = bool?.valueOf()))) {
    bool = bool.trim();

    return !(bool === "" || bool === "0" || bool.toLowerCase() === "false");
  }

  return !!bool;
}
