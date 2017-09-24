import * as React from 'react';

export function withMockup(key) {
  const Wrapper = require(`../mockups/${key}`).default;
  return BaseComponent =>
    Wrapper && <Wrapper key={key} Component={BaseComponent} />;
}
