import * as React from 'react';
import { debounce } from 'lodash';
const selector = '.findify-layouts--results-layout__productsContainer';
const minHeight = 500;
const offset = 30;

export class StickyFilters extends React.Component<any, any> {
  container: any = void 0;
  content: any = void 0;
  wrapper: any = void 0;

  constructor(props) {
    super(props);
    this.handleScroll = this.handleScroll.bind(this);
  }

  setContent = (r) => {
    if (!r || this.container) return;
    this.container = r;
  }
  setWrapper = (r) => {
    if (!r || this.wrapper) return;
    this.wrapper = r;
  }

  handleScroll: any = debounce(() => {
    const content =
      document.querySelector(selector) &&
      document.querySelector(selector).childNodes[0];

    if (!this.content && content) {
      this.content = content;
    }
    if (!this.content || !this.container || !this.wrapper) return;
    const contentBound = this.content.getBoundingClientRect();
    const wrapperBound = this.wrapper.getBoundingClientRect();
    const shouldStick =
      wrapperBound.height < contentBound.height
      && contentBound.top + offset <= 0;

    if (!shouldStick) {
      this.container.style.top = 0;
      this.container.style.maxHeight = window.innerHeight;
      return;
    }
    if (contentBound.bottom <= minHeight) return;
    this.container.style.top = `${~contentBound.top + offset}px`;
    this.container.style.maxHeight = `${contentBound.bottom - offset}px`;
  })

  componentDidMount() {
    document.addEventListener('scroll', this.handleScroll, true)
  }

  componentWillUnmount() {
    document.removeEventListener('scroll', this.handleScroll, true)
  }

  public render() {
    const { className, children } = this.props;
    return (
      <div ref={this.setWrapper} className={className}>
        <div
          ref={this.setContent}
          style={{
            position: 'relative',
            overflow: 'hidden',
            overflowY: 'auto',
            transform: 'translateZ(0)',
            willChange: 'top, max-height'
          }}
        >
        { children }
        </div>
      </div>
    );
  }
}
