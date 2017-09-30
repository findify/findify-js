import debug from 'debug';
import jsonp from 'jsonp';
import axios, { AxiosRequestConfig as AxiosOptions } from 'axios';
import * as qs from 'qs';

import { retryTimes } from './utils';
import { Method } from './request';
import { Body } from './Client';

/**
 * JSON API request parameters.
 */
export interface Request {
  url: string;
  method: Method;
  body: Body;
  options: Options;
  retryCount: number;
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

const sendJSONP = (req: Request) => {
  const query = qs.stringify(req.body, { addQueryPrefix: true });
  const url = `${req.url}${query}`;
  return new Promise((resolve, reject) => {
    jsonp(url, req.options, (err: Error | null, data: any) => {
      if (err) {
        reject(err);
      } else if (typeof data === 'object' && !(data instanceof Array)) {
        resolve(data);
      } else {
        resolve();
      }
    });
  });
};

const sendPOST = (req: Request) =>
  new Promise((resolve, reject) => {
    const headers = {
      'x-key': req.body.key,
      'Content-type': 'application/json',
    };
    return axios
      .post(req.url, req.body, { headers })
      .then(({ data }) => resolve(data))
      .catch(reject);
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
export const send = (req: Request) =>
  retryTimes(req.retryCount, () => request[req.method](req));
