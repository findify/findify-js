import { compose, withState, withHandlers } from 'recompose';

export const withMeta = compose(
  withState('meta', 'setMeta', props => props.meta),
  withHandlers({
    onPageChange: ({ meta, setMeta }) => page =>
      setMeta({ ...meta, offset: meta.limit * page }),
    onSortChange: ({ meta, setMeta }) => ({ value }) =>
      setMeta({ ...meta, sort: { value } }),
    onBreadCrumbRemove: ({ meta, setMeta }) => facet =>
      setMeta({
        ...meta,
        filters: meta.filters.filter(filter => filter.name !== facet.name),
      }),
  }),
);
