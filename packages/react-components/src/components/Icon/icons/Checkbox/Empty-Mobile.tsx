export default ({ title, ...rest }) => (
  <svg width={14} height={14} {...rest} viewBox="0 0 14 14">
    <title display-if={!!title}>{title}</title>
    <path
      d="M0 0h14v14H0V0zm1 1v12h12V1H1z"
      fill="currentColor"
      fillRule="evenodd"
    />
  </svg>
);
