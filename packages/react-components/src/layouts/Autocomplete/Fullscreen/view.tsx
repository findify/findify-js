import React from 'react'
import Drawer from 'components/common/Drawer'
import Icon from 'components/Icon'
import SearchSuggestions from 'components/autocomplete/SearchSuggestions'

export default class Sidebar extends React.Component {
  isFocused: boolean;

  componentWillUnmount() {
    document.querySelector('body')!.classList.remove(this.props.theme.bodyNoscroll)
    document.removeEventListener('keydown', this.handleEscapeKeypress)
    document.removeEventListener('focusout', this.handleFocusOut)
  }

  componentDidMount() {
    document.querySelector('body')!.classList.add(this.props.theme.bodyNoscroll)
    document.addEventListener('keydown', this.handleEscapeKeypress)
    document.addEventListener('focusout', this.handleFocusOut, true)
  }

  handleEscapeKeypress = (e) => {
    if (e.key === 'Escape') {
      console.log(this.props.config.toJS())
      __root.emit('autocompleteFocusLost', this.props.config.get('widgetKey'))
    }
  }

  handleFocusOut = (e) => {
    e.stopImmediatePropagation()
    if (e.relatedTarget === this.input) {
      __root.emit('autocompleteFocusLost', this.props.config.get('widgetKey'))
      return;
    }
  }

  componentDidUpdate() {
    this.input && this.input.focus()
  }

  handleInputChange = ({ target: { value }}) => {
    // update agent
    this.props.update('q', value)
  }

  handleBlur = (e) => {
    e.stopPropagation();
    console.log('hiding autocomplete')
    __root.emit('autocompleteFocusLost', this.props.config.get('widgetKey'))

  }

  getInputRef = (el) => {
    this.input = el;
  }

  render() {
    const { theme, meta, isMobile, suggestions, config, ...rest } = this.props
    return (
      <div className={theme.root}>
        <div className={theme.backdrop} />
        <div className={theme.header}>
          <Icon className={theme.searchIcon} name={'Search'} width={24} height={24} />
        </div>
        <div className={theme.inputWrapper}>
          <input
            ref={this.getInputRef}
            onChange={this.handleInputChange}
            placeholder='What are you looking for?'
            onBlur={this.handleBlur} />
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
