'use strict';

(function(win, doc) {
  win.__isMJSLoaded = win.__isMJSLoaded || false;
  if (win.__isMJSLoaded) return;

  /**
   * Set "mjsPath" in localStorage to debug new versions in store
   */
  function getMJSDevVersion() {
    try {
      return localStorage.getItem('mjsPath');
    } catch (e) {
      return null;
    }
  }

  function load(scripts, cb) {
    var complete = 0;
    var ref = doc.getElementsByTagName('script')[0];

    function append(src, index) {
      var script = doc.createElement('script');
      var isAsync = !~src.indexOf('polyfill');
      script.src = scripts[i];
      script.async = isAsync;
      script.defer = isAsync;
      script.crossorigin = 'anonymous';
      ref.parentNode.insertBefore(script, ref);
      script.onload = function() {
        complete++;
        if (complete === scripts.length) cb();
        return;
      };
      return script;
    }
    for (var i = 0; i < scripts.length; i++) append(i);
    return;
  }

  (function() {
    try {
      __MJS_API_SCRIPT_STRING__;
    } catch (e) {
      console.warn('Error in Findify MJS Script injection:', e);
    }
  })();

  var libs = [];
  var basePath = 'https://findify-assets-2bveeb6u8ag.netdna-ssl.com';
  var sentryKey = 'https://9fa0e9f3937c4758b446daad96b004be@sentry.io/158607';
  var config = __CONFIG__;
  var analyticsIsNew =
    !!~config.analyticsjs_version.indexOf('2.0') ||
    !!~config.analyticsjs_version.indexOf('3.');

  /**
   * Include polyfill
   */
  if (
    (!win._babelPolyfill && config.useSimpleLoader) ||
    (config.platform && config.platform.magento)
  ) {
    libs.push('https://cdn.polyfill.io/v2/polyfill.min.js');
  }

  /**
   * @findify/analytics-js from CDN
   */
  libs.push(
    basePath +
      '/analytics-js/__ENV__/' +
      (!!~config.analyticsjs_version.indexOf('3.')
        ? config.analyticsjs_version + '/findify-analytics.min.js'
        : 'findify-analytics.' + config.analyticsjs_version + '.min.js')
  );

  /**
   * @findify/mjs from CDN
   */
  libs.push(
    getMJSDevVersion() ||
      basePath + '/mjs/__ENV__/' + config.mjs_version + '/pure.js'
  );

  /**
   * Include sentry if not disabled
   */
  if (!config.sentryDisabled) {
    libs.push('https://cdn.ravenjs.com/3.19.1/raven.min.js');
  }

  return load(libs, function() {
    win.__isMJSLoaded = true;

    /**
     * Initialize Sentry
     */
    if (win.Raven) {
      win.Raven
        .config(sentryKey, {
          release: config.mjs_version,
          whitelistUrls: libs,
        })
        .install();
      win.Raven.setUserContext({ key: config.api.key });
    }

    /**
     * Initialize analytics
     */
    var analytics = analyticsIsNew
      ? win.FindifyAnalytics
      : win.FindifyAnalytics.init;

    var client = analytics({
      key: config.api.key,
      platform: config.platform || {},
      events: config.analytics || {},
    });

    config.api.user = analyticsIsNew ? client.user : client.getUser();

    win.findifyMJS.init(config, client);
    win.findifyAnalyticsInstance = client;
  });
})(window, document);
