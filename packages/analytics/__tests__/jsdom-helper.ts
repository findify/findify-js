import * as jsdom from 'jsdom';

declare const global: {
  window: any;
  document: any;
};

function setupJsDom(onInit?) {
  jsdom.env({
    html: '<!DOCTYPE html><html><head></head><body></body></html>',
    url: 'http://jsdom-url.com',
    document: {
      referrer: 'http://jsdom-referrer-url.com',
    },
    features: {
      FetchExternalResources: ['script', 'img'],
      ProcessExternalResources: ['script'],
    },
    done: (err, window) => {
      global.window = window;
      global.document = global.window.document;

      if (onInit) {
        onInit();
      }
    },
  });
}

function teardownJsDom() {
  delete global.window;
  delete global.document;
}

export { setupJsDom, teardownJsDom };
