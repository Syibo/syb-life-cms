import axios from 'axios';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import store from '@/store/index';
import router from '@/router/index';
import { href } from '@/cool/utils/index';

axios.defaults.timeout = 600000;
axios.defaults.withCredentials = true;

axios.defaults.validateStatus = function(status) {
	return status >= 200 && status <= 500;
};

NProgress.configure({
	showSpinner: false
});

axios.interceptors.request.use(
	config => {
		if (config.url) {
			if (!['/login', '/captcha'].some(e => config.url.includes(e))) {
				config.headers['Authorization'] = store.state.user.token || '';
			}

			if (!['/sys/info/record'].some(e => config.url.includes(e))) {
				NProgress.start();
			}
		}

		return config;
	},
	error => {
		return Promise.reject(error);
	}
);

const onerror = async ({ url, status }) => {
	if (status == 401) {
		if (url.includes('/logout')) {
			store.dispatch('userRemove');
		} else {
			await store.dispatch('userLogout');
		}

		href('/login');
	}

	if (status == 403) {
		router.$plugin.to('/403');
	}

	if (status == 500) {
		router.$plugin.to('/500');
	}

	return Promise.reject();
};

// response
axios.interceptors.response.use(
	res => {
		NProgress.done();

		const { config, status } = res;

		if (res.status == 401) {
			return onerror({ url: config.url, status });
		}

		if (res.status == 403) {
			return onerror({ status });
		}

		if (res.status == 404) {
			return Promise.reject();
		}

		if (res.status == 500) {
			return onerror({ status });
		}

		const { code, data, message } = res.data;

		switch (code) {
			case 1000:
				return data;
			default:
				return Promise.reject(message);
		}
	},
	error => {
		console.error(error);

		NProgress.done();
		return Promise.reject(error);
	}
);

export default axios;
