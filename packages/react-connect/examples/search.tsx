import * as React from 'react';
import { create } from 'react-test-renderer';
// tslint:disable-next-line:import-name
import { Search, connectBreadcrumbs, connectItems, connectPagination, connectFacets } from '../src';

// tslint:disable-next-line:variable-name
const FilterValue = ({ item, shouldRemove }) => {
  // if (shouldRemove) item.resetValue()
  return <div />
}

// tslint:disable-next-line:variable-name
const Breadcrumbs = connectBreadcrumbs(({ update, filters }) => {
  const s = filters && filters.toJS();
  // update('filters', { color: ['white', 'blue']});
  return !!filters && filters.map((filter, index) => {
    return filter.get('values').map((item, i) => 
      <FilterValue key={item.hashCode()} item={item} shouldRemove={i}/>
    )
  });
});

// tslint:disable-next-line:variable-name
const Products = connectItems(({ items }) => {
  return !!items && items.map((item, index) => {
    const i = item;
    return <div key={item.hashCode()}>
      <h5>Title: { item.get('title') }</h5>
    </div>
  });
})

// tslint:disable-next-line:variable-name
const Pagination = connectPagination(({ pages, current, getPageProps }) => {
  return !!pages && pages.map((page, index) => {
    const props = getPageProps(page);
    if (page === 5) props.onClick()
    return <button {...props}>{page}</button>
  });
})

// tslint:disable-next-line:variable-name
const Facets = connectFacets(({ facets, current }) => {
  const s = facets && facets.toJS();
  return !!facets && facets.map((facet, index) => {
    const f = facet.toJS()
    return <button key={facet.hashCode()}>{facet.get('type')}</button>
  });
})

// tslint:disable-next-line:variable-name
const App = (
  <Search apiKey='8a2c6a1e-1aac-4047-8514-f284203c4b59'>
    <>
      <Facets />
      <Pagination />
      <Breadcrumbs />
      <Products />
    </>
  </Search>
);

create(App);
