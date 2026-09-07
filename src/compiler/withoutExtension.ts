import type { SourceFile } from "ts-morph";

export function withoutExtension(file: SourceFile): string {
  return file
    .getFilePath()
    .replace(new RegExp(`${file.getExtension().replace(".", "\\.")}$`), "");
}
