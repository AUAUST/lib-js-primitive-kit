import { defineFacade } from "~/compiler";

export default defineFacade({
  name: "F",
  extends: Function,
  aliases: ["Func"],
  instantiable: false,
  callable: true,
});
