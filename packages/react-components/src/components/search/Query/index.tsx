/**
 * @module components/search/Query
 */

import { useQuery } from '@findify/react-connect';
import styles from 'components/search/Query/styles.css';

import escape from 'lodash/escape';
import Text from 'components/Text';
import useTranslations from 'helpers/useTranslations';

const getContent = (meta, t) => {
  const hasFilters = !!meta.get('filters');
  const q = escape(meta.get('q') as string);
  const total = meta.get('total');

  if (!q && !hasFilters) {
    return t('noQuery');
  }

  if (hasFilters && !q) {
    return t('showingEmpty', total);
  }

  if (meta.get('corrected_q')) {
    const text = t('showing', total);
    return `${text} "${escape(meta.get('corrected_q') as string)}". ${t(
      'zeroResultsFor'
    )} "${q}".`;
  }

  if (meta.get('query_type') === 'or') {
    const text = t('showing', '0');
    return `${text} "${q}". ${t('partialMatch')}`;
  }

  const text = t('showing', total);
  return `${text} "${q}".`;
};

export default ({ theme = styles }) => {
  const { meta } = useQuery();
  const t = useTranslations();
  return (
    <Text primary uppercase className={theme.root} html={getContent(meta, t)} />
  );
};
