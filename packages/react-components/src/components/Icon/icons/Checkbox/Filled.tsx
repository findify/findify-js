import React from 'react';

export default ( { title, ...rest }) => (
<svg width={12} height={12} {...rest} viewBox="0 0 12 12">
  <title display-if={!!title}>{title}</title>
  <g fill="currentColor" fillRule="evenodd">
    <path d="M4.248 8.188L10.422 2l.826.826-7 7L1 6.578l.812-.826z"/>
    <path d="M0 0h12v12H0V0zm1 1v10h10V1H1z"/>
  </g>
</svg>
)
