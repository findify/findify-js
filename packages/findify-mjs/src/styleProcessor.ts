import customProperties from 'postcss-custom-properties';
import flat from 'flat';
import omitBy from 'lodash/omitBy';
import isEmpty from 'lodash/isEmpty';

const postcss = require('postcss');
const postCssVariables = customProperties();

export default styles => data =>
  new Promise((resolve, reject) => {
    postCssVariables.setVariables(
      omitBy(flat.flatten(data, { delimiter: '-' }), isEmpty),
    );
    postcss([
      require('postcss-nested'),
      require('autoprefixer'),
      postCssVariables,
      require('postcss-calc'),
      require('postcss-color-function'),
      require('postcss-font-magician'),
    ])
      .process(styles)
      .then(({ css }) => resolve(css))
      .catch(reject);
  });
