import { useCallback, useMemo, useState } from 'react';
import styles from 'components/common/Announcement/styles.css';

export const Component = ({ text }) => (
  <div aria-live="assertive" className={styles.root}>
    {text}
  </div>
);

export const useAnnouncement = (): [JSX.Element, (text) => void] => {
  const [announcement, setAnnouncement] = useState('');

  const set = useCallback((text) => {
    setAnnouncement(text);
    setTimeout(() => setAnnouncement(''), 1000);
  }, []);

  const component = useMemo(() => <Component text={announcement} />, [
    announcement,
  ]);

  return [component, set];
};

export default Component;
