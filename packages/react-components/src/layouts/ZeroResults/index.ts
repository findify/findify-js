import { compose, withProps } from 'recompose';
import { connectItems, connectQuery } from '@findify/react-connect';
import { escape } from 'lodash';
import view from './view';

export default compose(
  connectItems,
  withProps(({ meta, config, q }) => ({
    title: escape(q),
  }))
)(view);
