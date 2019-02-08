import React from 'react'
import Drawer from 'components/common/Drawer'
import Icon from 'components/Icon'
import SearchSuggestions from 'components/autocomplete/SearchSuggestions'

class Sidebar extends React.Component {
  state = { isOpen: false };
  suggestionsContainer: any;
  input: any;
  isFocused: any;
  mounted = false;

  componentWillUnmount() {
    this.setState({ isOpen: false });
    document.removeEventListener('focusout', this.handleFocusOut);
    this.mounted = false;
  }

  componentDidMount() {
    this.setState({ isOpen: true });
    this.mounted = true;
    document.addEventListener('focusout', this.handleFocusOut, true)
  }

  handleFocusOut = (e) => {
    e.stopImmediatePropagation()
    if (!this.mounted) return;
    if (e.relatedTarget === this.input) {
      this.isFocused = false;
      this.setState({ isOpen: false });
      return;
    }
  }

  handleInputChange = ({ target: { value }}) => {
    // update agent
    this.props.update('q', value)
  }

  componentDidUpdate() {
    this.input && this.input.focus()
  }

  handleExited = () => {
    (window as any).findify.emit('autocompleteFocusLost', this.props.config.get('widgetKey'))
  }

  getInputRef = (el) => {
    this.input = el
  }

  handleSubmit = () => {
    (window as any).findify.emit('search', this.props.config.get('widgetKey'), this.input.value);
    this.handleExited()
  }

  render() {
    const { theme, meta, isMobile, suggestions, config, ...rest } = this.props
    return (
      <Drawer hideModal={this.handleExited}>
        <div className={theme.root} data-findify-autocomplete={true} tabIndex={0}>
          <div className={theme.backdrop} />
          <div className={theme.header}>
            <form onSubmit={this.handleSubmit}>
              <input
                defaultValue={meta.get('q')}
                className={theme.input}
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
                onClick={this.handleExited}
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
      </Drawer>
    )
  }
}

export default Sidebar;
