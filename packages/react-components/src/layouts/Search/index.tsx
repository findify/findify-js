/**
 * @module layouts/Search
 */

import React, { createElement } from 'react';
import { compose, withProps, withStateHandlers, setDisplayName, branch, withHandlers, renderNothing, lifecycle } from 'recompose';
import { connectItems } from '@findify/react-connect';
import withTheme from 'helpers/withTheme';
import withEvents from 'helpers/withEvents';
import withErrorHandler from 'helpers/withErrorHandler';
import { withDrawer } from "helpers/withDrawer";
import MobileFacets from 'components/search/MobileFacets';
import MobileSorting from 'components/search/MobileSorting';
import view from 'layouts/Search/view';
import styles from 'layouts/Search/styles.css';
import { debounce } from 'helpers/debounce';


const transform = {
  from: { transform: `translate3d(-100%, 0, 0)` },
  to: { transform: `translate3d(0%, 0, 0)` },
}

const Search = compose(
  setDisplayName('Search'),

  withTheme(styles),

  withErrorHandler,

  connectItems,

  branch(
    ({ items }) => !items.size,
    renderNothing
  ),

  Base => class extends React.Component<any, any> {
    constructor(props) {
      super(props);
      this.state = { whatever: -1 };
      this.update = debounce(this.update, 100);
    }

    componentDidMount() {
      window.addEventListener('resize', this.update)
    }

    componentWillUnmount() {
      window.removeEventListener('resize', this.update)
    }

    update = () =>
      this.setState({ whatever: Math.random() })

    render() {
      return <Base {...this.props} />
    }
  },

  withProps(({ config }) => ({
    isMobile: config.get('forceMobile') || window.innerWidth <= config.get('mobileBreakpoint'),
    filtersOnRight: config.get('filtersOnRight')
  })),

  branch(
    ({ isMobile }) => isMobile,
    compose(
      withProps({ theme: {} }),
      withDrawer('Filters', MobileFacets, transform),
      withDrawer('Sorting', MobileSorting, transform),
      withEvents({
        showMobileFacets: ({ showModal }) => () => showModal('Filters'),
        showMobileSort: ({ showModal }) => () => showModal('Sorting'),
        hideMobileFacets: ({ hideModal }) => () => hideModal('Filters'),
        hideMobileSort: ({ hideModal }) => () => hideModal('Sorting'),
      })
    )
  )
)(view);

export default process.env.HOT
  ? require('react-hot-loader').hot(module)(Search)
  : Search;
