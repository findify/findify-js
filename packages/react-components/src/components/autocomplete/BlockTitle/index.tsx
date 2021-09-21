import styles from 'components/autocomplete/BlockTitle/styles.css';

export default ({ children, theme = styles }) => (
  <h4 className={theme.root}>{children}</h4>
);
