import React from 'react';
import { escape } from 'lodash';
import template from 'helpers/template';

const getContent = ({ query, config, meta }: any) => {
  if (!query.get('q') && !query.get('filters')) return config.getIn(['breadcrumbs', 'i18n', 'noQuery']);
  
  const total = template(config.getIn(['breadcrumbs', 'i18n', 'showing']))(meta.get('total'));
  if (query.get('corrected_q')) {
    return <>{total}{ escape(query.get('q')) }{ config.getIn(['i18n', 'partialMatch']) }</>;
  }
  return <>{total} <strong>"{ escape(query.get('q')) }"</strong></>
}

export default ({ theme, ...props}) =>
<div className={theme.root}>
  { getContent(props) }
</div>

