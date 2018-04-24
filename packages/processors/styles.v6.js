import flat from 'flat';
import omitBy from 'lodash/omitBy';
import isEmpty from 'lodash/isEmpty';
import customProperties from 'postcss-custom-properties';
import cssnano from 'cssnano-browser';

const postcss = require('postcss');
const postCssVariables = customProperties({ preserve: false });

export default styles => data =>
  new Promise((resolve, reject) => {
    postCssVariables.setVariables(
      omitBy(flat.flatten(data, { delimiter: '-' }), isEmpty),
    );
    postcss([
      postCssVariables,
      cssnano
    ])
      .process(styles)
      .then(({ css }) => resolve(css))
      .catch(reject);
  });
