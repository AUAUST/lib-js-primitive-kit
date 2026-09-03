import { defineFacade } from "~/compiler";
import { toArray } from "./methods/toArray";

export default defineFacade({
  name: "A",
  extends: Array,
  aliases: ["Arr"],
  instantiable: true,
  callable: toArray,
});
