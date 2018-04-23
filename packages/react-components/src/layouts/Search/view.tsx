import cx from 'classnames'
import React from 'react';
import Grid from 'components/common/Grid';
import StaticResults from 'components/search/StaticResults';
import LazyResults from 'components/search/LazyResults';
import DesktopFacets from 'components/search/DesktopFacets';
import MobileActions from 'components/search/MobileActions';
import DesktopActions from 'components/search/DesktopActions';
import Branch from 'components/common/Branch';
import Tabs from 'components/common/tabs/Tabs';
import Tab from 'components/common/tabs/Tab';

const TabHeader = ({ title,  onClick, theme, isDisabled, isActive, ...rest }) => (

  <div className={cx(theme.tab, {[theme.active]: isActive, [theme.disabled]: isDisabled })} {...rest}>
    {title}
  </div>
)

const createTabHeader = (props) => (anotherProps) => <TabHeader {...props} {...anotherProps} />

export default ({ config, meta, isMobile, mobileFacetsOpened, filtersOnRight, theme }) =>
  <Tabs defaultSelectedIndex={1}>
      <Tab header={createTabHeader({ title: 'All content', theme })} disabled>
        <h1>Content Search is coming soon...</h1>
      </Tab>
      <Tab disabled={false} header={createTabHeader({ title: 'Products', theme })}>
        <div className={theme.root}>
          <DesktopFacets display-if={!isMobile && !filtersOnRight} />
          <div className={theme.content}>
            <Branch condition={isMobile} left={MobileActions} right={DesktopActions} />
            <Branch left={LazyResults} right={StaticResults} condition={config.getIn(['view', 'infinite'])} />
          </div>
          <DesktopFacets display-if={!isMobile && filtersOnRight} />
        </div>
      </Tab>
      <Tab header={createTabHeader({ title: 'Trendspotting', theme })}>
        <h1>Trendspotting is where Instagram photos will reside</h1>
      </Tab>
  </Tabs>


