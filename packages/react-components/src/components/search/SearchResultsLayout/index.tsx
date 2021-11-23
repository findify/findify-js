/**
 * helper function to render search results based on config
 * @module components/search/resultslayout
 */

import StaticResults from 'components/search/StaticResults';
import LazyResults from 'components/search/LazyResults';
import CombinedResults from 'components/search/CombinedResults';

interface IResultsLayoutProps {
  condition: string;
  [x: string]: any;
}

const ResultsLayout = ({ condition, ...props }: IResultsLayoutProps) => {
  switch (condition) {
    case 'lazy':
      return <LazyResults {...(condition && props)} />;
    case 'static':
      return <StaticResults {...(condition && props)} />;
    case 'combined':
      return <CombinedResults {...(condition && props)} />;
    default:
      return <></>;
  }
};

export default ResultsLayout;
