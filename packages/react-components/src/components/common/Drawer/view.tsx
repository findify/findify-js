import React from 'react'
import { Motion, TransitionMotion, spring } from 'react-motion'

export default ({
    modalName,
    theme,
    config,
    onBackdropClick,
    onEscapeKeypress,
    children,
    width,
    willEnter,
    willLeave,
}) => (
  <TransitionMotion
    willEnter={willEnter}
    willLeave={willLeave}
    defaultStyles={[ {
      key: modalName,
      style: { opacity: 0, left: -1 * width,
    }}]}
    styles={
      React.Children.toArray(children).length > 0 && [{
        key: modalName,
        style: {
          opacity: spring(1),
          left: spring(0)
        }
      }] || []
    }>
      {(interpolated) => {
        if (!interpolated.length) return null
        const { key, style, data } = interpolated[0]
        return (
          <div key={key}>
            <div className={theme.backdrop} onClick={onBackdropClick} style={{ opacity: style.opacity }}></div>
            <div className={theme.contentWrapper} style={{ left: style.left + 'px', width: width + 'px' }}>
              <div className={theme.content}>
                {children}
              </div>
            </div>
          </div>
        )
      }}
    </TransitionMotion>
)
