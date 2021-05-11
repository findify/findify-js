export default ({ title, ...rest }) => (
  <svg width={14} height={14} {...rest} viewBox="0 0 14 14">
    <title display-if={!!title}>{title}</title>
    <g fill="none" fillRule="evenodd">
      <circle fill="#C6C6C6" cx="7" cy="7" r="4" />
      <path
        d="M7 14A7 7 0 1 1 7 0a7 7 0 0 1 0 14zm0-1A6 6 0 1 0 7 1a6 6 0 0 0 0 12z"
        fill="currentColor"
      />
    </g>
  </svg>
);
