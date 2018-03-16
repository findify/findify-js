import React from 'react';
export default ({ config, theme }) =>
  <div display-if={config.get('poweredByFindify')} className={theme.root}>
    Powered by Findify
  </div>
