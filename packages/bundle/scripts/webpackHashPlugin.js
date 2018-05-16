const getPath = (base, path) => {
  const index = path.lastIndexOf(base);
	if (!~index) return;
	const raw = path.substr(index + base.length);
	const stripExt = raw.substr(0, raw.lastIndexOf('.')) || raw;
	return stripExt.substr(0, stripExt.lastIndexOf('/index')) || stripExt;
}

const cache = new Map();

class HashedPlugin {
	constructor(options) {
		this.options = Object.assign(
			{
				context: null,
				hashFunction: "md5",
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
						if (module.libIdent) {
							const id = module.libIdent({
								context: this.options.context || compiler.options.context
							});
	
							if (id.includes('.css') && id.includes('css-loader')) continue;
							if (cache.has(id)) {
								module.id = cache.get(id);
								continue;
							}

              const _path = getPath('react-components/src/', id) ||
                            getPath('node_modules/', id) ||
                            getPath('../', id) ||
														id;

							const _hash = require("crypto")
								.createHash('md5')
								.update(_path)
								.digest('base64')
								.substr(0, 4);
							cache.set(id, _hash);

              module.id = _hash;
						}
					}
				}
			);
		});
	}
}

module.exports = HashedPlugin;
