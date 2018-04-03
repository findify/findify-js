import { compose, setDisplayName, lifecycle, withPropsOnChange, withHandlers, withStateHandlers, defaultProps, withProps } from 'recompose'
import { spring } from 'react-motion'
import withTheme from 'helpers/withTheme'
import view from './view'
import theme from './style.css'

export default compose(
  setDisplayName('Drawer'),
  withTheme(theme),
  withProps(({ width }) => ({
    calculateWidth: () => (
      /\D/.test(width) ?
      document.body.clientWidth * (width.match(/\d*/) / 100) :
      width
    )
  })),
)(view)
