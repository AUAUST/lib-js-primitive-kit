import { defineFacade } from "~/compiler";
import { toString } from "./methods/toString";

/**
 * The S class, for String, provides useful methods for working with strings.
 */
export default defineFacade({
  name: "S",
  extends: String,
  aliases: ["Str"],
  instantiable: true,
  callable: toString,
});
