export default ({ title, ...rest }) => (
  <svg width={15} height={15} {...rest} viewBox="0 0 15 15">
    <title display-if={!!title}>{title}</title>
    <path
      d="M11.865 4.27l-3.48 3.48 3.48 3.48-.885.885-3.48-3.48-3.48 3.48-.885-.885 3.48-3.48-3.48-3.48.885-.885 3.48 3.48 3.48-3.48z"
      fill="currentColor"
      fillRule="evenodd"
    />
  </svg>
);
