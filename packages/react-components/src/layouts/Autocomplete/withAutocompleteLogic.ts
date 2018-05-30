import { withStateHandlers, lifecycle, compose, setDisplayName, withProps } from 'recompose'
import { connectSuggestions, connectQuery } from '@findify/react-connect';


export default compose(
  setDisplayName('withAutocompleteLogic'),
  connectSuggestions,
  withStateHandlers({ selectedSuggestion: -1, }, {
    changeSuggestionIndex: ({ selectedSuggestion }, { config, suggestions, getSuggestionProps }) => (evt) => {
      const arrowCodes = ['ArrowUp', 'ArrowDown']
      if (evt.key === 'Enter' && selectedSuggestion !== -1) {
        evt.preventDefault()
        getSuggestionProps(selectedSuggestion, config.get('widgetKey')).onClick()
        return;
      }
      if (!arrowCodes.includes(evt.key)) return;
      evt.preventDefault();

      const newSuggestionIndex = selectedSuggestion + (evt.key === 'ArrowUp' ? -1 : 1)
      const totalSuggestions = suggestions && suggestions.size || 0


      if (newSuggestionIndex < 0) return { selectedSuggestion: totalSuggestions - 1 }
      if (totalSuggestions - 1 < newSuggestionIndex) return  { selectedSuggestion: 0 }
      return { selectedSuggestion: newSuggestionIndex }
    },
    setSuggestionIndex: ({ selectedSuggestion }) => (index) => ({ selectedSuggestion: index })
  }),
  lifecycle({
    componentDidMount() {
      const node: HTMLInputElement = this.props.config.get('node');
      node.addEventListener('keydown', this.props.changeSuggestionIndex)
      node.autocomplete = 'off';
    },
    componentWillUnmount() {
      const node: HTMLInputElement = this.props.config.get('node')
      node.removeEventListener('keydown', this.props.changeSuggestionIndex)
    },
    componentWillReceiveProps(nextProps) {
      if (nextProps.meta.get('q') !== this.props.meta.get('q')) {
        nextProps.setSuggestionIndex(-1);
      }
    }
  }),
  withProps(({ config }) => ({
    closeAutocomplete: () => (window as any).findify.emit('autocompleteFocusLost', config.get('widgetKey'))
  }))
)
