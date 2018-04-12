const getPath = (base, path) => {
  const index = path.lastIndexOf(base);
	if (!~index) return;
	const raw = path.substr(index + base.length);
	const stripExt = raw.substr(0, raw.lastIndexOf('.')) || raw;
	return stripExt.substr(0, stripExt.lastIndexOf('/index')) || stripExt;
}

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
						if (module.id === null && module.libIdent) {
							const id = module.libIdent({
								context: this.options.context || compiler.options.context
							});
							
              const _path = getPath('react-components/src/', id) ||
                            getPath('node_modules/', id) ||
														id;

							const _hash = require("crypto")
								.createHash('md5')
								.update(_path)
								.digest('base64')
								.substr(0, 4);

              module.id = _hash;
						}
					}
				}
			);
		});
	}
}

module.exports = HashedPlugin;
