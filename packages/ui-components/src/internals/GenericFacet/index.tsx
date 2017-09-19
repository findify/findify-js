import * as React from 'react';
import {
  branch,
  compose,
  defaultProps,
  mapProps,
  renderComponent,
  renderNothing,
  setDisplayName,
  withHandlers,
  withState,
} from 'recompose';
import * as cx from 'classnames';
import withHooks from 'helpers/withHooks';
import Icon from 'internals/Icon';
const styles = require('./styles.css');
const customStyles = require('customStyles');

export const Raw = ({ children, ...rest }) => (
  <div className={cx(styles.content, rest.isMobile && styles.mobile)}>
    {React.Children.map(children, (child: any) =>
      React.cloneElement(child, rest),
    )}
  </div>
);

export const Wrapper = Content =>
  compose(
    defaultProps({
      isOpen: true,
    }),
    withState('isOpen', 'toggleFacet', props => props.isOpen),
    withHandlers({
      toggleOpen: ({ isOpen, toggleFacet }: any) => () => toggleFacet(!isOpen),
    }),
  )(({ isOpen, toggleOpen, label, ...rest }: any) => (
    <div
      className={cx(styles.wrap, customStyles.facet, !isOpen && styles.hidden)}
    >
      <div className={styles.toggle}>
        <h5 className={cx(styles.title, customStyles.facetTitle)}>{label}</h5>
        <Icon
          name={isOpen ? 'minus' : 'plus'}
          className={styles.icon}
          onClick={toggleOpen}
        />
      </div>
      <div className={styles.content}>{isOpen && <Content {...rest} />}</div>
    </div>
  ));

export const HOC = (Content, WrappedContent) =>
  compose(
    setDisplayName('GenericFacet'),
    mapProps(({ stateToProps, ...props }: any) => ({
      ...props,
      values: stateToProps ? stateToProps(props) : props.values,
    })),
    withHandlers({
      onChange: ({ name, type, values, onChange }: any) => changes => {
        onChange({ type, name, changes });
      },
    }),
    withState('state', 'setState', {}),
    withHooks('facet'),
    branch(
      // Return raw content for Mobile wrapper
      ({ isMobile }: any) => isMobile,
      renderComponent(Content),
      renderComponent(WrappedContent(Content)),
    ),
  )(null);

export const GenericFacet: any = HOC(Raw, Wrapper);
