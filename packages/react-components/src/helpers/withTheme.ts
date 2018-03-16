import React from 'react'

export default function withTheme(defaultTheme) {
  return Component => {
    return class extends React.Component {
      constructor(props) {
        super(props)
        this.cachedTheme = Object.assign({}, defaultTheme, props.theme || {})
      }

      componentWillReceiveProps(nextProps) {
        if (this.props.theme !== nextProps.theme) {
          this.cachedTheme = Object.assign({}, defaultTheme, nextProps.theme || {})
        }
      }

      render() {
        return React.createElement(Component, {...this.props, theme: this.cachedTheme })
      }
    }
  }
}
