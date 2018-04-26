import React from 'react';
import cx from 'classnames';
import styles from 'components/Icon/styles.css';

import Filters from 'components/Icon/icons/Filters.svg';
import Minus from 'components/Icon/icons/Minus.svg';
import Plus from 'components/Icon/icons/Plus.svg';
import Search from 'components/Icon/icons/Search.svg';
import Sorting from 'components/Icon/icons/Sorting.svg';

import CheckmarkDark from 'components/Icon/icons/Checkmark/Dark.svg';
import Star from 'components/Icon/icons/Star.svg';
import XDark from 'components/Icon/icons/X/Dark.svg';
import XMobile from 'components/Icon/icons/X/Mobile.svg';
import RadioEmpty from 'components/Icon/icons/Radio/Empty.svg';
import RadioFilled from 'components/Icon/icons/Radio/Filled.svg';
import ArrowBack from 'components/Icon/icons/Arrow/Back.svg';
import ArrowDown from 'components/Icon/icons/Arrow/Down.svg';
import ArrowUp from 'components/Icon/icons/Arrow/Up.svg';
import ArrowLeft from 'components/Icon/icons/Arrow/Left.svg';
import ArrowRight from 'components/Icon/icons/Arrow/Right.svg';
import ArrowLeftBig from './icons/Arrow/Left-Big.svg';
import ArrowRightBig from './icons/Arrow/Right-Big.svg';
import CheckboxFilled from 'components/Icon/icons/Checkbox/Filled.svg';
import CheckboxEmpty from 'components/Icon/icons/Checkbox/Empty.svg';

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

export default ({ name, width, height, className, ...rest }: Props) =>
  React.createElement(icons[name], {
    width,
    height,
    className: cx(styles.root, className),
    ...rest
  })

