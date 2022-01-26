import Text from 'components/Text';

export default ({ theme, text, ...rest }) => (
  <Text display-if={!!text} component="h3" className={theme.title} {...rest}>
    {text}
  </Text>
);
