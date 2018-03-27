import { compose, setDisplayName, lifecycle, withPropsOnChange, withHandlers, withStateHandlers, defaultProps, withProps } from 'recompose'
import { spring } from 'react-motion'
import withTheme from 'helpers/withTheme'
import theme from './style.css'
import view from './view'

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
  withStateHandlers(
    ({ isOpen }) => ({ open }),
    {
      openModal: () => () => ({ open: true  }),
      closeModal: () => () => ({ open: false })
    }
  ),
  withPropsOnChange(['isOpen'], ({ isOpen, openModal, closeModal }) => isOpen ? openModal() : closeModal()),
  withHandlers({
    onEscapeKeypress: ({ closeModal, onCloseByUser, modalName }) => (evt) => evt.key === 'Escape' && (closeModal() || onCloseByUser(modalName)),
    onBackdropClick: ({ closeModal, onCloseByUser, modalName }) => () => closeModal() || onCloseByUser(modalName)
  }),
  lifecycle({
    componentWillMount() {
      document.querySelector('body')!.classList.add(this.props.theme.bodyNoscroll)
      document.addEventListener('keydown', this.props.onEscapeKeypress)
    },
    componentWillUnmount() {
      document.querySelector('body')!.classList.remove(this.props.theme.bodyNoscroll)
      document.removeEventListener('keydown', this.props.onEscapeKeypress)
    }
  }),
  withProps(({ width }) => ({
    willEnter: () => ({ opacity: 0, left: -1 * width }),
    willLeave: () => ({ opacity: spring(0), left: spring(-1 * width) })
  })),
  withPropsOnChange(['open'], ({ children, open }) => ({ children: open && children || [] }))
)(view)
