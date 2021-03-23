export default ({ title, ...rest }) => (
  <svg width={17} height={15} {...rest} viewBox="0 0 17 15">
    <title display-if={!!title}>{title}</title>
    <path
      d="M9.5 2h7a.5.5 0 1 1 0 1h-7a.5.5 0 0 1 0-1zm0 4h5a.5.5 0 1 1 0 1h-5a.5.5 0 0 1 0-1zm0 4h3a.5.5 0 1 1 0 1h-3a.5.5 0 1 1 0-1zm0 4h1a.5.5 0 1 1 0 1h-1a.5.5 0 1 1 0-1zm-1.838-2.004L4.008 15.65.36 12.002a.5.5 0 0 1 .006-.714.517.517 0 0 1 .725.007l2.425 2.435-.015-12.274A.5.5 0 0 1 4 .956a.5.5 0 0 1 .5.5V13.73l2.453-2.442a.502.502 0 0 1 .709.708z"
      fill="currentColor"
      fillRule="evenodd"
    />
  </svg>
);
