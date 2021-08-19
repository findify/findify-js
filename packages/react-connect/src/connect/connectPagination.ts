import { Range, Seq } from 'immutable';
import createConnect from './createConnect';

const getCurrent = (meta) =>
  Math.ceil(meta.get('offset') / meta.get('limit')) + 1;
/**
 * Used to extract pagination information from Search API response metadata
 * and pass it down further
 */

type Pagination = {
  /** All allowed page numbers */
  pages: Seq.Indexed<number>;
  /** Current page number */
  current: number;
  /** Returns
   * @property `key` of the page
   * @property `area-current` value for ADA
   * @property 'href`
   * @property `onClick` event handler
   */
  getPageProps: (
    page: number,
    options?: {
      href: boolean;
    }
  ) => {
    key: number;
    'area-current'?: 'page';
    href?: string;
    onClick: (e: Event) => void;
  };
};

const buildHref = (page, limit) => {
  const utils = (global as any).findify?.utils;
  const { origin, pathname } = document.location;
  if (!utils) return;
  return (
    origin +
    pathname +
    utils.buildQuery(
      {
        ...utils.getQuery(),
        offset: (page - 1) * limit,
      },
      true
    )
  );
};

const { hook, connect } = createConnect<Pagination>({
  field: 'meta',
  mapProps: (meta) => ({
    pages: meta && Range(1, Math.ceil(meta.get('total') / meta.get('limit'))),
    current: (meta && getCurrent(meta)) || 1,
  }),
  handlers: {
    getPageProps: ({ update, meta }) => (page, { href = true } = {}) => ({
      key: page,
      'area-current': getCurrent(meta) === page ? 'page' : undefined,
      href: href && buildHref(page, meta.get('limit')),
      onClick: (e) => {
        if (e) e.preventDefault();
        update('offset', (page - 1) * meta.get('limit'));
      },
    }),
  },
});

export { hook, connect };
