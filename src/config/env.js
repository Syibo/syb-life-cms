import store from 'store';
import { getUrlParam } from '@/cool/utils';

// 路由模式
const routerMode = 'history';

// 请求地址
const baseUrl = (function() {
	let proxy = getUrlParam('proxy');

	if (proxy) {
		store.set('proxy', proxy);
	} else {
		proxy = store.get('proxy') || 'dev';
	}

	switch (process.env.NODE_ENV) {
		case 'development':
			return `/${proxy}/admin`;
		case 'production':
			return `/api/admin`;
		default:
			return '';
	}
})();

// 阿里字体图标库 https://at.alicdn.com/t/**.css
const iconfontUrl = ``;

export { routerMode, baseUrl, iconfontUrl };
