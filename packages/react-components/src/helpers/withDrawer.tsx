import { createFactory, useCallback, useState } from 'react';
import { createPortal } from 'react-dom';
import Loadable from 'react-loadable';
import chunks from 'helpers/chunks';

const Drawer = Loadable({
  loader: chunks.components.drawer,
  loading: () => null,
});

export const withDrawer = (
  modalName,
  modalComponent,
  { renderTo, ...options }: any = {}
) => (BaseComponent) => {
  const componentFactory = createFactory(modalComponent);
  return (props) => {
    const [isOpen, setOpen] = useState(false);

    const _showModal = useCallback((name) => {
      if (modalName === name) return setOpen(true);
      props.showModal?.(name);
    }, []);

    const _hideModal = useCallback((name) => {
      if (modalName === name) return setOpen(false);
      props.hideModal?.(name);
    }, []);

    return (
      <>
        <BaseComponent
          {...props}
          showModal={_showModal}
          hideModal={_hideModal}
        />
        {isOpen &&
          createPortal(
            <Drawer
              {...props}
              options={options}
              name={modalName}
              children={componentFactory}
              showModal={_showModal}
              hideModal={_hideModal}
            />,
            renderTo || document.body
          )}
      </>
    );
  };
};
