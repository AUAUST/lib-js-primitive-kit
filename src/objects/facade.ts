import { defineFacade } from "~/compiler";

export default defineFacade({
  name: "O",
  extends: Object,
  aliases: ["Obj"],
  instantiable: true,
  callable: true,
});
