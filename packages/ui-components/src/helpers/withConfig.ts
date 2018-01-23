import { createFactory } from 'react';
import { wrapDisplayName } from 'recompose';
import { merge } from 'lodash';

const withConfig: any = config => BaseComponent => {
  const factory = createFactory(BaseComponent);
  const WithConfig = ownerProps =>
    factory({ ...ownerProps, config: merge({}, config, ownerProps.config) });
  return WithConfig;
};

export default withConfig;
