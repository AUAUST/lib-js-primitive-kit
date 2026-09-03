import { defineFacade } from "~/compiler";
import { toNumber } from "./methods/toNumber";

export default defineFacade({
  name: "N",
  extends: Number,
  aliases: ["Num"],
  instantiable: true,
  callable: toNumber,
});
