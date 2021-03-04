/**
 * @module components/RangeFacet
 */

import React, { useCallback, useMemo, useRef } from 'react';
import cx from 'classnames';
import NumberInput from 'react-numeric-input';

import MapArray from 'components/common/MapArray';
import Button from 'components/Button';
import Text from 'components/Text';
import { ThemedSFCProps, IFacet, IFacetValue, MJSConfiguration } from 'types';
import { List } from 'immutable';
import Grid from 'components/common/Grid';
import Checkbox from 'components/common/Checkbox';
import content from 'components/RangeFacet/content';

/** Input default styling parameters */
const inputDefaults = {
  style: false,
  mobile: false,
};

export interface IRangeFacetProps extends ThemedSFCProps {
  /** Facet to extract values from */
  facet: IFacet;
  /** Facet values */
  items: List<IFacetValue>;
  /** MJS Configuration */
  config: MJSConfiguration;
  /** Currency symbol */
  currencySymbol: string;
  /** Minimum possible price */
  from: number;
  /** Maximum possible price */
  to: number;
  /** Invoked when maximum range is changed */
  onChangeMax: (evt?: React.ChangeEvent<any>) => any;
  /** Invoked when minimum range is changed */
  onChangeMin: (evt?: React.ChangeEvent<any>) => any;
  /** Invoked when any key in any input is pressed, used to react to Enter */
  onKeypressMin: (evt: any) => any
  onKeypressMax: (evt: any) => any
  /** Invoked when Go button is pressed */
  onPressButton: () => any;

  hidden: boolean;
}

const PriceInput = ({
  theme,
  currency,
  value,
  min,
  max,
  onBlur,
  onKeyPress,
  precision
}) => {
  const ref = useRef(null);
  const handleWrapperClick = useCallback(() => {
    if (ref.current) ref.current.refsInput.focus()
  }, [ref]);

  return (
    <div className={theme.inputWrap} onClick={handleWrapperClick}>
      <span className={theme.currency}>{currency}</span>
      <NumberInput
        {...inputDefaults}
        className={theme.input}
        precision={precision}
        value={value}
        max={max}
        min={min}
        onBlur={onBlur}
        onKeyPress={onKeyPress}
        ref={ref}
      />
      <div className={theme.border} />
    </div>
  )
}

export default ({
  theme,
  facet,
  items,
  config,
  currencySymbol,

  from,
  to,

  onChangeMax,
  onChangeMin,
  onKeypressMin,
  onKeypressMax,
  onPressButton,

  hidden
}: IRangeFacetProps) => {
  const [selectedItems, notSelectedItems] = useMemo(() => [
    config.get('pullSelected')
      ? items.filter(i => i.get('selected'))
      : items,
    config.get('pullSelected')
      ? items.filter(i => !i.get('selected'))
      : items
  ], [items]);

  return (
    <div className={theme.root} id={`facet-${facet.get('name')}`} role="region" hidden={hidden}>

      <MapArray
        display-if={config.get('pullSelected')}
        array={selectedItems}
        factory={Checkbox}
        content={content}
        config={config}
        theme={theme} />

      <MapArray
        array={notSelectedItems}
        factory={Checkbox}
        content={content}
        config={config}
        theme={theme} />

      <Grid columns='3|fit|3|auto' className={cx(theme.range, theme.inputBlock)}>
        <PriceInput
          theme={theme}
          currency={currencySymbol}
          precision={config.get('precision', 0)}
          value={from}
          max={to || facet.get('max')}
          min={facet.get('min')}
          onBlur={onChangeMin}
          onKeyPress={onKeypressMin}
        />
        <div className={theme.divider}>-</div>
        <PriceInput
          theme={theme}
          currency={currencySymbol}
          precision={config.get('precision', 0)}
          value={to}
          min={from || facet.get('min')}
          max={facet.get('max')}
          onBlur={onChangeMax}
          onKeyPress={onKeypressMax}
        />
        <Button onClick={onPressButton} className={theme.submit}>
          <Text primary uppercase>
            {config.getIn(['i18n', 'submit'])}
          </Text>
        </Button>
      </Grid>
    </div>
  )
}
