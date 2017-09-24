import * as jsdom from 'jsdom';

declare const global: {
  window: any;
  document: any;
};

function setupJsDom(onInit?) {
  jsdom.env({
    html: '<!DOCTYPE html><html><head></head><body></body></html>',
    features: {
      FetchExternalResources: ['script'],
      ProcessExternalResources: ['script'],
    },
    done: (err, window) => {
      global.window = window;
      global.document = window.document;

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
