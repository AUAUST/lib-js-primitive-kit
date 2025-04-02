import { isString } from "~/strings/methods";

export function toBoolean(bool: any): boolean {
  bool = bool?.valueOf();

  if (isString(bool)) {
    bool = bool.trim();

    return !(bool === "" || bool === "0" || bool.toLowerCase() === "false");
  }

  return !!bool;
}
