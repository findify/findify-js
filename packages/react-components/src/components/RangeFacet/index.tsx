/**
 * @module components/RangeFacet
 */

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import cx from 'classnames';

import MapArray from 'components/common/MapArray';
import Button from 'components/Button';
import Text from 'components/Text';
import { ThemedSFCProps, IFacet, MJSConfiguration } from 'types';
import Grid from 'components/common/Grid';
import Checkbox from 'components/common/Checkbox';
import content from 'components/RangeFacet/content';
import useTranslations from 'helpers/useTranslations';
import { useConfig } from '@findify/react-connect';
import { Immutable, Filter } from '@findify/store-configuration';
import styles from 'components/RangeFacet/styles.css';
import Loadable from 'react-loadable';
import chunks from 'helpers/chunks';

const Slider = Loadable({
  loader: chunks.components.rangeSlider,
  loading: () => null,
});

export interface IRangeFacetProps extends ThemedSFCProps {
  /** Facet to extract values from */
  facet: IFacet;
  /** Facet config */
  config: MJSConfiguration;

  hidden: boolean;

  isMobile?: boolean;
}

const PriceInput = ({
  theme,
  currency,
  min,
  max,
  onBlur,
  resetOn,
  precision,
  reference,
}) => {
  const handleWrapperClick = useCallback(() => {
    if (reference.current) reference.current?.focus();
  }, [reference]);

  const handleKeyPress = useCallback((e) => {
    if (e.key === 'Enter') onBlur(e);
  }, []);

  useEffect(() => {
    if (reference.current) reference.current.value = null;
  }, [resetOn]);

  const step = useMemo(
    () =>
      precision
        ? `0.${Array.from({ length: precision }, (_, i) =>
            i + 1 === precision ? '1' : '0'
          ).join('')}`
        : '1',
    []
  );

  return (
    <div className={theme.inputWrap} onClick={handleWrapperClick}>
      <span className={theme.currency}>{currency}</span>
      <input
        type="number"
        inputMode="numeric"
        pattern="[0-9]*"
        className={theme.input}
        max={max}
        min={min}
        onBlur={onBlur}
        onKeyPress={handleKeyPress}
        ref={reference}
        step={step}
      />
      <div className={theme.border} />
    </div>
  );
};

export default ({
  theme = styles,
  config: facetConfig,
  facet,
  hidden,
  isMobile,
}: IRangeFacetProps) => {
  const { config } = useConfig<Immutable.Factory<Filter>>();
  const translate = useTranslations();
  const minInput = useRef<HTMLInputElement>(null);
  const maxInput = useRef<HTMLInputElement>(null);

  const [[from, to], setState] = useState<string[]>([]);

  const [selectedItems, notSelectedItems] = useMemo(
    () => [
      facetConfig.get('pullSelected')
        ? facet.get('values').filter((i) => i.get('selected'))
        : facet.get('values'),
      facetConfig.get('pullSelected')
        ? facet.get('values').filter((i) => !i.get('selected'))
        : facet.get('values'),
    ],
    [facet]
  );

  /** Invoked when minimum range is changed */
  const onChangeMin = useCallback(
    (e) => {
      const _value = parseFloat(e.target.value);

      if (isNaN(_value)) return;
      const value = Number(
        _value > (to || facet.get('max'))
          ? to || facet.get('max')
          : _value < facet.get('min')
          ? facet.get('min')
          : _value
      ).toFixed(facetConfig.get('precision', 0));

      e.target.value = value;
      setState((s) => [value, s[1]]);
    },
    [from, to]
  );

  /** Invoked when maximum range is changed */
  const onChangeMax = useCallback(
    (e) => {
      const _value = parseFloat(e.target.value);
      if (isNaN(_value)) return;
      const value = Number(
        _value < (from || facet.get('min'))
          ? from || facet.get('min')
          : _value > facet.get('max')
          ? facet.get('max')
          : _value
      ).toFixed(facetConfig.get('precision', 0));

      e.target.value = value;
      setState((s) => [s[0], value]);
    },
    [from, to]
  );

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();
      if (!from && !to) return;
      facet.setValue({ from, to });
      setState([]);
      if (minInput.current && maxInput.current) {
        minInput.current.value = maxInput.current.value = '';
      }
    },
    [from, to]
  );

  const onSliderChange = useCallback(([min, max]) => {
    const range = facet.get('max') - facet.get('min');
    const minValue = ((range / 100) * min || facet.get('min')).toFixed(
      facetConfig.get('precision', 0)
    );
    const maxValue = ((facet.get('max') / 100) * max).toFixed(
      facetConfig.get('precision', 0)
    );

    if (minInput.current && maxInput.current) {
      minInput.current.value = minValue;
      maxInput.current.value = maxValue;
    }

    setState([minValue, maxValue]);
  }, []);

  return (
    <div
      className={theme.root}
      id={`facet-${facet.get('name')}`}
      role="region"
      hidden={hidden}
    >
      <MapArray
        display-if={facetConfig.get('pullSelected')}
        array={selectedItems}
        factory={Checkbox}
        content={content}
        config={config}
        isMobile={isMobile}
      />

      <MapArray
        array={notSelectedItems}
        factory={Checkbox}
        content={content}
        config={config}
        isMobile={isMobile}
      />

      <Grid
        wrapperComponent="form"
        onSubmit={onSubmit}
        columns="3|fit|3|auto"
        className={cx(theme.range, theme.inputBlock)}
      >
        <PriceInput
          theme={theme}
          currency={config.getIn(['currency', 'symbol'])}
          max={to}
          min={facet.get('min')}
          resetOn={facet}
          onBlur={onChangeMin}
          reference={minInput}
          precision={facetConfig.get('precision', 0)}
        />

        <div className={theme.divider}>-</div>

        <PriceInput
          theme={theme}
          currency={config.getIn(['currency', 'symbol'])}
          min={from}
          max={facet.get('max')}
          resetOn={facet}
          onBlur={onChangeMax}
          reference={maxInput}
          precision={facetConfig.get('precision', 0)}
        />
        <Button className={theme.submit} type="submit" onClick={onSubmit}>
          <Text primary uppercase>
            {translate('facets.submit')}
          </Text>
        </Button>
      </Grid>
      <Slider
        display-if={config.get('slider')}
        className={theme.slider}
        thumbClassName={theme.thumb}
        trackClassName={theme.track}
        defaultValue={[0, 100]}
        onChange={onSliderChange}
      />
    </div>
  );
};
