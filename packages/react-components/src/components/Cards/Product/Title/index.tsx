import Text from 'components/Text';

export default ({ onClick, theme, href, text, ...rest }) => (
  <Text display-if={!!text} component="h3" className={theme.title} {...rest}>
    <a className={theme.titleLink} onClick={onClick} href={href}>
      {text}
    </a>
  </Text>
);
