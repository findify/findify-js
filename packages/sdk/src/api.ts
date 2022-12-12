import debug from 'debug';
import axios, { AxiosRequestConfig as AxiosOptions } from 'axios';
import * as qs from 'qs';
import jsonp from './jsonp';

import { requestHandler } from './utils';
import { Method, Body } from './request';
import { requestInterceptor } from './apiInterceptor';

/**
 * JSON API request parameters.
 */
export interface Request {
  url: string;
  method: Method;
  body: Body;
  options: Options;
  retryCount: number;
  id?: string | 0;
}

/**
 * JSONP request options.
 * @see {@link https://github.com/webmodules/jsonp|webmodules/jsonp} for further information.
 */
export interface JSONPOptions {
  param?: string;
  prefix?: string;
  name?: string;
  timeout?: number;
}

/**
 * API request options.
 */
export type Options = AxiosOptions | JSONPOptions;

const sendJSONP = (request: Request, getLatestRequestID) => {
  const req = requestInterceptor(request);
  const query = qs.stringify(req.body, { addQueryPrefix: true });
  const url = `${req.url}${query}`;
  return new Promise((resolve, reject) => {
    debug('sdk:api:jsonp')('url: ', url);
    debug('sdk:api:jsonp')('options: ', req.options);
    jsonp(url, req.options, (err: Error | null, data: any) => {
      if (getLatestRequestID() !== req.id) return;
      if (err) {
        reject(err);
      } else if (typeof data === 'object' && !(data instanceof Array)) {
        resolve(data);
      } else {
        resolve(undefined);
      }
    });
  });
};

const CancelToken = axios.CancelToken;
const cancelTokensMap = {};
const handleRequestTokens = (currentRequestUrl, body, currentSource) => {
  const { t_client, user, log, key, ...params } = body;
  const keyMap = `${currentRequestUrl} ${JSON.stringify(params)}`;
  if (cancelTokensMap[keyMap]) cancelTokensMap[keyMap].cancel();
  cancelTokensMap[keyMap] = currentSource;
}

const sendPOST = (request: Request) =>
  new Promise((resolve, reject) => {
    const req = requestInterceptor(request);
    const headers = {
      'Content-type': 'application/json',
    };
    debug('sdk:api:post')('url: ', req.url);
    debug('sdk:api:post')('body: ', req.body);
    debug('sdk:api:post')('headers: ', headers);

    const source = CancelToken.source();
    handleRequestTokens(req.url, req.body, source);

    axios
      .post(req.url, req.body, { headers, cancelToken: source.token })
      .then((response) => {
        debug('sdk:api:post')('response: ', response);
        resolve(response.data);
      })
      .catch((err) => {
        if (!axios.isCancel(err)) reject(err)
      });
  });

/**
 * Send a request to Findify JSON API.
 * @param req Request parameters.
 */
const request = {
  [Method.POST]: sendPOST,
  [Method.JSONP]: sendJSONP,
};

/**
 * Send a request to Findify JSON API.
 * @param req Request parameters.
 */
export const send = (req: Request, getLatestRequestID) => {
  return requestHandler(() => request[req.method](req, getLatestRequestID), req.url);
}
