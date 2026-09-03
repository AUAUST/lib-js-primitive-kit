import { JSDoc } from "ts-morph";

export function renderJSDocs(jsDocs: JSDoc[], indentation = 0): string {
  return jsDocs
    .map((jsDoc) =>
      jsDoc
        .getText()
        .split(/\r?\n/)
        .map((line, index) => {
          const content = line.trimEnd();
          return index === 0 || content.length === 0
            ? content
            : `${"  ".repeat(indentation)}${content}`;
        })
        .join("\n"),
    )
    .join("\n");
}
