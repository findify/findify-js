import { getFiltersOnPage } from '../filters';

const mock = 
describe('Filters', () => {
  document.body.innerHTML = `
    <div data-findify-filter='color' data-findify-filter-value="blue"/>
    <div data-findify-filter='range' data-findify-filter-value='[{ "from": 1, "to": 2}]'/>
    <div data-findify-filter='category' data-findify-filter-value="category1 > category2" />
    <div data-findify-filter='price' data-findify-filter-type='range' data-findify-filter-value='[{ "from": 100 }]' />
  `
  it('Should find filters on the page', () => {
    const filters = getFiltersOnPage(document);
    expect(filters[0]).toEqual({"name": "color", "values": [{"value": ["blue"]}], action: 'include'});
    expect(filters[1]).toEqual({"name": "range", "values": [{"from": 1, "to": 2}], action: 'include'});
    expect(filters[2]).toEqual({"name": "category", "values": [{"value": ["category1", "category2"]}], action: 'include'});
    expect(filters[3]).toEqual({"name": "price", "type": "range", "values": [{"from": 100}], action: 'include'});
  })
})
