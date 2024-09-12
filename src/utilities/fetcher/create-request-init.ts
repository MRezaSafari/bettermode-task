import type { IOptions, THttpMethod } from "@bettermode/models";

const createRequestInit = (
  method: THttpMethod = "GET",
  headers: Record<string, string>,
  options?: IOptions
): RequestInit => ({
  method,
  headers,
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  ...(options?.body && { body: JSON.stringify(options.body) }),
});

export default createRequestInit;
