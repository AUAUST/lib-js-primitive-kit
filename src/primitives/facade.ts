import { defineFacade } from "~/compiler";
import { toPrimitive } from "./methods/toPrimitive";

/**
 * The P class, for Primitives, provides useful methods for working with primitives globally.
 */
export default defineFacade({
  name: "P",
  instantiable: false,
  callable: toPrimitive,
});
