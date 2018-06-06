/**
 * @module components/search/Query
 */

import React from 'react';
import escape from 'lodash/escape';
import template from 'helpers/template';
import Text from 'components/Text';
import { IQuery, MJSConfiguration, MJSValue, ThemedSFCProps } from 'types';
import { Map } from 'immutable'

/** Props that getContent method uses to build query text at the top of Search page */
export interface IGetContentProps {
  /** Search query */
  query: IQuery;
  /** MJS Configuration */
  config: MJSConfiguration;
  /** Additional MJS API request meta */
  meta: Map<string, MJSValue>;
}

const getContent = ({ query, config, meta }: IGetContentProps) => {
  const hasFilters = !!query.get('filters');
  if (!query.get('q') && !hasFilters) return config.getIn(['breadcrumbs', 'i18n', 'noQuery']);
  if (hasFilters && (!query.get('q') || query.get('q') === '')) return template(config.getIn(['breadcrumbs', 'i18n', 'showingEmpty']))(meta.get('total'));
  const total = template(config.getIn(['breadcrumbs', 'i18n', !query.get('q') || query.get('q') === '' ? 'showingEmpty' : 'showing']))(meta.get('total'));
  if (query.get('corrected_q')) {
    return <Text primary uppercase html={total + ' "' + escape(query.get('q') as string) + '". ' + config.getIn(['i18n', 'partialMatch'])} />
  }
  return <Text primary uppercase html={total + ' "' + escape(query.get('q') as string) + '"'} />
}

const QueryView = ({ theme, ...props}: ThemedSFCProps & IGetContentProps) =>
<Text primary uppercase className={theme.root}>
  { getContent(props) }
</Text>

export default QueryView;

