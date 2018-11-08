/**
 * @module components/Cards/Content
 */

import React from 'react'
import classNames from 'classnames'
import Image from 'components/common/Image'

export default ({ item, config, theme }) => (
  <div className={theme.root}>
    <div className={classNames(theme.imageWrap)}>
      {(item.getIn(['html', 'image']) && (
        <div dangerouslySetInnerHTML={{ __html: item.getIn(['html', 'image']) }} />
      )) || (
        <Image
          className={classNames(theme.image)}
          aspectRatio={config.getIn(['contentSearch', 'content', 'image', 'aspectRatio'], 1)}
          thumbnail={item.get('thumbnail_url')}
          src={item.get('image_url') || item.get('thumbnail_url')}
          alt={item.get('title')}
        />
      )}
    </div>
  </div>
)
