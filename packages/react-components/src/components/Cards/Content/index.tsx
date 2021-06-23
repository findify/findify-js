/**
 * @module components/Cards/Content
 */

import Image from 'components/common/Image';
import Text from 'components/Text';
import Truncate from 'components/common/Truncate';
import Icon from 'components/Icon';
import styles from 'components/Cards/Content/styles.css';
import { useCallback } from 'react';
import cx from 'classnames';

const Title: any = ({ text, theme, onClick, href, ...rest }) => (
  <Text display-if={!!text} component="h3" className={theme.title} {...rest}>
    <a className={theme.titleLink} onClick={onClick} href={href}>
      {text}
    </a>
  </Text>
);

const Description: any = ({ text, theme, ...rest }) => (
  <p display-if={!!text} className={theme.description} {...rest}>
    <Truncate>{text}</Truncate>
  </p>
);

export default ({ item, config, theme = styles, Container = 'div' }) => {
  return (
    <Container
      data-element="card"
      className={cx(theme.root, theme[config.get('template')])}
    >
      <div className={theme.content}>
        <Title
          theme={theme}
          text={item.get('title')}
          onClick={item.onClick}
          href={item.get('url')}
        />
        <Description theme={theme} text={item.get('description')} />
      </div>
      <div
        className={theme.image}
        onClick={item.onClick}
        display-if={item.get('image_url')}
      >
        <Image
          aspectRatio={config.getIn(['image', 'aspectRatio'])}
          alt={item.get('title')}
          lazy={config.getIn(['image', 'lazy'])}
          offset={config.getIn(['image', 'lazyOffset'])}
          src={item.get('image_url')}
        />
      </div>
    </Container>
  );
};
