import React from 'react';
import { withHandlers } from 'recompose';
import Button from 'components/Button';
import Text from 'components/Text';
import Icon from 'components/Icon';
import MapArray from 'components/common/MapArray';

const Item = withHandlers({
  onClick: ({ onClick, index }) => () => onClick(index)
})(({ item, theme, onClick }: any) =>
  <Button onClick={onClick} disabled={item.get('selected')} className={theme.item}>
    <Text primary uppercase>
      <Icon name={item.get('selected') ? 'RadioFilled' : 'RadioEmpty'} />
      { item.get('label') }
    </Text>
  </Button>
)
export default ({ theme, style, hideModal, config, items, setSorting }) =>
<div className={theme.root} style={style}>
  <div className={theme.header}>

    <div className={theme.title}>
      <Text primary uppercase>
        { config.getIn(['sorting', 'i18n', 'sorting'], 'Sorting') }
      </Text>
    </div>

    <Button onClick={hideModal} >
      <Icon name='ArrowBack' />
    </Button>
  </div>

  <div className={theme.body}>
    <MapArray
      onClick={setSorting}
      theme={theme}
      array={items}
      factory={Item}
    />
  </div>

  <Button className={theme.footer} onClick={hideModal}>
    { config.getIn(['facets', 'i18n', 'showResults'], 'See results')}
  </Button>
</div>
