import React from 'react';
import cx from 'classnames';
import styles from './styles.css';

import Filters from './icons/Filters.svg';
import Minus from './icons/Minus.svg';
import Plus from './icons/Plus.svg';
import Search from './icons/Search.svg';
import Sorting from './icons/Sorting.svg';

import CheckmarkDark from './icons/Checkmark/Dark.svg';
import Star from './icons/Star.svg';
import XDark from './icons/X/Dark.svg';
import XMobile from './icons/X/Mobile.svg';
import RadioEmpty from './icons/Radio/Empty.svg';
import RadioFilled from './icons/Radio/Filled.svg';
import ArrowBack from './icons/Arrow/Back.svg';
import ArrowDown from './icons/Arrow/Down.svg';
import ArrowUp from './icons/Arrow/Up.svg';
import ArrowLeft from './icons/Arrow/Left.svg';
import ArrowRight from './icons/Arrow/Right.svg';
import ArrowLeftBig from './icons/Arrow/Left-Big.svg';
import ArrowRightBig from './icons/Arrow/Right-Big.svg';
import CheckboxFilled from './icons/Checkbox/Filled.svg';
import CheckboxEmpty from './icons/Checkbox/Empty.svg';

const icons = {
  Filters,
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
  CheckboxEmpty
}

export type Props = {
  name: keyof typeof icons
  width?: number
  height?: number
  className?: string
}

export default ({ name, width, height, className }: Props) =>
  React.createElement(icons[name], {
    width,
    height,
    className: cx(styles.root, className)
  })

