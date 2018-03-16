import * as React from 'react';
import { debounce } from 'lodash';
const styles = require('./styles.css');
const selector = '.findify-layouts--results-layout__productsContainer';

const minHeight = 500;
const offset = 15;

export class StickyFilters extends React.Component<any, any> {
  container: any = void 0;
  content: any = void 0;
  wrapper: any = void 0;

  constructor(props) {
    super(props);
    this.handleScroll = this.handleScroll.bind(this);
    this.state = {
      style: {
        maxHeight: window.innerHeight
      }
    };
  }

  setContent = (r) => {
    if (!r || this.container) return;
    this.container = r;
  }
  setWrapper = (r) => {
    if (!r || this.wrapper) return;
    this.wrapper = r;
  }

  handleScroll: any = () => {
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
      && contentBound.top - offset <= 0;

    if (!shouldStick) {
      return this.setState({
        style: {
          maxHeight: window.innerHeight
        }
      });
    }
  
    if (contentBound.bottom <= minHeight) {
      return this.setState({
        style: {
          position: 'absolute',
          top: contentBound.height - minHeight,
          maxHeight: minHeight
        }
      });
    }

    const height = contentBound.bottom - offset;
    return this.setState({
      style: {
        position: 'fixed',
        top: offset,
        width: wrapperBound.width,
        maxHeight: height > window.innerHeight ? window.innerHeight - offset : height
      }
    });
  }

  componentDidMount() {
    document.addEventListener('scroll', this.handleScroll, true)
  }

  componentWillUnmount() {
    document.removeEventListener('scroll', this.handleScroll, true)
  }

  public render() {
    const { className, children } = this.props;
    return (
      <div
        ref={this.setWrapper}
        className={className}
        style={{position: 'relative'}}>
        <div
          ref={this.setContent}
          style={this.state.style}
          className={styles.sticky}
        >
        { children }
        </div>
      </div>
    );
  }
}
