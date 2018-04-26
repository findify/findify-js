import React from 'react'

const filterRoot = (theme) => (
  Object
    .entries(theme)
    .filter(([key]) => key !== 'root')
    .reduce((previous, [key, value]) => (previous[key] = value, previous), {})
)

const getTheme = (props, defaultTheme) => {
  const themeFilter = props.themeRootOverride ? filterRoot : x => x
  return Object.assign({}, defaultTheme, themeFilter(props.theme || {}))
}

export default function withTheme(defaultTheme) {
  return Component => {
    return class extends React.Component {
      constructor(props) {
        super(props)
        this.cachedTheme = getTheme(this.props, defaultTheme)
      }

      componentWillReceiveProps(nextProps) {
        if (this.props.theme !== nextProps.theme) {
          this.cachedTheme = getTheme(this.props, defaultTheme)
        }
      }

      render() {
        return React.createElement(Component, {...this.props, theme: this.cachedTheme })
      }
    }
  }
}
