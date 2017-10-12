import * as React from 'react';
import { Column, Props as ColumnProps } from '../Column';
import Grid from '..';

describe('<Column />', () => {
  it('render correctly', () => {
    const properties: ColumnProps[] = [
      {},
      { className: 'foo' },
      { className: 'foo', columnClass: 'bar' },
      { columnClass: 'bar' },
      { columnStyle: { overflow: 'hidden' } },
      {
        className: 'foo',
        columnClass: 'bar',
        columnStyle: {
          padding: 2,
          margin: 14,
        },
      },
    ];
    properties.forEach((props: ColumnProps) => {
      const component = render(Column(props));
      expect(component).toMatchSnapshot();
    });
  });
});

describe('<Grid />', () => {
  describe('with only single column', () => {
    it('renders correctly', () => {
      const style = { margin: -12, color: '#ffa' };
      const component = render(
        <Grid columns="2" className="foo" style={style}>
          <div>foo</div>
          <div>bar</div>
        </Grid>
      );
      expect(component).toMatchSnapshot();
    });
  });

  describe('with multiple columns separated by |', () => {
    it('renders correctly', () => {
      const cols = ['2|3', '4|5|6', '2|2|3|3|4'];
      cols.forEach((columns: string) => {
        const component = render(
          <Grid columns={columns} className="custom-wrapper">
            <div>foo</div>
            <div>bar</div>
            <div>baz</div>
          </Grid>
        );
        expect(component).toMatchSnapshot();
      });
    });
  });
});
