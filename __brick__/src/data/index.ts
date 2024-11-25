import { AvailableTimezones, TimeApiData } from "@/data/types";

export const fetchTimeApiData = async () => {
  const response = await fetch(
    "https://timeapi.io/api/time/current/zone?timeZone=Europe/Rome",
    {
      next: {
        tags: ["static-data"],
      },
    },
  );
  const payload = (await response.json()) as TimeApiData;
  return payload;
};

export const fetchTimeApiDataByTimeZone = async (timeZone: string) => {
  const response = await fetch(
    `https://timeapi.io/api/time/current/zone?timeZone=${timeZone}`,
    {
      next: {
        tags: [`static-data-${timeZone}`],
      },
    },
  );
  const payload = (await response.json()) as TimeApiData;
  return payload;
};

export const fetchAvailableTimezones = async () => {
  const response = await fetch(
    "https://timeapi.io/api/timezone/availabletimezones",
  );
  const payload = (await response.json()) as AvailableTimezones;
  return payload;
};
