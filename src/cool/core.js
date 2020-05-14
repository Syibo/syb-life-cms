import { SET_SERVICE } from './request';
import { SET_CRUD } from './crud';
import { SET_ROUTER } from './router';

import './index';

export async function bootstrap(options) {
	const { store, router, ['view-routes']: routes, ['cl-crud']: crud } = options;

	await SET_SERVICE({ store });
	SET_CRUD({ crud });
	SET_ROUTER({ router, routes });

	return { router, store };
}
