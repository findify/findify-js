import React from 'react';

export default ( { title, ...rest }) => (
<svg width={14} height={14} {...rest} viewBox="0 0 14 14">
  <title display-if={!!title}>{title}</title>
  <path d="M7 14A7 7 0 1 1 7 0a7 7 0 0 1 0 14zm0-1A6 6 0 1 0 7 1a6 6 0 0 0 0 12z" fill="currentColor" fillRule="evenodd"/>
</svg>
)
