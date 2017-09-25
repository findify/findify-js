import * as React from 'react';
import { withFacets } from '../helpers/withFacets';

const props = {
  isOpen: true,
  label: 'Kategori',
  type: 'category',
  name: 'Kategori',
  onChange: console.log,
  config: {
    maxItemsCount: 3,
    rowHeight: 20,
    i18n: {
      goBackTitle: 'Alla kategorier',
      more: 'Show more',
      less: 'Less',
    },
  },
};

export const values = [
  {
    selected: true,
    count: 895,
    has_children: true,
    value: 'Material',
    name: 'category1',
    children: [
      {
        selected: true,
        count: 340,
        has_children: true,
        value: 'Aluminiummöbler',
        name: 'category2',
        children: [
          {
            selected: false,
            count: 108,
            has_children: false,
            value: 'Matbord',
            name: 'category3',
          },
          {
            selected: false,
            count: 65,
            has_children: false,
            value: 'Stolar Med Karm',
            name: 'category3',
          },
          {
            selected: false,
            count: 36,
            has_children: false,
            value: 'Soffbord',
            name: 'category3',
          },
          {
            selected: false,
            count: 35,
            has_children: false,
            value: 'Stolar Utan Karm',
            name: 'category3',
          },
          {
            selected: false,
            count: 29,
            has_children: false,
            value: 'Sidobord',
            name: 'category3',
          },
          {
            selected: false,
            count: 23,
            has_children: false,
            value: 'Positionsstolar',
            name: 'category3',
          },
          {
            selected: false,
            count: 15,
            has_children: false,
            value: 'Solvagnar & Vilsängar',
            name: 'category3',
          },
          {
            selected: false,
            count: 11,
            has_children: false,
            value: 'Cafébord',
            name: 'category3',
          },
          {
            selected: false,
            count: 8,
            has_children: false,
            value: 'Solstolar & Baden-baden',
            name: 'category3',
          },
        ],
      },
      {
        selected: false,
        count: 265,
        has_children: true,
        value: 'Konstrottingmöbler',
        name: 'category2',
      },
      {
        selected: false,
        count: 236,
        has_children: true,
        value: 'Teakmöbler',
        name: 'category2',
      },
      {
        selected: false,
        count: 57,
        has_children: true,
        value: 'Plastmöbler',
        name: 'category2',
      },
      {
        selected: false,
        count: 30,
        has_children: false,
        value: 'Matbord',
        name: 'category2',
      },
      {
        selected: false,
        count: 2,
        has_children: false,
        value: 'Soffbord',
        name: 'category2',
      },
      {
        selected: false,
        count: 1,
        has_children: false,
        value: 'Cafébord',
        name: 'category2',
      },
    ],
  },
  {
    selected: false,
    count: 2007,
    has_children: true,
    value: 'Utemöbler',
    name: 'category1',
  },
  {
    selected: false,
    count: 666,
    has_children: true,
    value: 'Dynor',
    name: 'category1',
  },
  {
    selected: false,
    count: 90,
    has_children: false,
    value: 'Kollektioner',
    name: 'category1',
  },
  {
    selected: false,
    count: 48,
    has_children: true,
    value: 'Trädgårdsgrupper',
    name: 'category1',
  },
  {
    selected: false,
    count: 36,
    has_children: false,
    value: 'Outlet',
    name: 'category1',
  },
];

export default ({ Component }) => {
  const Base: any = withFacets(Component);
  return (
    <div style={{ margin: 50, width: 400, position: 'relative' }}>
      <Base {...props} values={values} />
    </div>
  );
};
