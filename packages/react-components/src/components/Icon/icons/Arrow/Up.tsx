import React from 'react';

export default ( { title, ...rest }) => (
<svg width={14} height={14} {...rest} viewBox="0 0 14 14">
  <title display-if={!!title}>{title}</title>
  <path d="M10.056 9.944L7 6.872 3.944 9.944 3 9l4-4 4 4z" fill="currentColor" fillRule="evenodd"/>
</svg>
)
