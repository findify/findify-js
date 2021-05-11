export default ({ title, ...rest }) => (
  <svg width={12} height={11} {...rest} viewBox="0 0 12 11">
    <title display-if={!!title}>{title}</title>
    <path
      d="M6 9.018l-3.708 1.858L3 6.941 0 4.154l4.146-.574L6 0l1.854 3.58L12 4.154 9 6.941l.708 3.935z"
      fill="currentColor"
      fillRule="evenodd"
    />
  </svg>
);
