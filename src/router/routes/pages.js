export default [
	{
		path: '/login',
		name: 'login',
		component: () => import('@/pages/login/index.vue')
	},
	{
		path: '/login-h5',
		name: 'login-h5',
		component: () => import('@/pages/login/h5.vue')
	},
	{
		path: '/404',
		name: '404',
		component: () => import('@/pages/404/index.vue')
	},
	{
		path: '/403',
		name: '403',
		component: () => import('@/pages/403/index.vue')
	},
	{
		path: '/503',
		name: '503',
		component: () => import('@/pages/503/index.vue')
	},
	{
		path: '/500',
		name: '500',
		component: () => import('@/pages/500/index.vue')
	}
];
