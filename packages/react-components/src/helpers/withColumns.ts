import { createFactory } from 'react';
import sizeMe from 'react-sizeme';
import { compose, setDisplayName } from 'recompose';


/**
 * This function is used to calculate products to show in a line of a Slider according to its width
 * @param width Width of slider
 * @returns Number of items to show in a Slider
 */

const defaultColumnsMapper = (width, props?) => {
  if (width > 1500) return 3;
  if (width > 1000) return 3;
  if (width > 800) return 4;
  if (width > 600) return 4;
  if (width > 400) return 6;
  return 12;
};

const sizer = sizeMe();

export default (columnsMapper = defaultColumnsMapper) => baseComponent => {
  const factory: any = createFactory(baseComponent);
  return sizer(({ size, ...rest }) => {
    const columns = String(columnsMapper(size.width, rest));
    return factory({ ...rest, columns });
  });
}
