import * as React from 'react';
import Frame from 'react-frame-component';
import ResizeDetector from 'react-resize-detector';
import { defer, once } from 'lodash';
import { createFrameHtml } from '../helpers/createHTML';
import { injectTags } from '../helpers/createHTML';

import uid from 'uuid/v1';
import {
  compose,
  withState,
  withPropsOnChange,
  withHandlers,
  onlyUpdateForKeys,
  renderComponent,
  createEagerFactory,
  withProps,
  branch,
  defaultProps,
  setDisplayName,
} from 'recompose';

const initialStyles = { width: 0, height: 0 };
let key = 1;

const defaultStyles = {};

const FrameComponent = (decorators, factory) =>
  compose(
    defaultProps({ frameID: uid() }),
    withPropsOnChange(
      ['config'],
      ({ config = {}, hooks, isMobile, isMobileSimple }) => ({
        html: createFrameHtml(
          config.css,
          config.scripts,
          config.featureType,
          !isMobile || !!config.isMobileSimple
        ),
      })
    ),
    decorators
  )(({ frameStyles, html, frameID, ...props }) => (
    <Frame
      style={frameStyles}
      initialContent={html}
      mountTarget="#root"
      scrolling="no"
    >
      {factory({ ...props, key: frameID })}
      <ResizeDetector handleWidth handleHeight onResize={props.onResize} />
    </Frame>
  ));

const StaticComponent = (decorators, factory) =>
  decorators(({ frameStyles, ...props }) => {
    injectTags(props.config.css, props.config.js);

    return (
      <div style={frameStyles}>
        {factory(props)}
        <ResizeDetector handleWidth handleHeight onResize={props.onResize} />
      </div>
    );
  });

const withFrame = mapper => BaseComponent => {
  const factory = createEagerFactory(BaseComponent);
  const sizeHandlers = compose(
    withState('styles', 'setStyles', initialStyles),
    withPropsOnChange(['styles', 'node', 'visible'], props => ({
      frameStyles: {
        ...defaultStyles,
        ...((mapper && mapper(props)) || initialStyles),
      },
    })),
    withHandlers({
      onResize: ({ setStyles }) => (width, height) =>
        setStyles({ width, height }),
    })
  );

  return branch(
    ({ config }) => config.frameDisabled,
    renderComponent(StaticComponent(sizeHandlers, factory)),
    renderComponent(FrameComponent(sizeHandlers, factory))
  )(null);
};

/**
 * Will create iframe with resize detector
 * @param [function] stylesMapper
 */
export default setDisplayName('withFrame')(withFrame);
