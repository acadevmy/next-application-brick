import { NextRequest } from "next/server";
import { ZodError } from "zod";

import { RouteHandlerResponseType } from "@/utils/helper/types";

export const handleRequest = async <TData>(
  fn: (objectParams: Record<string, string>) => TData,
  request: NextRequest,
) => {
  const { searchParams } = new URL(request.url);
  const objectParams = Object.fromEntries(searchParams.entries());

  try {
    return Response.json({
      data: await fn(objectParams),
      now: Date.now(),
    } satisfies RouteHandlerResponseType<TData>);
  } catch (error) {
    if (error instanceof ZodError)
      return Response.json({ error }, { status: 400 });

    // TODO: handle ApplicationError

    if (error instanceof Error)
      return Response.json({ error: error.message }, { status: 500 });

    return Response.json(
      { error: "Route handler generic error" },
      { status: 500 },
    );
  }
};

export const fetchRouteHandler = async <TData>(
  url: string,
  init: RequestInit | undefined = undefined,
) => {
  const response = await fetch(url, init);

  if (!response.ok) {
    const { error } = await response.json();

    // TODO: handle error
    const ErrorClass = Error;
    throw new ErrorClass(error);
  }

  const responseData =
    (await response.json()) as RouteHandlerResponseType<TData>;
  return responseData;
};
