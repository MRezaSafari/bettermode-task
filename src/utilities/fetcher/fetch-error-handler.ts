import { IFetchError } from "@bettermode/models";

const handleFetchError = async (error: unknown): Promise<unknown> => {
  const errorMessage = await (error as Response)?.json?.();

  const fetchError: IFetchError = {
    status: errorMessage?.status || 500,
    message: errorMessage?.message || 'something went wrong',
    code: errorMessage?.code,
    errors: errorMessage?.errors || [],
    error_code: errorMessage?.error_code,
  };

  return fetchError;
};

export default handleFetchError;
