'use strict';

(function(win, doc) {
  function load(scripts, cb) {
    var complete = 0;
    var ref = doc.getElementsByTagName('script')[0];

    function append(src, index) {
      var script = doc.createElement('script');
      script.src = scripts[i];
      script.async = true;
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

  var config = __CONFIG__;
  var mainFile =
    config.useSimpleLoader || (config.platform && config.platform.magento)
      ? 'pure.js'
      : 'extended.js';
  var basePath = 'https://findify-assets-2bveeb6u8ag.netdna-ssl.com';
  var analyticsPath =
    basePath +
    '/analytics-js/__ENV__/findify-analytics.' +
    config.analyticsjs_version +
    '.min.js';
  var mjsPath =
    basePath + '/mjs/__ENV__/' + config.mjs_version + '/' + mainFile;
  var ravenPath = 'https://cdn.ravenjs.com/3.14.2/raven.min.js';
  var sentryKey = 'https://9fa0e9f3937c4758b446daad96b004be@sentry.io/158607';
  var analyticsIsNew = !!~config.analyticsjs_version.includes('2.0');
  var libs = [mjsPath, analyticsPath];

  win.__isMJSLoaded = win.__isMJSLoaded || false;
  if (win.__isMJSLoaded) return;

  if (!config.sentryDisabled) {
    libs.push(ravenPath);
  }

  return load(libs, function() {
    win.__isMJSLoaded = true;
    if (win.Raven) {
      win.Raven
        .config(sentryKey, {
          release: config.mjs_version,
          whitelistUrls: [mjsPath, analyticsPath],
        })
        .install();
      win.Raven.setUserContext({ key: config.api.key });
    }

    var analytics = analyticsIsNew
      ? win.FindifyAnalytics
      : win.FindifyAnalytics.init;

    var client = analytics({
      key: config.api.key,
      platform: config.platform,
      events: config.analytics,
    });

    config.api.user = analyticsIsNew ? client.user : client.getUser();

    win.findifyMJS.init(config, client);
  });
})(window, document);
