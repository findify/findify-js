import { Immutable } from '@findify/store-configuration';
import createConnect from './createConnect';

type Sort = {
  onChangeSort: (field?: string, order?: string) => void;
  selected: Immutable.Factory<{
    field: string;
    order: string;
  }>;
};
/**
 * Used to extract sorting information from Search API response and provide the handler,
 * to modify it further in components
 */
const { hook, connect } = createConnect<Sort>({
  field: 'meta:sort',
  mapProps: (props) => ({ selected: props && props.get('0') }), // field: string, order: string
  handlers: {
    onChangeSort: ({ update }) => (field?: string, order?: string) =>
      !field ? update('sort') : update('sort', [{ field, order }]),
  },
});

export { hook, connect };
