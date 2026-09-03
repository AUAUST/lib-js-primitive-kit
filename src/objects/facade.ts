import { defineFacade } from "~/compiler";
import { toObject } from "./methods/toObject";

export default defineFacade({
  name: "O",
  extends: Object,
  aliases: ["Obj"],
  instantiable: true,
  callable: toObject,
});
