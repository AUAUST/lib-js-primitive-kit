import { defineMethod } from "~/compiler";

export default defineMethod({
  instanceCallable: "chainable",
});

export const seal = Object.seal;
