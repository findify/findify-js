import React from 'react'
import { CSSTransition } from 'react-transition-group'

const leftProp = (state, width) => {
  switch(state) {
    case 'exiting':
    case 'exited':
      return -1 * width + 'px'
    case 'entering':
    case 'entered':
      return 0
  }
}
export default class DrawerView extends React.Component {
  constructor(props) {
    super(props)
    this.state = { open: this.props.isOpen }
  }

  componentWillReceiveProps(nextProps, nextState) {
    if (nextProps.isOpen !== this.props.isOpen) this.setState({ open: nextProps.isOpen })
  }

  componentWillUpdate(_, { open }) {
    if (open) {
      document.querySelector('body')!.classList.add(this.props.theme.bodyNoscroll)
      document.addEventListener('keydown', this.handleEscapeKeypress)
      return
    }
    document.querySelector('body')!.classList.remove(this.props.theme.bodyNoscroll)
    document.removeEventListener('keydown', this.handleEscapeKeypress)
  }

  handleBackdropClick = () => {
    this.setState({ open: false })
    this.props.onCloseByUser(this.props.modalName)
  }

  handleEscapeKeypress = (evt) => {
    if (evt.key === 'Escape') this.setState({ open: false })
    this.props.onCloseByUser(this.props.modalName)
  }

  render() {
    const { modalName, theme, config, children, width, willEnter, willLeave } = this.props
    const transitionName = {
      enter: theme.exampleEnter,
      enterActive: theme.exampleEnterActive,
      leave: theme.exampleLeave,
      leaveActive: theme.exampleLeaveActive,
    }
    return (
      <React.Fragment>
        <CSSTransition
          in={this.state.open}
          timeout={600}
          classNames={{
            appear: theme.drawerAppear,
            enter: theme.drawerEnter,
            enterActive: theme.drawerEnterActive,
            enterDone: theme.drawerEnterDone,
            exit: theme.drawerExit,
            exitActive: theme.drawerExitActive
          }}
          unmountOnExit
        >
          {state => (
            <React.Fragment>
              <div className={theme.backdrop} onClick={this.handleBackdropClick}></div>
              <div className={theme.contentWrapper} style={{ width, left: leftProp(state, width) }}>
                <div className={theme.content}>
                  {children}
                </div>
              </div>
            </React.Fragment>
          )}
        </CSSTransition>
      </React.Fragment>
    )
  }
}
