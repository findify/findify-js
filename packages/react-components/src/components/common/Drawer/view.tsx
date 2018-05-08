import React from 'react';
import { Spring, config } from 'react-spring';
import cx from 'classnames';

export default class DrawerView extends React.Component<any, any> {
  state = { open: false };

  static defaultProps = {
    options: {
      from: { transform: `translate3d(-100%, 0, 0)` },
      to: { transform: `translate3d(0%, 0, 0)` },
    }
  }

  componentDidMount() {
    document.querySelector('body')!.classList.add(this.props.theme.bodyNoScroll);
    document.addEventListener('keydown', this.handleEscapeKeypress);
    requestAnimationFrame(() => {
      this.setState({ open: true })
    })
  }

  componentWillUnmount() {
    document.querySelector('body')!.classList.remove(this.props.theme.bodyNoScroll)
    document.removeEventListener('keydown', this.handleEscapeKeypress)
  }

  close = () => {
    const { hideModal, name } = this.props;
    this.setState({ open: false }, () => setTimeout(() => hideModal(name), 400));
  }

  handleEscapeKeypress = (evt) => {
    if (evt.key !== 'Escape') return;
    this.close()
  }

  render() {
    const { open } = this.state;
    const { theme, options, children, ...rest } = this.props;
    return (
      <Spring
        from={{ opacity: 0 }}
        to={{ ...(open ? options.to : options.from), opacity: open ? 1 : 0  }}
        config={config[options.easing || 'default']}
      >
      {
        ({ opacity, ...style }) =>
          <>
            <div className={theme.backdrop} onClick={this.close} style={{ opacity }} />
            <div className={cx(theme.content, options.className)} style={style}>
              {
                children instanceof Function
                ? children({ ...rest, hideModal: this.close })
                : children
              }
            </div>
          </>
      }
      </Spring>
    )
  }
}
