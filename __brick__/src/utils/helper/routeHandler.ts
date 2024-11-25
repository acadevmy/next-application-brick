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

    return Response.json({ error }, { status: 500 });
  }
};
