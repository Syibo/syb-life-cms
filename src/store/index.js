import Vue from 'vue';
import Vuex from 'vuex';
import getters from './getters';
import process from './modules/process';
import menu from './modules/menu';
import user from './modules/user';

Vue.use(Vuex);

const store = new Vuex.Store({
	modules: {
		process,
		menu,
		user,
		main: {
			actions: {
				appLoad() {
					if (store.state.user.token) {
						store.dispatch('permMenu');
						store.dispatch('userInfo');
					}
				}
			}
		}
	},
	getters
});

export default store;
