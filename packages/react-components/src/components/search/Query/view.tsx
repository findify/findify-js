/**
 * @module components/search/Query
 */

import React from 'react';
import escape from 'lodash/escape';
import template from 'helpers/template';
import Text from 'components/Text';
import { IQuery, MJSConfiguration, MJSValue, ThemedSFCProps } from 'types';
import { Map } from 'immutable';

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
  const hasFilters = !!meta.get('filters');
  const tpls = config.getIn(['breadcrumbs', 'i18n'], Map());
  const q = escape(meta.get('q') as string);
  const total = meta.get('total');
  if (!q && !hasFilters) {
    return tpls.get('noQuery');
  }
  
  if (hasFilters && !q) {
    return template(tpls.get('showingEmpty'))(total);
  }
  
  if (meta.get('corrected_q')) {
    const text = template(tpls.get('showing'))(total);
    return `${text} "${escape(meta.get('corrected_q') as string)}". ${tpls.get('zeroResultsFor')} "${q}".`
  }

  if (meta.get('query_type') === 'or') {
    const text = template(tpls.get('showing'))('0');
    return `${text} "${q}". ${tpls.get('partialMatch')}`
  }
  
  const text = template(tpls.get('showing'))(total);
  return `${text} "${q}".`
}

const QueryView = ({ theme, ...props}: ThemedSFCProps & IGetContentProps) => (
  <Text primary uppercase className={theme.root} html={getContent(props)} />
)

export default QueryView;

