import chunks from 'helpers/chunks';

/** View type to View component mapping */
export const LayoutTypes = {
  sidebar: chunks.autocomplete.sidebar,
  dropdown: chunks.autocomplete.dropdown,
  'fullscreen-with-input': chunks.autocomplete.FullscreenWithInput,
};

/** Possible Autocomplete view types */
export type AutocompleteType = keyof typeof LayoutTypes;
