/**
 * @module components/search/DesktopFacets
 */

import Text from 'components/Text';
import Icon from 'components/Icon';
import Button from 'components/Button';
import { ThemedSFCProps } from 'types';
import { Map } from 'immutable';
import styles from 'components/search/DesktopFacets/styles.css';
import useTranslations from 'helpers/useTranslations';

/** Props that hidable facet titles accept */
export interface IHidableProps extends ITitlesProps {
  /** Method to hide facets */
  onHide: () => any;
}

/** Props that facet titles accept */
export interface ITitlesProps extends ThemedSFCProps {
  /** MJS API Response Metadata */
  meta: Map<string, any>;
  /** Method to reset facets */
  onReset: (e: Event) => void;

  hidable: boolean;
}

export default ({
  theme = styles,
  meta,
  onReset,
  onHide,
  hidable,
}: IHidableProps) => {
  const translate = useTranslations();
  return (
    <div className={theme.header} tabIndex={-1}>
      <Icon
        name="Filters"
        title={translate('facets.filters')}
        className={theme.icon}
      />
      <Text primary uppercase className={theme.title}>
        {translate('facets.filters')}
        <Button
          tabIndex={-1}
          onClick={onReset}
          display-if={meta.get('filters') && meta.get('filters').size}
        >
          <Text secondary uppercase style={{ marginLeft: 5 }}>
            ({translate('facets.clearAll')})
          </Text>
        </Button>
      </Text>
      <Button
        display-if={hidable}
        tabIndex={-1}
        className={theme.hide}
        onClick={onHide}
      >
        <Text secondary uppercase>
          {translate('facets.hide')}
          <Icon name="XDark" title="Hide filters" />
        </Text>
      </Button>
    </div>
  );
};
