import React from 'react'
import styles from './styles.css'
import Tip from '../../../components/autocomplete/Tip'
import ProductMatches from '../../../components/autocomplete/ProductMatches'
import SearchSuggestions from '../../../components/autocomplete/SearchSuggestions'
import { connectConfig } from '@findify/react-connect'

export default connectConfig(({ config }) => {
  const autocompleteConfig = config.get('features.autocomplete')
  return (
    <div className={styles.root}>
      <div className={styles.container}>
        <div className={styles.productMatchesContainer}>
          <h4 className={styles.typeTitle}>{autocompleteConfig.get('i18n.productMatchesTitle')}</h4>
          <ProductMatches className={styles.productMatches} config={autocompleteConfig} />
        </div>
        <div className={styles.suggestionsContainer}>
          <h4 className={styles.typeTitle}>{autocompleteConfig.get('i18n.suggestionsTitle')}</h4>
          <SearchSuggestions className={styles.searchSuggestions} config={autocompleteConfig} />
        </div>
      </div>
      <Tip className={styles.tip} title={autocompleteConfig.get('i18n.tipTitle')} />
    </div>
  );
});

