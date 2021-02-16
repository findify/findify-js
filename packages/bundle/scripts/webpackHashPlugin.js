const getPath = (base, path) => {
  const index = path.lastIndexOf(base);
	if (!~index) return;
	const raw = path.substr(index + base.length);
	const stripExt = raw.substr(0, raw.lastIndexOf('.')) || raw;
	return stripExt.substr(0, stripExt.lastIndexOf('/index')) || stripExt;
}

const cache = new Map();

const findModulePath = (path, issuer, module) => {
	const { rawRequest, context } = module;

	if (
		issuer &&
		rawRequest &&
		issuer.context &&
		!issuer.context.includes('node_modules') &&
		path.includes('node_modules') &&
		!['!', '.'].includes(rawRequest[0])
	){
		return rawRequest;
	}

	return getPath('react-components/src/', path) ||
		getPath('node_modules/', path) ||
		getPath('../', path) ||
		path;
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
			const mainTemplate = compilation.mainTemplate;

			mainTemplate.hooks.requireExtensions.tap("HashedPlugin", (source, chunk, hash) => {

				const scripts = Object.keys(chunk.getChunkMaps().name)
					.map(c => `'${c}'`)
					.join(',')
				
				const ignoredModules = (options.ignoreModulesCache || [])
					.map(key => `'${key}': __cache['${key}']`)
					.join(',')
				
				return source + `
						__webpack_require__.chunks = [${scripts}];
						__webpack_require__.frozen = false;
						__webpack_require__.invalidate = function() {
						var __cache = __webpack_module_cache__;
						__webpack_module_cache__ = {${ignoredModules}};
						__webpack_require__.frozen = true;
						__cache = null;
					};

					var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
			 			var [chunkIds, moreModules, runtime] = data;
			 			// add "moreModules" to the modules object,
			 			// then flag all "chunkIds" as loaded and fire callback
			 			var moduleId, chunkId, i = 0, resolves = [];
			 			for(;i < chunkIds.length; i++) {
			 				chunkId = chunkIds[i];
			 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
			 					resolves.push(installedChunks[chunkId][0]);
			 				}
			 				installedChunks[chunkId] = 0;
			 			}
			 			for(moduleId in moreModules) {
							if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
								if (chunkIds[0] === 'extra' || !modules[moduleId] || !__webpack_require__.frozen) {
									modules[moduleId] = moreModules[moduleId];
								}
							}
						}
			 			if(runtime) runtime(__webpack_require__);
			 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
			 			while(resolves.length) {
			 				resolves.shift()();
			 			}
					 
			 		}
				`
			})

			compilation.hooks.beforeModuleIds.tap(
				"HashedPlugin",
				modules => {
					const { moduleGraph, chunkGraph } = compilation;

					for (const module of modules) {
						if (!module.libIdent) continue;
		
						const id = module.libIdent({
							context: this.options.context || compiler.options.context
						});

						if (id.includes('.css') && id.includes('css-loader')) continue;

						if (cache.has(id)) {
							chunkGraph.setModuleId(module, cache.get(id))
							continue;
						}

						const _path = findModulePath(id, moduleGraph.getIssuer(module), module);

						let _hash = require("crypto")
							.createHash('md5')
							.update(options.mapping[_path] || _path)
							.digest('base64')
							.substr(0, 4);

						cache.set(id, _hash);

						chunkGraph.setModuleId(module, _hash);
					}
				}
			);
		});
	}
}

module.exports = HashedPlugin;
