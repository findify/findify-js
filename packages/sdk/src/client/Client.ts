import debug from 'debug';
import { User } from '../common';
import { omit } from '../utils';
import * as API from '../api';
import { validateUser } from '../validation';
import * as Req from '../request';
import * as Res from '../response';
import { Config } from './Config';

/**
 * API endpoint.
 */
interface Endpoint {
  /** URL path */
  path: string;
  /** URL path parameters, excluded from request body */
  params?: string[];
}

/** Request body */
export type Body = CommonBody & Req.Body;

/**
 * Common request body parameters.
 */
export interface CommonBody {
  /** A timestamp from the client side of the user */
  t_client: number;
  user: User;
  key: string;
  log?: boolean;
}

/*
 * The SDK client.
 * Wrapper of the low-level Findify JSON API.
 */
export class Client {
  constructor(private config: Config) {
    debug('sdk:client:config')(config);
  }

  /**
   * Make a request.
   */
  public send(req: Req.Request, opts: API.Options = {}): Promise<object> {
    const request = this.buildRequest(req, opts);
    debug('sdk:client:request')(request);
    return API.send(request);
  }

  private buildRequest(req: Req.Request, opts: API.Options): API.Request {
    const endpoint = this.getEndpoint(req);
    const url = this.getUrl(endpoint);
    const body = this.getBody(req, endpoint);
    const method = this.config.method!;
    const retryCount = this.config.retryCount!;
    const options = this.getOptions(req, opts);
    return { url, body, method, retryCount, options };
  }

  /**
   * Get an {Endpoint} depending on the request type.
   * @param req Request.
   * @returns Endpoint instance with a path and parameter names used in it.
   */
  private getEndpoint(req: Req.Request): Endpoint {
    switch (req.type) {
      case Req.Type.Autocomplete:
        return { path: `/autocomplete` };
      case Req.Type.Search:
        return { path: `/search` };
      case Req.Type.SmartCollection:
        return {
          path: `/smart-collection/${req.params.slot}`,
          params: ['slot'],
        };
      case Req.Type.Recommendations:
        return this.getRecommendationsEndpoint(req.params);
      case Req.Type.Feedback:
        return { path: `/feedback` };
      default:
        throw new Error('Invalid request type');
    }
  }

  private getRecommendationsEndpoint(
    params: Req.Recommendations.Params
  ): Endpoint {
    switch (params.type) {
      case Req.Recommendations.Type.Featured:
        return { path: `/recommend/items/featured` };
      case Req.Recommendations.Type.Newest:
        return { path: `/recommend/items/newest` };
      case Req.Recommendations.Type.Trending:
        return { path: `/recommend/items/trending` };
      case Req.Recommendations.Type.RecentlyViewed:
        return { path: `/recommend/items/latest` };
      case Req.Recommendations.Type.Slot:
        return { path: `/recommend/${params.slot}`, params: ['slot'] };
      case Req.Recommendations.Type.AlsoViewed:
        return {
          path: `/recommend/items/${params.item_id}/viewed/viewed`,
          params: ['item_id'],
        };
      case Req.Recommendations.Type.AlsoBought:
        return {
          path: `/recommend/items/${params.item_id}/viewed/bought`,
          params: ['item_id'],
        };
      case Req.Recommendations.Type.FrequentlyPurchasedTogether:
        const ids = params.item_ids.join(',');
        return {
          path: `/recommend/items/${ids}/bought/bought`,
          params: ['item_ids'],
        };
      default:
        throw new Error('Invalid recommendations type');
    }
  }

  private getUrl(endpoint: Endpoint) {
    // - we can't safely rely on URL spec: https://url.spec.whatwg.org/
    // - we need support old browsers: https://caniuse.com/#search=URL
    // - 45 kb just to concat url segments: https://github.com/medialize/URI.js/issues/172#issuecomment-273685906
    return `${this.config.url}${endpoint.path}`;
  }

  /**
   * Get a request body.
   */
  private getBody(req: Req.Request, endpoint: Endpoint): Body {
    const common = this.getCommonBody(req);
    const request = this.getRequestBody(req, endpoint);
    return { ...common, ...request };
  }

  /**
   * Get common request parameters.
   * @see {@link https://findify.readme.io/v3/reference#getting-started|getting started} for more information.
   */
  private getCommonBody(req: Req.Request): CommonBody {
    const user = this.config.user || req.params.user;
    validateUser(user);
    return {
      user: user!,
      t_client: Date.now(),
      key: this.config.key,
      log: this.config.log,
    };
  }

  private getRequestBody(req: Req.Request, endpoint: Endpoint): Req.Body {
    // remove from request body:
    // - params that are supplied through path
    // - typescript "discriminant"
    //   see: https://www.typescriptlang.org/docs/handbook/advanced-types.html

    const pathParams = endpoint.params || [];
    const omitParams = <T>(ks: string[]) =>
      omit(pathParams.concat(ks), req.params) as T;

    switch (req.type) {
      case Req.Type.Recommendations:
        return omitParams<Req.Recommendations.Params>(['type']);
      case Req.Type.Feedback:
        return omitParams<Req.Feedback.Params>(['event']);
      default:
        return req.params;
    }
  }

  private getOptions(req: Req.Request, opts: API.Options): API.Options {
    return {
      timeout: this.config.timeout,
      ...opts,
    };
  }
}
