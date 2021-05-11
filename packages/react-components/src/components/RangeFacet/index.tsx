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
import { Immutable } from '@findify/store-configuration';
import styles from 'components/RangeFacet/styles.css';

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
}) => {
  const ref = useRef(null);

  const handleWrapperClick = useCallback(() => {
    if (ref.current) ref.current?.focus();
  }, [ref]);

  const handleKeyPress = useCallback((e) => {
    if (e.key === 'Enter') onBlur(e);
  }, []);

  useEffect(() => {
    if (ref.current) ref.current.value = null;
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
        ref={ref}
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
  const { config } = useConfig<Immutable.RecommendationConfig>();
  const translate = useTranslations();

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
      setState([value, to]);
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
      setState([from, value]);
    },
    [from, to]
  );

  const onSubmit = useCallback(() => {
    if (!from && !to) return;
    facet.setValue({ from, to });
    setState([]);
  }, [from, to]);

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
          precision={facetConfig.get('precision', 0)}
        />
        <Button className={theme.submit} onClick={onSubmit}>
          <Text primary uppercase>
            {translate('facets.submit')}
          </Text>
        </Button>
      </Grid>
    </div>
  );
};
