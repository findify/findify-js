import React from 'react';

export default ( { title, ...rest }) => (
<svg width={14} height={14} {...rest} viewBox="0 0 14 14">
  <title display-if={!!title}>{title}</title>
  <path d="M3.944 5L7 8.072 10.056 5l.944.944-4 4-4-4z" fill="currentColor" fillRule="evenodd"/>
</svg>
)
