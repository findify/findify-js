export default ({ title, ...rest }) => (
  <svg width={20} height={20} {...rest} viewBox="0 0 20 20">
    <title display-if={!!title}>{title}</title>
    <path
      d="M16.68 9.18v1.64H6.52l4.66 4.68L10 16.68 3.32 10 10 3.32l1.18 1.18-4.66 4.68z"
      fill="currentColor"
      fillRule="evenodd"
    />
  </svg>
);
