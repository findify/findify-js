import { Scope as NockScope, NockBackOptions, NockDefinition } from 'nock';
import * as nock from 'nock';

import { Client, Config } from '../..';
import * as Req from '../../../request';
import { sanitizeRequestBody, sanitizeResponseBody } from './sanitizing';
import * as users from './data/users';

function nockBackBeforeHook(scope: NockScope) {
  scope.filteringRequestBody = sanitizeRequestBody as any;
}

export const nockBackOptions: NockBackOptions = {
  before: nockBackBeforeHook as any,
  afterRecord: (defs: NockDefinition[]) =>
    defs.map((def: NockDefinition) => ({
      ...def,
      response: sanitizeResponseBody(def.response),
    })),
};

export interface RequestTestContext {
  client: Client;
  request: Req.Request;
  fixture: string;
}

export async function verifyRequest(
  ctx: RequestTestContext,
  cleanNocks: boolean = true
) {
  const { client, request, fixture } = ctx;
  const { nockDone, context } = (await nock.back(
    fixture,
    nockBackOptions as any
  )) as any;

  const response = await client.send(request);
  context.assertScopesFinished();
  const sanitized = sanitizeResponseBody(response);
  expect(sanitized).toMatchSnapshot();
  nockDone();
  if (cleanNocks) {
    nock.cleanAll();
  }
}

export { users, sanitizeRequestBody, sanitizeResponseBody };
