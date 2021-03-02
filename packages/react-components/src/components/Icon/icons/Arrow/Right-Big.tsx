import React from 'react';

export default ( { title, ...rest }) => (
<svg width={11} height={19} {...rest} viewBox="0 0 11 19">
  <title display-if={!!title}>{title}</title>
  <path d="M7.936 9.507L0 1.539 1.532 0 11 9.507 1.546 19 .014 17.461z" fill="currentColor"/>
</svg>
)
