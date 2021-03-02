import React from 'react';

export default ( { title, ...rest }) => (
<svg width={14} height={14} {...rest} viewBox="0 0 14 14">
  <title display-if={!!title}>{title}</title>
  <g fill="currentColor" fillRule="evenodd">
    <path d="M5.248 9.188L11.422 3l.826.826-7 7L2 7.578l.812-.826z"/>
    <path d="M0 0h14v14H0V0zm1 1v12h12V1H1z"/>
  </g>
</svg>
)
