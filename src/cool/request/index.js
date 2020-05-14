import Vue from 'vue';
import path from 'path';

export function SET_SERVICE({ store }) {
	const files = require.context('@/service/', true, /\.js$/);
	const ignore = ['./request.js'];

	let modules = {};

	Vue.prototype.$service = modules;
	store.$service = modules;

	const promises = files
		.keys()
		.filter(e => !ignore.includes(e))
		.map(e => {
			if (e.includes('--ignore')) {
				return false;
			}

			return new Promise(resolve => {
				const list = e.substr(2).split('/');
				const parents = list.slice(0, list.length - 1);
				const name = path.basename(e, '.js');

				let curr = modules;
				let prev = null;
				let key = null;

				parents.forEach(k => {
					if (!curr[k]) {
						curr[k] = {};
					}

					prev = curr;
					curr = curr[k];
					key = k;
				});

				let n = e.replace('./', '');

				import(`@/service/${n}`).then(ep => {
					if (ep.default) {
						const service = new ep.default();

						if (name == 'index') {
							prev[key] = service;
						} else {
							curr[name] = service;
						}
					} else {
						console.error(`Service must export default [${e}]`);
					}

					resolve();
				});
			});
		});

	return Promise.all(promises);
}
