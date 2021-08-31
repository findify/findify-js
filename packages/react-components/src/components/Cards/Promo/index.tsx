/**
 * @module components/Cards/Promo
 */

import Text from 'components/Text';
import styles from 'components/Cards/Promo/styles.css';
import { useCallback } from 'react';

export default ({ item, config, theme = styles }) => {
  const card = item.getIn(['cards', 0]);
  const onClick = useCallback(
    (e) => {
      e.preventDefault();
      window.open(card.get('redirect_link'), '_blank');
    },
    [card]
  );

  return (
    <a onClick={onClick} className={theme.root} href={card.get('url')}>
      <div
        className={theme.content}
        style={{
          backgroundColor: card.get('background_color') || 'transparent',
          backgroundImage:
            card.get('image_url') && `url(${card.get('image_url')})`,
        }}
      >
        <div className={theme.container}>
          <p className={theme.title} display-if={card.get('top_header')}>
            {card.get('top_header')}
          </p>
          <p className={theme.description} display-if={card.get('sub_header')}>
            {card.get('sub_header')}
          </p>
        </div>
        <div className={theme.buttonContainer}>
          <button
            className={theme.button}
            display-if={card.get('cta_text')}
            onClick={onClick}
          >
            {card.get('cta_text')}
          </button>
        </div>
      </div>
      <p className={theme.footer} display-if={card.get('footer')}>
        {card.get('footer')}
      </p>
    </a>
  );
};
