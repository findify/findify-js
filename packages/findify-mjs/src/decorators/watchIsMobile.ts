import { compose, lifecycle, withState } from 'recompose';
import { throttle } from 'lodash';
import windowEvents from '../helpers/windowEventListener';

const events = ['resize'];

/**
 *  Listen for window resize and compare it to mobileBreakpoint from config
 */
export default config => {
  const checkIsMobile = () =>
    config.isMobile !== void 0
      ? config.isMobile
      : window.innerWidth <= config.mobileBreakpoint;

  const handler = getProps =>
    throttle(() => {
      const isMobile = checkIsMobile();
      const props = getProps();
      if (isMobile === props.isMobile) return;
      return props.setIsMobile(isMobile);
    }, 500);

  return compose(
    withState('isMobile', 'setIsMobile', checkIsMobile()),
    lifecycle({
      componentWillMount() {
        this.handler = handler(() => this.props);
        windowEvents.on(events, this.handler);
      },
      componentWillUnmount() {
        windowEvents.off(events, this.handler);
      },
    }),
  );
};
