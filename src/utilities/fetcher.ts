import type { IFetchError, IOptions, THttpMethod } from "@bettermode/models";
import createHeaders from "./fetcher/create-headers";
import createRequestInit from "./fetcher/create-request-init";
import handleFetchError from "./fetcher/fetch-error-handler";

async function fetcher<T>(
  method?: THttpMethod,
  options?: IOptions
): Promise<T | null | IFetchError> {
  const headers = createHeaders(options);
  const requestInit = createRequestInit(method, headers, options);

  try {
    const url = process.env.BASE_URL!;

    const response = await fetch(url, requestInit);
    if (!response.ok) {
      console.error(response);
      // handle errors better and meaningful
      return null;
    }
    return response.json();
  } catch (error) {
    return handleFetchError(error) as unknown as IFetchError;
  }
}

export default fetcher;
