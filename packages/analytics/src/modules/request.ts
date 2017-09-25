import * as qs from 'qs';
import { User, EventName, InternalEventRequest } from '../types';

import env = require('../env');

const makeSrc = (queryString: string, endpoint?: string) =>
  (!endpoint && env.searchApi.url + '/feedback?' + queryString) ||
  `${endpoint}?${queryString}`;

const request = (data: any, endpoint?: string) =>
  new Promise((resolve, reject) => {
    const queryString = qs.stringify({ ...data, t_client: Date.now() });
    const image = window.document.createElement('img');

    image.onload = resolve;
    image.onerror = resolve;

    image.src = makeSrc(queryString, endpoint);
  });

export default { request };

type Data = {
  key: string;
  user: User;
  event: string;
  properties: InternalEventRequest;
};
