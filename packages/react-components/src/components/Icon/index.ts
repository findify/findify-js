/**
 * @module components/Icon
 */

import * as React from 'react';
import cx from 'classnames';
import styles from 'components/Icon/styles.css';

import Filters from 'components/Icon/icons/Filters';
import Fire from 'components/Icon/icons/Fire';
import Minus from 'components/Icon/icons/Minus';
import Plus from 'components/Icon/icons/Plus';
import Search from 'components/Icon/icons/Search';
import Sorting from 'components/Icon/icons/Sorting';

import CheckmarkDark from 'components/Icon/icons/Checkmark/Dark';
import Star from 'components/Icon/icons/Star';
import XDark from 'components/Icon/icons/X/Dark';
import XMobile from 'components/Icon/icons/X/Mobile';
import RadioEmpty from 'components/Icon/icons/Radio/Empty';
import RadioFilled from 'components/Icon/icons/Radio/Filled';
import ArrowBack from 'components/Icon/icons/Arrow/Back';
import ArrowDown from 'components/Icon/icons/Arrow/Down';
import ArrowUp from 'components/Icon/icons/Arrow/Up';
import ArrowLeft from 'components/Icon/icons/Arrow/Left';
import ArrowRight from 'components/Icon/icons/Arrow/Right';
import ArrowLeftBig from 'components/Icon/icons/Arrow/Left-Big';
import ArrowRightBig from 'components/Icon/icons/Arrow/Right-Big';
import CheckboxFilled from 'components/Icon/icons/Checkbox/Filled';
import CheckboxEmpty from 'components/Icon/icons/Checkbox/Empty';
import ExternalLink from 'components/Icon/icons/ExternalLink';

/** Possible icon types */
export const icons = {
  Filters,
  Fire,
  Minus,
  Plus,
  Search,
  Sorting,
  CheckmarkDark,
  Star,
  XDark,
  XMobile,
  RadioEmpty,
  RadioFilled,
  ArrowBack,
  ArrowDown,
  ArrowUp,
  ArrowLeft,
  ArrowRight,
  ArrowLeftBig,
  ArrowRightBig,
  CheckboxFilled,
  CheckboxEmpty,
  ExternalLink,
};

/** Props that Icon accepts */
export type IIconProps = {
  /** Icon name */
  name: keyof typeof icons;
  /** Icon width in pixels */
  width?: number;
  /** Icon height in pixels */
  height?: number;
  /** Custom className */
  className?: string;
  /** Accessible title for screen readers */
  title?: string;
  /** Accessible title for screen readers */
  component?: React.Component;
  /** Rest of props to pass to underlying elements */
  [x: string]: any;
};

const Icon = ({ name, component, className, ...rest }: IIconProps) =>
  React.createElement(component || icons[name], {
    className: cx(styles.root, className),
    ...rest,
  });

export default Icon;
