/**
 * Defines the current user,
 * which gives just enough information to enable personalization.
 * User object has two properties that are required: `uid` and `sid`.
 */
export interface User {
  /**
   * This is a unique identifier of the user across multiple sessions.
   * You can store the uid in the cookie or get it from any other source (like a database).
   * It must uniquly identify the user.
   * */
  uid: string;
  /**
   * A unique session identifier,
   * the best is to store the value in a cookie on the client side,
   * with a TTL of 30 minutes or use a session ID that your platform provides.
   */
  sid: string;
  /**
   * The email from the user, if the user is logged in.
   * Providing an email allows us to track the user across
   * devices and give them relevant personalized results.
   */
  email?: string;
  /**
   * Not required in browser environment.
   * By default we get the ip from the request that we receive.
   * If call is made not from the user's browser,
   * please include the relevant user ip in the request.
   */
  ip?: string;
  /**
   * Not required in browser environment.
   * By default we get the user agent from the request that we receive.
   * If call is made not from the user's browser,
   * please include the relevant user user agent in the request.
   */
  ua?: string;
  /**
   * Not required in browser environment.
   * By default we get the user languages from the request that we receive.
   * If call is made not from the user's browser,
   * please include the relevant user user languages in the request.
   *
   * You can use either an ISO 639-1 language format code or
   * include the locale code: en-GB.
   */
  lang?: string[];
}
