import debug from 'debug';
import { User } from '../common';
import { omit, generateRID } from '../utils';
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

/*
 * The SDK client.
 * Wrapper of the low-level Findify JSON API.
 */
export class Client {
  constructor(private config: Config) {
    debug('sdk:client:config')(config);
  }

  private latestRequestID: any = undefined;

  private getLatestRequestID = () => this.latestRequestID;

  /**
   * Make a request.
   */
  public send(req: Req.Request, opts: API.Options = {}): Promise<Res.Body> {
    const request = this.buildRequest(req, opts);
    debug('sdk:client:request')(request);
    return API.send(request, this.getLatestRequestID) as Promise<Res.Body>;
  }

  private buildRequest(req: Req.Request, opts: API.Options): API.Request {
    const endpoint = this.getEndpoint(req);
    const url = this.getUrl(endpoint);
    const body = this.getRequestBody(req, endpoint);
    const method = this.config.method!;
    const retryCount = this.config.retryCount!;
    const options = this.getOptions(req, opts);
    const id = this.latestRequestID = generateRID();
    return { url, body, method, retryCount, options, id };
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
      case Req.Type.Content:
        return { path: `/search/content` };
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

  private getRecommendationUrl(
    params: Req.Recommendations.Params
  ): Endpoint["path"] {
    if (Boolean((<Req.Recommendations.Slot>params).slot)) {
      return `/recommend/${(<Req.Recommendations.Slot>params).slot}`;
    }
    switch (params.type) {
      case Req.Recommendations.Type.Featured:
        return `/recommend/items/featured`;
      case Req.Recommendations.Type.Newest:
        return `/recommend/items/newest`;
      case Req.Recommendations.Type.Trending:
        return `/recommend/items/trending`;
      case Req.Recommendations.Type.RecentlyViewed:
        return `/recommend/items/viewed/latest`;
      case Req.Recommendations.Type.Slot:
        return `/recommend/${params.slot}`;
      case Req.Recommendations.Type.AlsoViewed:
        return `/recommend/items/${params.item_id}/viewed/viewed`;
      case Req.Recommendations.Type.AlsoBought:
        return  `/recommend/items/${params.item_id}/viewed/bought`;
      case Req.Recommendations.Type.FrequentlyPurchasedTogether:
        const ids = params.item_ids.join(',');
        return `/recommend/items/${ids}/bought/bought`;
      default:
        throw new Error('Invalid recommendations type');
    }
  }

  private getRecommendationsParams(
    params: Req.Recommendations.Params
  ): Endpoint['params'] {
    switch (params.type) {
      case Req.Recommendations.Type.Slot:
        return ['slot'];
      case Req.Recommendations.Type.AlsoViewed:
        return ['item_id'];
      case Req.Recommendations.Type.AlsoBought:
        return ['item_id'];
      case Req.Recommendations.Type.FrequentlyPurchasedTogether:
        return ['item_ids']
      default:
        return undefined;
    }
  }

  private getRecommendationsEndpoint(
    params: Req.Recommendations.Params
  ): Endpoint {
    return {
      path: this.getRecommendationUrl(params),
      params: this.getRecommendationsParams(params)
    }
  }

  private getUrl(endpoint: Endpoint) {
    // - we can't safely rely on URL spec: https://url.spec.whatwg.org/
    // - we need to support old browsers: https://caniuse.com/#search=URL
    // - 45 kb just to concat url segments: https://github.com/medialize/URI.js/issues/172#issuecomment-273685906
    return `${this.config.url}${endpoint.path}`;
  }

  /**
   * Get a request body.
   */
  private getRequestBody(req: Req.Request, endpoint: Endpoint): Req.Body {
    const common = this.getCommonParams(req);
    const specific = this.getSpecificParams(req, endpoint);
    return { ...common, ...specific };
  }

  /**
   * Get common reques parameters.
   * @see {@link https://findify.readme.io/v3/reference#getting-started|getting started} for more information.
   */
  private getCommonParams(req: Req.Request): Req.CommonParams {
    const user = req.params.user || this.config.user; // tslint:disable-line
    validateUser(user);
    return {
      user: user!,
      t_client: Date.now(),
      key: this.config.key,
      log: this.config.log,
    };
  }

  private getSpecificParams(
    req: Req.Request,
    endpoint: Endpoint
  ): Req.SpecificParams {
    // remove from request body:
    // - params that are supplied through path
    // - typescript "discriminant"
    //   see: https://www.typescriptlang.org/docs/handbook/advanced-types.html

    const pathParams = endpoint.params || []; // tslint:disable-line
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
