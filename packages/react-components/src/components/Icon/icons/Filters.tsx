import React from 'react';

export default ( { title, ...rest }) => (
<svg width={17} height={16} {...rest} viewBox="0 0 17 16">
  <title display-if={!!title}>{title}</title>
  <g fill="currentColor" fillRule="evenodd">
    <rect x="2" width="1" height="5" rx=".5"/>
    <rect x="8" width="1" height="9" rx=".5"/>
    <rect x="14" width="1" height="3" rx=".5"/>
    <rect x="2" y="8" width="1" height="8" rx=".5"/>
    <rect x="8" y="12" width="1" height="4" rx=".5"/>
    <rect x="14" y="6" width="1" height="10" rx=".5"/>
    <path d="M2.5 8.5a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0-1a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm6 5a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0-1a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm6-5a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0-1a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" fillRule="nonzero"/>
  </g>
</svg>
)
