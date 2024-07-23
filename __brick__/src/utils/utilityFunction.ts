import { isStringNotEmpty } from "@/utils/typeCheck";
import { DEFAULT_CONCATENATE_SEPARATOR } from "@/utils/utilityConstants";

export const first = <T>(arr: T[] | null | undefined): T | undefined => {
  if (arr && arr.length > 0) {
    return arr[0];
  }
  return undefined;
};

export const checkIntersection = <T>(arr1: T[], arr2: T[]) => {
  return arr1.some((item) => arr2.includes(item));
};

export const removeNullUndefined = <T>(arr: T[]) => {
  return arr.filter((item) => item !== null && item !== undefined);
};

interface StringConcatenateOptions {
  separator?: string;
  removeEmptyStrings?: boolean;
}

export const concatenateStrings = (
  strings: string[],
  options?: StringConcatenateOptions,
) => {
  const internalOptions = {
    separator: DEFAULT_CONCATENATE_SEPARATOR,
    ...options,
  };

  let internalStrings = strings;
  if (internalOptions.removeEmptyStrings) {
    internalStrings = internalStrings.filter(isStringNotEmpty);
  }
  return internalStrings.join(internalOptions.separator);
};

export const capitalizeString = (str: string) =>
  str.charAt(0).toUpperCase() + str.slice(1);

export const isEmptyObject = (obj: object) => Object.keys(obj).length === 0;

export const JSONStringifyFormatted = (obj: object) =>
  JSON.stringify(obj, null, 4);

export const notEmpty = <TValue>(
  value: TValue | null | undefined,
): value is TValue => value !== null && value !== undefined;
