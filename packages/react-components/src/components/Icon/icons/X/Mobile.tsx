import React from 'react';

export default ( { title, ...rest }) => (
<svg width={13} height={13} {...rest} viewBox="0 0 13 13">
  <title display-if={!!title}>{title}</title>
  <path d="M5.816 6.5L0 12.316.684 13 6.5 7.184 12.316 13l.684-.684L7.184 6.5 13 .684 12.316 0 6.5 5.816.684 0 0 .684 5.816 6.5z" fill="currentColor" fillRule="evenodd"/>
</svg>
)
