export default ({ title, ...rest }) => (
  <svg width={12} height={12} {...rest} viewBox="0 0 12 12">
    <title display-if={!!title}>{title}</title>
    <path
      d="M0 0h12v12H0V0zm1 1v10h10V1H1z"
      fill="currentColor"
      fillRule="evenodd"
    />
  </svg>
);
