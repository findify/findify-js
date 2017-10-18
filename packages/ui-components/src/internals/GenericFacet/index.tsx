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
import sizeMe from 'react-sizeme';

import { Raw } from './Raw';

const styles = require('./styles.css');
const customStyles = require('customStyles');

export interface OwnProps {
  label: string;
}

export interface State {
  isOpen: boolean;
  toggleFacet(on: boolean): void;
}

export interface Handlers {
  toggleOpen(): void;
}

export type Props = OwnProps & State & Handlers;

export const Wrapper = Content =>
  compose(
    defaultProps({ isOpen: true }),
    withState(
      'isOpen',
      'toggleFacet',
      (props: OwnProps & State) => props.isOpen
    ),
    withHandlers({
      toggleOpen: ({ isOpen, toggleFacet }: Props) => () =>
        toggleFacet(!isOpen),
    })
  )(({ isOpen, toggleOpen, label, size, ...rest }: any) => (
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
      <div style={{ width: size.width }}>{isOpen && <Content {...rest} />}</div>
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
    sizeMe({ refreshRate: 50 }),
    withState('state', 'setState', {}),
    withHooks('facet'),
    branch(
      // Return raw content for Mobile wrapper
      ({ isMobile }: any) => isMobile,
      renderComponent(Content),
      renderComponent(WrappedContent(Content))
    )
  )(null as any);

export const GenericFacet: any = HOC(Raw, Wrapper);
