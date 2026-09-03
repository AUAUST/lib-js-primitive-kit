import { defineFacade } from "~/compiler";

export default defineFacade({
  name: "B",
  extends: Boolean,
  aliases: ["Bool"],
  instantiable: true,
  callable: true,
});
