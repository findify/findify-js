import React from 'react';

export default ( { title, ...rest }) => (
<svg width={11} height={19} {...rest} viewBox="0 0 11 19">
  <title display-if={!!title}>{title}</title>
  <path d="M3.064 9.507L11 1.539 9.468 0 0 9.507 9.454 19l1.532-1.539z" fill="currentColor"/>
</svg>
)
