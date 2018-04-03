const createHash = require('webpack/lib/util/createHash');

const getPath = (base, path) => {
  const index = path.indexOf(base);
  if (!~index) return;
  return path.substring(index + base.length);
}

class HashedPlugin {
	constructor(options) {
		this.options = Object.assign(
			{
				context: null,
				hashFunction: "md4",
				hashDigest: "base64",
				hashDigestLength: 4
			},
			options
		);
	}

	apply(compiler) {
		const options = this.options;
		compiler.hooks.compilation.tap("HashedPlugin", compilation => {
			// const usedIds = new Set();
			compilation.hooks.beforeModuleIds.tap(
				"HashedPlugin",
				modules => {
					for (const module of modules) {
						if (module.id === null && module.libIdent) {
							const id = module.libIdent({
								context: this.options.context || compiler.options.context
              });
              const _path = getPath('react-components/src/', id) ||
                            getPath('node_modules/', id) ||
                            id;
              const _hash = createHash('md4')
                .update(_path)
                .digest(options.hashDigest)
                .substr(0, options.hashDigestLength);
              module.id = _hash;
						}
					}
				}
			);
		});
	}
}

module.exports = HashedPlugin;
