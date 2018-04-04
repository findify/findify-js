import { withStateHandlers, lifecycle, compose, setDisplayName } from 'recompose'
import { connectConfig, connectSuggestions } from '@findify/react-connect';


export default compose(
  setDisplayName('withAutocompleteLogic'),
  connectConfig,
  connectSuggestions,
  withStateHandlers({ selectedSuggestion: -1, }, {
    changeSuggestionIndex: ({ selectedSuggestion }, { config, suggestions }) => (evt) => {
      const arrowCodes = ['ArrowUp', 'ArrowDown']
      if (!arrowCodes.includes(evt.key)) return
      evt.preventDefault()
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
      const node: HTMLInputElement = this.props.config.get('node')
      node.addEventListener('keydown', this.props.changeSuggestionIndex)
    },
    componentWillUnmount() {
      const node: HTMLInputElement = this.props.config.get('node')
      node.removeEventListener('keydown', this.props.changeSuggestionIndex)
    },
    componentWillUpdate(nextProps) {
      if (
        this.props.meta && nextProps.meta &&
        nextProps.meta.get('q') !== this.props.meta.get('q')
      ) this.props.setSuggestionIndex(-1)
    }
  })
)
