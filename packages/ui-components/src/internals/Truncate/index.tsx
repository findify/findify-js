import * as React from 'react';
import { map } from 'lodash';
import {
  compose,
  defaultProps,
  lifecycle,
  onlyUpdateForKeys,
  pure,
  withHandlers,
  withPropsOnChange,
  withState,
} from 'recompose';

import { Canvas } from './canvas';

const renderLine = (line, i, arr) => {
  if (i === arr.length - 1) return `<span>${line}</span>`;
  if (line) return `<span>${line}</span><br />`;
  return '<br />';
};

const styles = require('./styles.css');

export const reactTruncate = compose<any, Props>(
  pure,
  defaultProps({
    children: '',
    ellipsis: '…',
    lines: 1,
  }),
  withState('target', 'setTarget', void 0),
  withState('width', 'setWidth', 0),
  withPropsOnChange(['target'], ({ target, setWidth }) => ({
    canvas: target && new Canvas(target, setWidth),
  })),
  withHandlers({
    getLines: ({ ellipsis, lines, children, canvas }) => () =>
      canvas.computeLines(ellipsis, lines, children),
  }),
  lifecycle({
    componentWillUnmount() {
      window.removeEventListener('resize', () => this.props.canvas.unbind());
    },
  }),
  withPropsOnChange(
    ['target', 'width'],
    ({ target, width, getLines, children }) => ({
      content: target && map(getLines(), renderLine).join(''),
    }),
  ),
  onlyUpdateForKeys(['content']),
)(({ content, children, ellipsis, setTarget, setText, text, target }) => (
  <span ref={r => !target && !!r && setTarget(r)}>
    {(content && <span dangerouslySetInnerHTML={{ __html: content }} />) || (
        <span>{children}</span>
      )}
  </span>
));

type Props = {
  lines?: number;
  children?: any;
};

const simpleTruncate = compose(
  withState('target', 'setTarget', void 0),
  withPropsOnChange(['target'], ({ target }) => ({
    lineHeight:
      (target && window.getComputedStyle(target)['line-height']) || 1.3,
  })),
)(({ children, target, setTarget, lineHeight, lines = 3 }: any) => (
  <span
    className={styles.root}
    style={{ maxHeight: `${lineHeight * lines}em`, WebkitLineClamp: lines }}
    ref={r => !target && !!r && setTarget(r)}
  >
    {children}
  </span>
));

export default simpleTruncate;
