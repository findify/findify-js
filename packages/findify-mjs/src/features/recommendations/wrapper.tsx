import * as React from 'react';

const getClassName = ({ slot, type }) =>
  `findify-recommendation findify-recommendation--slot_${slot} findify-recommendation--slot_${type}`;

export default ({ children, config }) => (
  <div className={getClassName(config)}>{children}</div>
);
