import { User } from '../common';
import * as Request from '../request';
import { Config } from '../client';
import { validatePresence, validateList, validateLineItems } from './common';

/*
 * These functions throws a human-readable errors,
 * that helps diagnose misconfiguration issues.
 */

const howToGetMerchantKey =
  `To get a Merchant API key you need to ` +
  `register with Findify and finish the onboarding process.`;

/**
 * Validate SDK config.
 * @param config SDK configuration options.
 * @param isBrowserEnv `true` if running in browser environment.
 * @throws Throws an error with a human-readable message in case of misconfiguration.
 */
export function validateConfig(config: Config, isBrowserEnv: boolean) {
  const { key, user, method, log } = config;

  validateAPIKey(key);
  if (
    typeof method !== 'undefined' &&
    !Object.values(Request.Method).includes(method)
  ) {
    throw new Error('"method" param should be either "post" or "jsonp"');
  }
  if (!isBrowserEnv && config.method === Request.Method.JSONP) {
    throw new Error('jsonp method is not allowed in node environment');
  }
  if (typeof log !== 'undefined' && typeof log !== 'boolean') {
    throw new Error('"log" param should be "boolean" type');
  }
}

function validateAPIKey(key: string) {
  if (key == null) {
    throw new Error(`"key" param is missing. ` + howToGetMerchantKey);
  }
  if (typeof key !== 'string') {
    throw new Error('"key" param should be a string. ' + howToGetMerchantKey);
  }
  if (key.trim().length < 1) {
    throw new Error(
      '"key" param can not be an empty or only-whitespace string. ' +
        howToGetMerchantKey
    );
  }
}

/**
 * Validate autocomplete request parameters.
 * @param params Autocomplete request parameters.
 * @throws Throws an error in case of invalid request parameters.
 */
export function validateAutocomplete(params: Request.Autocomplete.Params) {
}

/**
 * Validate search request parameters.
 * @param params Search request parameters.
 * @throws Throws an error in case of invalid request parameters.
 */
export function validateSearch(params: Request.Search.Params) {
  validatePresence('q', params.q);
  validateList(params);
}

/**
 * Validate smart collection request parameters.
 * @param params Smart collection request parameters.
 * @throws Throws an error in case of invalid request parameters.
 */
export function validateSmartCollection(
  params: Request.SmartCollection.Params
) {
  validatePresence('slot', params.slot);
  validateList(params);
}

/**
 * Validate recommendations request parameters.
 * @param params Recommendations request parameters.
 * @throws Throws an error in case of invalid request parameters.
 */
export function validateRecommendations(
  params: Request.Recommendations.Params
) {
  validatePresence('type', params.type);
  if (!Object.values(Request.Recommendations.Type).includes(params.type)) {
    throw new Error('Invalid "recommendation" type');
  }
  if (params.type === Request.Recommendations.Type.Slot) {
    validatePresence('slot', params.slot);
  }
  if (
    params.type === Request.Recommendations.Type.AlsoViewed ||
    params.type === Request.Recommendations.Type.AlsoBought
  ) {
    validatePresence('item_id', params.item_id);
  }
  if (
    params.type === Request.Recommendations.Type.FrequentlyPurchasedTogether
  ) {
    validatePresence('item_ids', params.item_ids);
  }
}

/**
 * Validate feedback request parameters.
 * @param params Feedback request parameters.
 * @throws Throws an error in case of invalid request parameters.
 */
export function validateFeedback(params: Request.Feedback.Params) {
  validatePresence('event', params.event);

  switch (params.event) {
    case Request.Feedback.Event.ClickSuggestion:
    case Request.Feedback.Event.Redirect:
      validatePresence('rid', params.rid);
      validatePresence('suggestion', params.suggestion);
      break;
    case Request.Feedback.Event.ClickItem:
    case Request.Feedback.Event.AddToCart:
      validatePresence('item_id', params.item_id);
      break;
    case Request.Feedback.Event.Purchase:
      validatePresence('order_id', params.order_id);
      validatePresence('currency', params.currency);
      validatePresence('revenue', params.revenue);
      validateLineItems(params.line_items);
      break;
    case Request.Feedback.Event.UpdateCart:
      validateLineItems(params.line_items);
      break;
    case Request.Feedback.Event.ViewPage:
      validatePresence('url', params.url);
      validatePresence('ref', params.ref);
      validatePresence('width', params.width);
      validatePresence('height', params.height);
      break;
    default:
      throw new Error('Invalid "event" type');
  }
}

/**
 * Validate user parameters.
 * @param user Current user identity info.
 * @throws Throws an error in case of invalid request parameters.
 */
export function validateUser(user?: User) {
  if (user == null) {
    throw new Error(
      '"user" param should be provided either at request or at library config'
    );
  }
  validatePresence('user.uid', user.uid);
  validatePresence('user.sid', user.sid);
}
