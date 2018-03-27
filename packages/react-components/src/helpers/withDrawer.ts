import Drawer from 'components/common/Drawer'
import { createFactory } from 'react'
import { createPortal } from 'react-dom'
import { withStateHandlers, defaultProps, compose, setDisplayName } from 'recompose'

const drawer = createFactory(Drawer)

export const withDrawer = (modalName, component, width) => BaseComponent => {
  const componentFactory = createFactory(component);
  const baseFactory = createFactory(BaseComponent);
  return compose(
    setDisplayName('withDrawer()'),
    defaultProps({ open: false, state: void 0 }),
    withStateHandlers(
      ({ isOpen, state }) => ({ isOpen, state }),
      {
        showModal: (s, { isOpen, showModal }) => (_name, state) => {
          if (modalName === _name) return ({ isOpen: true, state })
          if (showModal) showModal(_name);
          return s
        },
        hideModal: (s, { open, hideModal }) => (_name, state) => {
          if (modalName === _name) return ({ isOpen: false, state })
          if (hideModal) hideModal(_name);
          return s
        },
        onCloseByUser: (s, { onCloseByUser }) => (_name) => {
          if (modalName === _name) return ({ isOpen: false })
          if (onCloseByUser) onCloseByUser(_name)
          return s
        }
      }
    )
  )(({ state, renderTo, onCloseByUser, ...restProps }) => {
    const modalComponent = drawer({ ...restProps, onCloseByUser, state, modalName, width, key: 2, children: componentFactory({ ...restProps, state }) })
    return [
      baseFactory({ ...restProps, key: 1 }),
      renderTo ? createPortal(modalComponent, renderTo) : modalComponent
    ]
  })
}
