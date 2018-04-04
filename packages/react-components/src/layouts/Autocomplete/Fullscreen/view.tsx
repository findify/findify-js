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
    document.querySelector('body')!.classList.remove(this.props.theme.bodyNoscroll)
    document.removeEventListener('keydown', this.handleEscapeKeypress)
  }

  componentDidMount() {
    this.setState({ isOpen: true })
    document.querySelector('body')!.classList.add(this.props.theme.bodyNoscroll)
    document.addEventListener('keydown', this.handleEscapeKeypress)
    this.input.current && this.input.current.focus()
  }

  handleCloseByUser = () => (
    this.setState({ isOpen: false })
  )

  handleInputChange = ({ target: { value }}) => {
    // update agent
    this.props.update('q', value)
  }

  render() {
    const { theme, meta, isMobile, suggestions, config, ...rest } = this.props
    return (
      <div className={theme.root} display-if={this.state.isOpen}>
        <div className={theme.backdrop} onClick={this.handleCloseByUser} />
        <div className={theme.header}>
          <Icon className={theme.searchIcon} name={'Search'} width={24} height={24} />
        </div>
        <div className={theme.inputWrapper}>
          <input ref={this.input} onChange={this.handleInputChange} placeholder={'What are you looking for?'} />
        </div>
        <div className={theme.suggestionsWrapper} display-if={suggestions && suggestions.size > 0}>
          <div className={theme.suggestionsContainer}>
            <h4 className={theme.typeTitle}>{config.getIn(['i18n', 'suggestionsTitle'])}</h4>
            <SearchSuggestions className={theme.searchSuggestions} {...rest} />
          </div>
        </div>
      </div>
    )
  }
}
