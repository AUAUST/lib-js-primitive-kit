import { defineFacade } from "~/compiler";
import { toBoolean } from "./methods/toBoolean";

export default defineFacade({
  name: "B",
  extends: Boolean,
  aliases: ["Bool"],
  instantiable: true,
  callable: toBoolean,
});
