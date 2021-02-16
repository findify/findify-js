import debug from 'debug';
import axios, { AxiosRequestConfig as AxiosOptions } from 'axios';
import * as qs from 'qs';
import jsonp from './jsonp';

import { retryTimes } from './utils';
import { Method, Body } from './request';

/**
 * JSON API request parameters.
 */
export interface Request {
  url: string;
  method: Method;
  body: Body;
  options: Options;
  retryCount: number;
  id?: string|0;
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

const sendJSONP = (req: Request, getLatestRequestID) => {
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

const sendPOST = async (req: Request) => {
  const headers = {
    'x-key': req.body.key,
    'Content-type': 'application/json',
  };
  debug('sdk:api:post')('url: ', req.url);
  debug('sdk:api:post')('body: ', req.body);
  debug('sdk:api:post')('headers: ', headers);
  const response = await axios.post(req.url, req.body, { headers });
  debug('sdk:api:post')('response: ', response);
  return response.data;
};

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
export const send = (req: Request, getLatestRequestID) =>
  retryTimes(req.retryCount, () => request[req.method](req, getLatestRequestID));
