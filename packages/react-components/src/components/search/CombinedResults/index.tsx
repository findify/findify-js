/**
 * @module components/search/LazyResults
 */
 import { useConfig, usePagination } from '@findify/react-connect';
 import MapArray from 'components/common/MapArray';
 import Grid from 'components/common/Grid';
 import ProductCard from 'components/Cards/Product';
 import Button from 'components/Button';
 import Text from 'components/Text';
 import { ArrayLike } from 'components/common/MapArray';
 import useTranslations from 'helpers/useTranslations';
 import PromoCard from 'components/Cards/Promo';
 
 import styles from 'components/search/LazyResults/styles.css';
 import useLazy from 'helpers/useLazy';
 import useLazyPromos from 'helpers/useLazyPromos';
 import { Immutable } from '@findify/store-configuration';
 
 import Pagination from 'components/Pagination';
 
 export default ({ theme = styles, card = ProductCard, itemConfig }) => {
   console.log('InsideCoombined')
   const {
     container,
     onLoadNext,
     onLoadPrev,
     displayPrevButton,
     displayNextButton,
     items,
   } = useLazy();
   const promos = useLazyPromos();
   const { config } = useConfig<Immutable.SearchConfig>();
   const { getPageProps, current } = usePagination();
   const translate = useTranslations();
   return (
     <div
       ref={container}
       className={theme.root}
       role="main"
       aria-label={translate('search.title')}
       aria-live="polite"
       tabIndex={0}
     >
       <div className={theme.buttonContainer} display-if={displayPrevButton}>
         <Button
           className={theme.prevButton}
           onClick={onLoadPrev}
           href={getPageProps(current - 1)?.href}
         >
           <Text primary lowercase>
             {translate('search.loadPrev')}
           </Text>
         </Button>
       </div>
       <Grid
         role="list"
         wrapperComponent="ul"
         columnComponent="li"
         aria-label={translate('search.title')}
         columns={config.getIn(['breakpoints', 'grid'])}
         gutter={12}
       >
         {MapArray({
           config: itemConfig || config.get('product'),
           array: items as ArrayLike,
           factory: card,
           isSearch: true
         })}
         {MapArray({
           array: promos,
           factory: PromoCard,
           config: config.get('promo'),
           order: (item) => item.get('position'),
         })}
       </Grid>
       <div className={theme.buttonContainer}>
         <Button
           className={theme.nextButton}
           onClick={onLoadNext}
           href={getPageProps(current + 1)?.href}
         >
           <Text primary lowercase>
             {translate('search.loadMore')}
           </Text>
         </Button>
       </div>
       <Pagination />
     </div>
   );
 };