import React from 'react';

export default ( { title, ...rest }) => (
<svg width={14} height={14} {...rest} viewBox="0 0 14 14">
  <title display-if={!!title}>{title}</title>
  <path d="M9.944 3.928L6.872 7l3.072 3.056L9 11 5 7l4-4z" fill="currentColor" fillRule="evenodd"/>
</svg>
)
