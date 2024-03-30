export type _Booleanifiable =
  | boolean
  | Boolean
  | 0
  | 1
  | "true"
  | "True"
  | "TRUE"
  | "false"
  | "False"
  | "FALSE";

export type Booleanifiable =
  | _Booleanifiable
  | { valueOf(): _Booleanifiable }
  | { [Symbol.toPrimitive](): _Booleanifiable };
