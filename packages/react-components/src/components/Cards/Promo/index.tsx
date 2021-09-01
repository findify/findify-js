/**
 * @module components/Cards/Promo
 */
import styles from 'components/Cards/Promo/styles.css';
import { useCallback } from 'react';
import cx from 'classnames';

export default ({ item, config, theme = styles }) => {
  const card = item.getIn(['cards', 0]);
  const onClick = useCallback(
    (e) => {
      if (!card.get('redirect_link')) return;
      e.preventDefault();
      window.open(card.get('redirect_link'), '_blank');
    },
    [card]
  );

  return (
    <a
      onClick={onClick}
      className={cx(theme.root, `findify-promo-${card.get('id')}`)}
      href={card.get('url')}
    >
      <div
        className={theme.content}
        style={{
          backgroundColor: card.get('background_color') || 'transparent',
          backgroundImage:
            card.get('image_url') && `url(${card.get('image_url')})`,
        }}
      >
        <div
          className={theme.container}
          style={{ color: card.getIn(['fe_settings', 'text_color']) }}
        >
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
            style={{
              color: card.getIn(['fe_settings', 'button_color']),
              background: card.getIn(['fe_settings', 'button_background']),
            }}
          >
            {card.get('cta_text')}
          </button>
        </div>
      </div>
      <p
        className={theme.footer}
        display-if={card.get('footer')}
        style={{ color: card.getIn(['fe_settings', 'footer_color']) }}
      >
        {card.get('footer')}
      </p>
    </a>
  );
};
