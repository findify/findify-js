import React from 'react';

export default ( { title, ...rest }) => (
<svg width={15} height={15} {...rest} viewBox="0 0 15 15">
    <title display-if={!!title}>{title}</title>
  <path d="M8 7V3H7v4H3v1h4v4h1V8h4V7H8z" fill="currentColor" fillRule="evenodd"/>
</svg>
)
