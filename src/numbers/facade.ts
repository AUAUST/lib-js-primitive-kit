import { defineFacade } from "~/compiler";

export default defineFacade({
  name: "N",
  extends: Number,
  aliases: ["Num"],
  instantiable: true,
  callable: true,
});
