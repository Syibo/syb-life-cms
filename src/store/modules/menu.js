import store from '@/utils/store';
import { deepTree, revisePath, isArray } from '@/cool/utils/index';
import router from '@/router/index';

export default {
	state: {
		routes: store.get('viewRoutes') || [],
		group: store.get('menuGroup') || [],
		menu: [],
		permission: [],
		collapse: false,
		index: 0
	},
	actions: {
		permMenu({ commit, state }) {
			return new Promise((resolve, reject) => {
				this.$service.common
					.permMenu()
					.then(res => {
						if (!isArray(res.menus)) {
							console.warn('Invalid menus. Expected Array');
							res.menus = [];
						}

						if (!isArray(res.perms)) {
							console.warn('Invalid perms. Expected Array');
							res.perms = [];
						}

						const routes = res.menus
							.filter(e => e.type != 2)
							.map(e => {
								return {
									id: e.id,
									parentId: e.parentId,
									path: revisePath(e.router || e.id),
									viewPath: e.viewPath,
									type: e.type,
									name: e.name,
									icon: e.icon,
									orderNum: e.orderNum,
									meta: {
										keepAlive: e.keepAlive
									},
									children: []
								};
							});

						const menuGroup = deepTree(routes);

						commit('SET_PERMIESSION', res.perms);
						commit('SET_MENU_GROUP', menuGroup);
						commit(
							'SET_VIEW_ROUTES',
							routes.filter(e => e.type == 1)
						);
						commit('SET_MENU_LIST', state.index);

						resolve(menuGroup);
					})
					.catch(err => {
						reject(err);
					});
			});
		}
	},
	mutations: {
		SET_MENU_GROUP(state, list) {
			state.group = list;
			store.set('menuGroup', list);
		},

		SET_VIEW_ROUTES(state, list) {
			router.$plugin.addRoutes(list);

			state.routes = list;
			store.set('viewRoutes', list);
		},

		SET_MENU_LIST(state, index) {
			const item = state.group[index];

			state.index = index;
			state.menu = item ? item.children : [];
		},

		SET_PERMIESSION(state, list) {
			state.permission = list;
			store.set('permission', list);
		},

		COLLAPSE_MENU(state, val = false) {
			state.collapse = val;
		}
	}
};
