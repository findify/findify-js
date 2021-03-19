import Text from 'components/Text';

export default ({ text, theme, ...rest }) => (
  <Text display-if={!!text} className={theme.title} {...rest}>
    {text}
  </Text>
);
