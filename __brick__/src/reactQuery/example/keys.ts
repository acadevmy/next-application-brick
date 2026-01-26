import { getExampleQueryKey } from "../keys";

type GetExampleQueryKeysProps = {
  locale: string;
  param: string;
};

export const getExampleQueryKeys = ({
  locale,
  param,
}: GetExampleQueryKeysProps) => [getExampleQueryKey, locale, param];
