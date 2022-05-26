import { stringify } from 'qs';
import { User, PublicEventRequest } from '../types';
import settings from '../settings';

declare module global {
  const navigator: any;
  const document: any;
  const window: any;
}

const getEndpoint = (endpoint?: string, apiKey?: string): string =>
  !endpoint ? `${settings.searchApiUrl}/${apiKey}/feedback` : endpoint;

const makeQuery = (query) => stringify({ ...query, t_client: Date.now() });

// tslint:disable-next-line:variable-name
const ImageRequest = (data: any, endpoint?: string) =>
  new Promise((resolve) => {
    const image = global.document.createElement('img');
    image.onload = resolve;
    image.onerror = resolve;
    image.src = `${getEndpoint(endpoint)}?${makeQuery(data)}`;
  });

// tslint:disable-next-line:variable-name
const BeaconRequest = (data: any, endpoint?: string) =>
  new Promise((resolve) => {
    const { key, ...rest } = data;
    global.navigator.sendBeacon(
      getEndpoint(endpoint, key),
      JSON.stringify({ ...rest, t_client: Date.now() })
    );
    resolve(true);
  });

export const request = (function () {
  if (typeof navigator !== 'undefined' && navigator.sendBeacon)
    return BeaconRequest;
  if (typeof window !== 'undefined') return ImageRequest;
  if (!process.env.BROWSER) {
    return (data: any, endpoint?: string) =>
      new Promise((resolve, reject) => {
        const http = require('http');
        http.get(
          `${getEndpoint(endpoint).replace('https', 'http')}?${makeQuery(data)}`
        );
        resolve(true);
      });
  }
  throw new Error('Can not determinate request type');
})();

type Data = {
  key: string;
  user: User;
  event: string;
  properties: PublicEventRequest;
};
