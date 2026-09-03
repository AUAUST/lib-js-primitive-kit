import { JSDoc } from "ts-morph";

export function renderJSDocs(jsDocs: JSDoc[], indentation = 0): string {
  return jsDocs
    .map((jsDoc) =>
      jsDoc
        .getText()
        .split(/\r?\n/)
        .map((line, index) =>
          index === 0 ? line : `${"  ".repeat(indentation)}${line}`,
        )
        .join("\n"),
    )
    .join("\n");
}
