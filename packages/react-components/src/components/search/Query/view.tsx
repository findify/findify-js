import React from 'react';
import escape from 'lodash/escape';
import template from 'helpers/template';
import Text from 'components/Text';

const getContent = ({ query, config, meta }: any) => {
  if (!query.get('q') && !query.get('filters')) return config.getIn(['breadcrumbs', 'i18n', 'noQuery']);
  if (query.get('filters') && (!query.get('q') || query.get('q') === '')) return template(config.getIn(['breadcrumbs', 'i18n', 'showingEmpty']))(meta.get('total'));
  const total = template(config.getIn(['breadcrumbs', 'i18n', !query.get('q') || query.get('q') === '' ? 'showingEmpty' : 'showing']))(meta.get('total'));
  if (query.get('corrected_q')) {
    return <>{total}{ escape(query.get('q')) }{ config.getIn(['i18n', 'partialMatch']) }</>;
  }
  return <>{total} "{ escape(query.get('q')) }"</>
}

export default ({ theme, ...props}) =>
<Text primary uppercase className={theme.root}>
  { getContent(props) }
</Text>

