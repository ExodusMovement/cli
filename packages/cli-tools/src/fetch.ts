import nodeFetch, {
  RequestInit as FetchOptions,
  Response,
  Request,
  Headers,
} from 'node-fetch';
import {CLIError} from './errors';

async function unwrapFetchResult(response: Response) {
  const data = await response.text();

  try {
    return JSON.parse(data);
  } catch (e) {
    return data;
  }
}

/**
 * Downloads the given `url` to the OS's temp folder and
 * returns the path to it.
 */
const fetchToTemp = (_url: string): Promise<string> => {
  throw new Error('fetchToTemp disabled by Exodus audit team');
};

const fetch = async (
  url: string | Request,
  options?: FetchOptions,
): Promise<{status: number; data: any; headers: Headers}> => {
  const result = await nodeFetch(url, options);
  const data = await unwrapFetchResult(result);

  if (result.status >= 400) {
    throw new CLIError(
      `Fetch request failed with status ${result.status}: ${data}.`,
    );
  }

  return {
    status: result.status,
    headers: result.headers,
    data,
  };
};

export {fetch, fetchToTemp};
