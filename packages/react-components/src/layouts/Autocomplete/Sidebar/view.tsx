import React from 'react'
import Drawer from 'components/common/Drawer'
import Icon from 'components/Icon'
import SearchSuggestions from 'components/autocomplete/SearchSuggestions'
import * as events from 'helpers/emmiter';

export default class Sidebar extends React.Component {

  constructor(props) {
    super(props)
    this.state = { isOpen: false }
  }

  componentWillUnmount() {
    this.setState({ isOpen: false })
  }

  componentDidMount() {
    this.setState({ isOpen: true })

    document.addEventListener('focusout', this.handleFocusOut, true)
  }

  handleFocusOut = (e) => {
    e.stopImmediatePropagation()

    if (e.relatedTarget === this.input) {
      this.isFocused = false;
      this.setState({ isOpen: false })
      //__root.emit('autocompleteFocusLost', this.props.config.get('widgetKey'))
      return;
    }
  }

  handleCloseByUser = () => (
    this.setState({ isOpen: false })

  )

  handleInputChange = ({ target: { value }}) => {
    // update agent
    this.props.update('q', value)
  }

  componentDidUpdate() {
    this.input && this.input.focus()
  }

  handleExited = () => {
    events.emit('autocompleteFocusLost', this.props.config.get('widgetKey'))
  }

  getInputRef = (el) => {
    this.input = el
  }

  render() {
    const { theme, meta, isMobile, suggestions, config, ...rest } = this.props
    return (
      <Drawer
        isOpen={this.state.isOpen}
        width={isMobile ? '90%' : 300}
        onCloseByUser={this.handleCloseByUser}
        onExited={this.handleExited}>
        <div className={theme.root} data-findify-autocomplete={true}>
          <div className={theme.header}>
            <Icon className={theme.searchIcon} name={'Search'} width={24} height={24} />
          </div>
          <div className={theme.inputWrapper}>
            <input
              defaultValue={meta.get('q')}
              ref={this.getInputRef}
              onChange={this.handleInputChange}
              placeholder={'What are you looking for?'} />
          </div>
          <div className={theme.suggestionsContainer} display-if={suggestions && suggestions.size > 0}>
            <h4 className={theme.typeTitle}>{config.getIn(['i18n', 'suggestionsTitle'])}</h4>
            <SearchSuggestions className={theme.searchSuggestions} widgetKey={config.get('widgetKey')} {...rest} />
          </div>
        </div>
      </Drawer>
    )
  }
}
