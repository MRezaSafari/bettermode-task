import { IOptions } from "@bettermode/models";

const createHeaders = (options?: IOptions): Record<string, string> => {
  const headersList: Record<string, string> = {
    "Content-Type": "application/json",
    Accept: "application/json",
    ...options?.headers,
  };

  return headersList;
};

export default createHeaders;
