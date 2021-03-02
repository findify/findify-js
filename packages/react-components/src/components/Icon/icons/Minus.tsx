import React from 'react';

export default ( { title, ...rest }) => (
<svg width={15} height={15} {...rest} viewBox="0 0 15 15">
  <title display-if={!!title}>{title}</title>
  <path d="M3 7h9v1H3z" fill="currentColor" fillRule="evenodd"/>
</svg>
)
