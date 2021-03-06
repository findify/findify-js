/**
 * List of media queries.
 * If max-width media query will achieve one of keys in list, then biggest will be returned
 * In case window width is smaller then smallest key then default`s key value will be returned
 * If no default value is set, then `1` will be returned
 * @width of Window
 * @value will be returned when window width achieved
 */
export type Breakpoints = { width: number, value: number | string }[]
