import { defineFacade } from "~/compiler";

export default defineFacade({
  name: "A",
  extends: Array,
  aliases: ["Arr"],
  instantiable: true,
  callable: true,
});
