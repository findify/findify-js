import React from 'react';
import Button from 'components/Button';
import Icon from 'components/Icon';

export default ({ theme, onClick, selected }: any) => (
  <Button className={theme.root}onClick={onClick}>
    <Icon
      name={selected ? 'CheckboxFilled' : 'CheckboxEmpty'}
      title={selected ? 'Product in bundle' : 'Add to bundle'}
    />
  </Button>
)
