/**
 * @module components/autocomplete/Layout
 */
import { Fragment, useMemo } from 'react';
import Products from 'components/autocomplete/Products';
import Suggestions from 'components/autocomplete/Suggestions';
import Content from 'components/autocomplete/Content';
import { useAutocompleteLogic } from 'layouts/Autocomplete/withAutocompleteLogic';
import Grid from 'components/common/Grid';
import { Immutable } from '@findify/store-configuration';
import { useRef } from 'react';

export interface LayoutProps {
  config: Immutable.AutocompleteConfig;
  className?: string;
  isTrendingSearches?: boolean;
}

const getContent = (type) =>
  ({
    suggestions: Suggestions,
    products: Products,
  }[type] || Content);

const Item = ({
  config,
  type,
  ...rest
}: {
  config: Immutable.AutocompleteConfig;
  type: 'products' | 'suggestions' | string;
  selectedSuggestion: number;
  isTrendingSearches?: boolean;
}) => {
  const [Content, _config] = useMemo(
    () => [
      getContent(type),
      config.merge(config.get(type) || config.getIn(['content', type])),
    ],
    []
  );

  console.log(type);
  return <Content type={type} config={_config} {...rest} />;
};

export default ({ config, className, isTrendingSearches }: LayoutProps) => {
  const { selectedSuggestion } = useAutocompleteLogic();
  const { current: layout } = useRef(config.get('layout'));

  return (
    <Grid
      className={className}
      columns={config.getIn(['breakpoints', 'layout'])}
    >
      {layout.map((content, column) => (
        <Fragment key={`column-${String(column)}`}>
          {content.map((type) => (
            <Item
              key={type}
              type={type}
              config={config}
              selectedSuggestion={selectedSuggestion}
              isTrendingSearches={isTrendingSearches}
            />
          ))}
        </Fragment>
      ))}
    </Grid>
  );
};
