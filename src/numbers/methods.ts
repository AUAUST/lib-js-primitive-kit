import type { Numberifiable, ToNumber } from "~/numbers/types";

export function toNumber(num: unknown): number {
  if (num === null || num === undefined) {
    return 0;
  }

  num = num.valueOf();

  switch (typeof num) {
    case "number":
      return num;
    case "symbol":
      return NaN;
    case "string": {
      if (num.trim() === "") {
        return 0;
      }

      num = num.replaceAll("_", ""); // adds support to `1_000_000` syntax, which is not supported by `parseFloat()` but is valid when typed in code

      return (
        Number(num) || // will handle radix and scientific notation
        Number.parseFloat(num as string) // will handle everything else
      );
    }
  }

  return Number(num);
}

export function isNumber(num: unknown): num is number {
  return typeof num === "number" && !isNaN(num);
}

export function isStrictNumber(num: unknown): num is number {
  return typeof num === "number" && isFinite(num); // isFinite() returns false for NaN too.
}

export function isLooseNumber(num: unknown): num is Numberifiable {
  if (num === null || num === undefined) {
    return false;
  }

  num = num.valueOf();

  switch (typeof num) {
    case "number":
      return true;
    case "string":
      return !isNaN(+num) && !isNaN(Number.parseFloat(num));
    default:
      return false;
  }
}

export function toExponential(
  num: Numberifiable,
  fractionDigits?: Numberifiable
): string {
  return toNumber(num).toExponential(toNumber(fractionDigits));
}

export function toFixed(
  num: Numberifiable,
  fractionDigits?: Numberifiable
): string {
  return toNumber(num).toFixed(toNumber(fractionDigits));
}

export function toLocaleString(
  num: Numberifiable,
  ...args: Parameters<Number["toLocaleString"]>
): string {
  return toNumber(num).toLocaleString(...args);
}

export function toPrecision(
  num: Numberifiable,
  precision?: Numberifiable
): string {
  return toNumber(num).toPrecision(toNumber(precision));
}

export function numberToString(
  num: Numberifiable,
  radix?: Numberifiable
): string {
  return toNumber(num).toString(toNumber(radix));
}

export function formatNumberToString(
  num: Numberifiable,
  options?: {
    thousandsSeparator?: string;
    decimalSeparator?: string;
    fractionDigits?: number;
  }
): string {
  const saneNum = toNumber(num);
  const saneOptions = {
    thousandsSeparator: ",",
    decimalSeparator: ".",
    fractionDigits: undefined,
    ...options,
  };

  const parts =
    // Only use `toFixed()` if a maximum number of decimal digits is specified.
    typeof saneOptions.fractionDigits === "number"
      ? saneNum.toFixed(saneOptions.fractionDigits).split(".")
      : saneNum.toString().split(".");

  parts[0] = parts[0]!.replace(
    /\B(?=(\d{3})+(?!\d))/g,
    saneOptions.thousandsSeparator
  );

  return parts.join(saneOptions.decimalSeparator);
}

export function min<Ns extends Numberifiable[]>(
  ...nums: Ns
): ToNumber<Ns[number]> {
  return Math.min(...nums.map(toNumber)) as ToNumber<Ns[number]>;
}

export function max<Ns extends Numberifiable[]>(
  ...nums: Ns
): ToNumber<Ns[number]> {
  return Math.max(...nums.map(toNumber)) as ToNumber<Ns[number]>;
}

export function minMax(...nums: Numberifiable[]): [min: number, max: number] {
  nums = nums.map(toNumber);

  return [Math.min(...(<number[]>nums)), Math.max(...(<number[]>nums))];
}

export function sum(...nums: Numberifiable[]): number {
  return nums.reduce<number>((acc, num) => acc + toNumber(num), 0);
}

export function subtract(num: Numberifiable, ...nums: Numberifiable[]): number {
  return nums.reduce<number>((acc, n) => acc - toNumber(n), toNumber(num));
}

export function multiply(...nums: Numberifiable[]): number {
  return nums.reduce<number>((acc, num) => acc * toNumber(num), 1);
}

export function divide(num: Numberifiable, ...nums: Numberifiable[]): number {
  return nums.reduce<number>((acc, n) => acc / toNumber(n), toNumber(num));
}

export function remainder(
  num: Numberifiable,
  divisor: Numberifiable = 1
): number {
  return toNumber(num) % toNumber(divisor);
}

export function power(base: Numberifiable, exponent: Numberifiable): number {
  return toNumber(base) ** toNumber(exponent);
}

export function average(...nums: Numberifiable[]): number {
  return sum(...nums) / nums.length;
}

export function randInt(
  min: Numberifiable = 0,
  max: Numberifiable = 100
): number {
  const saneMin = toNumber(min);
  return Math.floor(Math.random() * (toNumber(max) - saneMin + 1)) + saneMin;
}

export function randFloat(
  min: Numberifiable = 0,
  max: Numberifiable = 1
): number {
  const saneMin = toNumber(min);
  return Math.random() * (toNumber(max) - saneMin) + saneMin;
}

export function isEven(num: Numberifiable): num is number {
  const saneNum = toNumber(num);
  return isInteger(saneNum) && (saneNum & 1) === 0;
}

export function isOdd(num: Numberifiable): num is number {
  const saneNum = toNumber(num);
  return isInteger(saneNum) && (saneNum & 1) === 1;
}

export function isMultipleOf(
  num: Numberifiable,
  multiple: Numberifiable
): num is number {
  return toNumber(num) % toNumber(multiple) === 0;
}

export function abs(num: Numberifiable): number {
  return Math.abs(toNumber(num));
}

export function clamp(
  num: Numberifiable,
  min: Numberifiable,
  max: Numberifiable
): number {
  return Math.min(Math.max(toNumber(num), toNumber(min)), toNumber(max));
}

export function floor(num: Numberifiable): number {
  return Math.floor(toNumber(num));
}

export function ceil(num: Numberifiable): number {
  return Math.ceil(toNumber(num));
}

export function round(
  num: Numberifiable,
  precision: Numberifiable = 1
): number {
  const sanePrecision = toNumber(precision) || 1;
  return Math.round(toNumber(num) / sanePrecision) * sanePrecision;
}

export function isBetween(
  num: Numberifiable,
  min: Numberifiable,
  max: Numberifiable
): boolean {
  const saneNum = toNumber(num);
  return saneNum >= toNumber(min) && saneNum <= toNumber(max);
}

export function isInteger(num: Numberifiable): boolean {
  return Number.isInteger(toNumber(num));
}

export function hasDecimal(num: Numberifiable): boolean {
  return !Number.isInteger(toNumber(num));
}

export function isPositive(num: Numberifiable): boolean {
  return toNumber(num) > 0;
}

export function isNegative(num: Numberifiable): boolean {
  return toNumber(num) < 0;
}

export function or(...args: Numberifiable[]): number {
  for (let arg of args) if (!isNaN((arg = toNumber(arg)))) return arg as number;
  return NaN;
}
