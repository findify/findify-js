import styles from 'components/autocomplete/Title/styles.css';

export default ({ children, theme = styles }) => (
  <h4 className={theme.root}>{children}</h4>
);
