import { getFiltersOnPage } from '../filters';

const mock = 
describe('Filters', () => {
  document.body.innerHTML = `
    <div data-findify-filter='color' data-findify-filter-value="blue"/>
    <div data-findify-filter='range' data-findify-filter-value='[{ "from": 1, "to": 2}]'/>
    <div data-findify-filter='category' data-findify-filter-value="category1 > category2" />
  `
  it('Should find filters on the page', () => {
    const filters = getFiltersOnPage(document);
    expect(filters[0]).toEqual({"name": "color", "values": [{"value": ["blue"]}]});
    expect(filters[1]).toEqual({"name": "range", "values": [{"from": 1, "to": 2}]});
    expect(filters[2]).toEqual({"name": "category", "values": [{"value": ["category1", "category2"]}]});
  })
})
