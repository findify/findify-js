import React from 'react'
import Drawer from 'components/common/Drawer'
import Icon from 'components/Icon'
import SearchSuggestions from 'components/autocomplete/SearchSuggestions'
import * as emmiter from 'helpers/emmiter';
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
      this.hide()
    }
  }

  handleFocusOut = (e) => {
    e.stopImmediatePropagation()
    if (e.relatedTarget === this.input) {
      // FIXME: this is a very dirty hack, so we need to figure out something
      setTimeout(() => {
        this.hide()
      }, 300)
      return;
    }
  }

  hide = () => {
    emmiter.emit('autocompleteFocusLost', this.props.config.get('widgetKey'))
  }

  componentDidUpdate() {
    this.input && this.input.focus()
  }

  handleInputChange = ({ target: { value }}) => {
    // update agent
    this.props.update('q', value)
  }

  getInputRef = (el) => {
    this.input = el;
  }

  handleSubmit = () => {
    emmiter.emit('search', this.props.config.get('widgetKey'))
  }

  render() {
    const { theme, meta, isMobile, suggestions, config, ...rest } = this.props
    return (
      <div className={theme.root} data-findify-autocomplete={true}>
        <div className={theme.backdrop} />
        <div className={theme.header}>
          <form onSubmit={this.handleSubmit}>
            <input
              ref={this.getInputRef}
              onChange={this.handleInputChange}
              placeholder='What are you looking for?' />
          </form>
          <div className={theme.icons}>
            <Icon
              onClick={this.handleSubmit}
              className={theme.searchIcon}
              name={'Search'}
              width={18}
              height={18} />
            <div className={theme.iconDivider}></div>
            <Icon
              onClick={this.hide}
              className={theme.xIcon}
              name={'XMobile'}
              width={13}
              height={13} />
          </div>
        </div>
        <div className={theme.suggestionsWrapper} display-if={suggestions && suggestions.size > 0}>
          <div className={theme.suggestionsContainer} ref={(el) => {this.suggestionsContainer = el}}>
            <h4 className={theme.typeTitle}>{config.getIn(['i18n', 'suggestionsTitle'])}</h4>
            <SearchSuggestions className={theme.searchSuggestions} widgetKey={config.get('widgetKey')} {...rest} />
          </div>
        </div>
      </div>
    )
  }
}
