import { DEFAULT_EMPTY_STRING } from "@/utils/utilityConstants";

export const isString = (value: unknown): value is string =>
  typeof value === "string";

type NonEmptyString = string & { __nonEmptyString: never };

export const isStringNotEmpty = (value: unknown): value is NonEmptyString =>
  typeof value === "string" && value.trim() !== DEFAULT_EMPTY_STRING;

export const isEmpty = <T>(value: T[] | null | undefined) =>
  !value || value.length === 0;

export const isFunction = (value: unknown): value is (...args: any[]) => any =>
  typeof value === "function";

export const instanceOf = <T extends object>(
  object: any,
  key: keyof T,
): object is T => {
  return key in object;
};
