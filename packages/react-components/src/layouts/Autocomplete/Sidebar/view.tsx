import React from 'react'
import Drawer from 'components/common/Drawer'
import Icon from 'components/Icon'
import SearchSuggestions from 'components/autocomplete/SearchSuggestions'

export default class Sidebar extends React.Component {

  constructor(props) {
    super(props)
    this.state = { isOpen: false }
    this.input = React.createRef()
  }

  componentWillUnmount() {
    this.setState({ isOpen: false })
  }

  componentDidMount() {
    this.setState({ isOpen: true })
    this.input.current && this.input.current.focus()
  }

  handleCloseByUser = () => (
    this.setState({ isOpen: false })
  )

  handleInputChange = ({ target: { value }}) => {
    // update agent
    console.log('rv', value)
    this.props.update('q', value)
  }

  render() {
    const { theme, meta, isMobile, suggestions, config, ...rest } = this.props
    return (
      <Drawer isOpen={this.state.isOpen} width={isMobile ? '90%' : 300} onCloseByUser={this.handleCloseByUser}>
        <div className={theme.root}>
          <div className={theme.header}>
            <Icon className={theme.searchIcon} name={'Search'} width={24} height={24} />
          </div>
          <div className={theme.inputWrapper}>
            <input ref={this.input} onChange={this.handleInputChange} placeholder={'What are you looking for?'} />
          </div>
          <div className={theme.suggestionsContainer} display-if={suggestions && suggestions.size > 0}>
            <h4 className={theme.typeTitle}>{config.getIn(['i18n', 'suggestionsTitle'])}</h4>
            <SearchSuggestions className={theme.searchSuggestions} {...rest} />
          </div>
        </div>
      </Drawer>
    )
  }
}
