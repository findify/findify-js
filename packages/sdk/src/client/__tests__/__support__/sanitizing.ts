import { RequestBody, ResponseBody } from '../..';

/**
 * Set random and time-dependent data to be the same as in recorded body.
 * Use for [nock back](https://github.com/node-nock/nock#nock-back) tests.
 */
export function sanitizeRequestBody(
  body: string,
  recordedBody: RequestBody
): string {
  const currentBody: RequestBody = JSON.parse(body);
  // we don't want our tests fail on timestamp mismatch
  currentBody.t_client = recordedBody.t_client;
  return JSON.stringify(currentBody);
}

/**
 * Exclude sensitive data from response body.
 */
export const sanitizeResponseBody = (body: ResponseBody) => ({
  ...body,
  meta: {
    ...body.meta,
    rid: '<stripped>',
  },
});
