const attrSelector = 'data-findify-attr';
const attrPrefix = 'findify-';
const classSelector = 'findify-mjs-';

const typeMapper = type =>
  ({
    'search-results': 'search',
    'autocomplete-input': 'autocomplete',
  }[type] || type);

const ignoredAttrs = ['findify-autocomplete-button'];

const ignoreNodes = node =>
  !ignoredAttrs.includes(node.getAttribute(attrSelector));

const findNodesBySelector = (features, selectors): any =>
  Object.keys(selectors).reduce((acc: any, selector) => {
    const feature = features[selectors[selector]];
    if (feature && feature[selector] && !feature[selector].enabled) return acc;
    return [
      ...acc,
      ...[].slice
        .call(document.querySelectorAll(selector))
        .map(node => ({ node, selector })),
    ];
  }, []);

const getConfigFromNode = node => {
  const config = node.dataset && node.dataset.findifyConfig;
  if (config) return JSON.parse(config);
  return {};
};

export default ({ features = {}, selectors = {}, ...rest }) => {
  const nodes = [
    // Find nodes by selectors from config
    ...findNodesBySelector(features, selectors).map(({ selector, node }) => {
      const type = selectors[selector];

      return {
        node,
        initialHTML: node.innerHTML,
        type,
        config: {
          ...rest,
          ...(features[type][selector] || features[type]),
          ...getConfigFromNode(node),
          featureType: type,
          features,
        },
      };
    }),

    // Find nodes by className selector
    ...[].slice
      .call(document.querySelectorAll(`[class^='${classSelector}']`))
      .map(node => {
        const type = typeMapper(
          node.getAttribute('class').replace(classSelector, ''),
        );
        return {
          node,
          initialHTML: node.innerHTML,
          type,
          config: {
            ...rest,
            ...features[type],
            ...getConfigFromNode(node),
            featureType: type,
            features,
          },
        };
      }),

    // Find nodes by data-attr selector
    ...[].slice
      .call(document.querySelectorAll(`[${attrSelector}^="${attrPrefix}"]`))
      .filter(ignoreNodes)
      .map(node => {
        const type = typeMapper(
          node.getAttribute(attrSelector).replace(attrPrefix, ''),
        );
        return {
          node,
          initialHTML: node.innerHTML,
          type,
          config: {
            ...rest,
            ...features[type],
            ...getConfigFromNode(node),
            featureType: type,
            features,
          },
        };
      }),
  ];

  return nodes;
};
