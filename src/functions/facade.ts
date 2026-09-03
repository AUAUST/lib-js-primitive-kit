import { defineFacade } from "~/compiler";
import { toFunction } from "./methods/toFunction";

export default defineFacade({
  name: "F",
  extends: Function,
  aliases: ["Func"],
  instantiable: false,
  callable: toFunction,
});
