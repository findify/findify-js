import Truncate from 'components/common/Truncate';

export default ({ text, theme, ...rest }) => (
  <p display-if={!!text} className={theme.description} {...rest}>
    <Truncate>{text}</Truncate>
  </p>
);
