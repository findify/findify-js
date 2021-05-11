export default ({ title, ...rest }) => (
  <svg width={12} height={12} {...rest} viewBox="0 0 12 12">
    <title display-if={!!title}>{title}</title>
    <path
      d="M4.248 8.188L10.422 2l.826.826-7 7L1 6.578l.812-.826z"
      fill="currentColor"
      fillRule="evenodd"
    />
  </svg>
);
