import { createFactory } from 'react'
import { createPortal } from 'react-dom'
import { withStateHandlers, compose, setDisplayName } from 'recompose'
import Loadable from 'react-loadable';
import chunks from 'helpers/chunks';

const Drawer = Loadable({
  loader: chunks.components.drawer,
  loading: () => null 
})

const drawer = createFactory(Drawer);

const enhanced: any = (modalName) => compose(
  setDisplayName('withDrawer()'),
  withStateHandlers(
    { isOpen: false, state: {} },
    {
      showModal: (s, { showModal }) => (name) => {
        if (modalName === name) return ({ isOpen: true });
        if (showModal) showModal(name);
        return s
      },
      hideModal: (s, { hideModal }) => name => {
        if (modalName === name) return ({ isOpen: false });
        if (hideModal) hideModal(name);
        return s
      },
    }
  )
);

export const withDrawer = (modalName, modalComponent, { renderTo, ...options }: any = {}) => BaseComponent => {
  const componentFactory = createFactory(modalComponent);
  const baseFactory = createFactory(BaseComponent);
  return enhanced(modalName)(({ isOpen, ...props }: any) => [
    baseFactory({ ...props, key: 1 }),
    isOpen && createPortal(
      drawer({ ...props, options, name: modalName, children: componentFactory, key: 2 }),
      renderTo || document.body
    )
  ])
}
