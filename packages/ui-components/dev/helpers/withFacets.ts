import { withReducer } from 'recompose';

const createValueUpdater = (facets, name) => next => [
  ...facets.map(facet => (facet.name !== name ? facet : next(facet))),
];

const getCategoryChanges = (values, changes) => {
  const hasKey = values.some(value => value.key === changes.key);
  if (hasKey) {
    return [
      ...values.map(
        value => (value.key !== changes.key ? value : { ...value, ...changes }),
      ),
    ];
  }
  return values;
};

const getRangeChanges = (values, changes) => {
  const hasKey = values.some(
    value => value.from === changes.from && value.to === changes.to,
  );
  if (!hasKey) return [...values, changes];
  return [
    ...values.map(
      value =>
        value.from !== changes.from && value.to !== changes.to
          ? value
          : changes,
    ),
  ];
};

const reducer = (state, { type, name, changes }) => {
  const updater = createValueUpdater(state, name);

  switch (type) {
    case 'category':
      return updater(facet => ({
        ...facet,
        values: getCategoryChanges(facet.values, changes),
      }));

    case 'range':
      return updater(facet => ({
        ...facet,
        values: getRangeChanges(facet.values, changes),
      }));

    default:
      return updater(facet => ({
        ...facet,
        values: [
          ...facet.values.map(
            value => (value.key !== changes.key ? value : changes),
          ),
        ],
      }));
  }
};

export const withFacets = withReducer(
  'facets',
  'onFacetsChange',
  reducer,
  props => props.facets,
);
