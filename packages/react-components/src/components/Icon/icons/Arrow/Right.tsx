import React from 'react';

export default ( { title, ...rest }) => (
<svg width={14} height={14} {...rest} viewBox="0 0 14 14">
  <title display-if={!!title}>{title}</title>
  <path d="M5 10.072L8.072 7 5 3.944 5.944 3l4 4-4 4z" fill="currentColor" fillRule="evenodd"/>
</svg>
)
