/**
 *  Returns a random boolean. A bias can be provided as a number between `0` and `1`.
 * `0.5`, the default, will return `true` or `false` with equal probability.
 * `0` will always return `false`, `1` will always return `true`.
 */
export function random(bias: number = 0.5): boolean {
  return Math.random() < bias;
}
