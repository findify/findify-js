/**
 * @module components/search/Query
 */

import { useQuery } from '@findify/react-connect';
import styles from 'components/search/Query/styles.css';

import escape from 'lodash/escape';
import Text from 'components/Text';
import useTranslations from 'helpers/useTranslations';
import { memo } from 'react';

const getContent = (meta, translate) => {
  const hasFilters = !!meta.get('filters');
  const q = escape(meta.get('q') as string);
  const total = meta.get('total');

  if (!q && !hasFilters) {
    return translate('search.noQuery');
  }

  if (hasFilters && !q) {
    return translate('search.showingEmpty', total);
  }

  if (meta.get('corrected_q')) {
    const text = translate('search.showing', total);
    return `${text} "${escape(meta.get('corrected_q') as string)}". ${translate(
      'search.zeroResultsFor'
    )} "${q}".`;
  }

  if (meta.get('query_type') === 'or') {
    const text = translate('search.showing', '0');
    return `${text} "${q}". ${translate('search.partialMatch')}`;
  }

  const text = translate('search.showing', total);
  return `${text} "${q}".`;
};

export default memo(
  ({ theme = styles }: { theme?: Record<string, string> }) => {
    const { meta } = useQuery();
    const translate = useTranslations();
    return (
      <Text
        primary
        uppercase
        className={theme.root}
        html={getContent(meta, translate)}
      />
    );
  }
);
