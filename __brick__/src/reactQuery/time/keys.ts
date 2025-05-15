import { getTimeQueryKey } from "../keys";

type GetTimeQueryKeysProps = {
  locale: string;
  timeZoneParam: string;
};

export const getTimeQueryKeys = ({
  locale,
  timeZoneParam,
}: GetTimeQueryKeysProps) => [getTimeQueryKey, locale, timeZoneParam];
