import Vue from 'vue';
import App from './App.vue';
import ElementUI from 'element-ui';
import Viewer from 'v-viewer';
import { bootstrap } from '@/cool/core';

import router from '@/router';
import routes from '@/router/routes/views';
import store from '@/store';

import '@/mock';
import '@/icons/index';
import '@/filter/index';
import '@/assets/css/element-variables.scss';
import 'viewerjs/dist/viewer.css';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(Viewer);
Vue.use(ElementUI);

Vue.config.productionTip = false;

const conf = {
	store,
	router,
	['view-routes']: routes,
	['cl-crud']: {
		crud: {
			dict: {
				sort: {
					prop: 'order',
					order: 'sort'
				}
			},
			fn: {
				permission(that) {
					const { permission } = that.$store.state.menu;
					const { add, delete: del, update } = that.service.permission || {};

					return {
						add: permission.includes(add),
						delete: permission.includes(del),
						update: permission.includes(update)
					};
				}
			}
		}
	}
};

bootstrap(conf).then(({ router, store }) => {
	store.dispatch('appLoad');

	new Vue({
		router,
		store,
		render: h => h(App)
	}).$mount('#app');
});
