/** An error that's thrown when an array-helper function is given a non-array value. */
export class ExpectedArrayError extends Error {
  constructor() {
    super("Expected an array object.");
  }
}
