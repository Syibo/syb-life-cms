const path = require('path');

const isProduction = process.env.NODE_ENV === 'production';

function resolve(dir) {
	return path.join(__dirname, dir);
}

// cdn列表，有需求自行开启
// const cdn = {
// 	dev: {
// 		css: ['https://cdn.bootcss.com/element-ui/2.13.0/theme-chalk/index.css']
// 	},
// 	pro: {
// 		css: [
// 			'https://cdn.bootcss.com/nprogress/0.2.0/nprogress.min.css',
// 			'https://cdn.bootcss.com/quill/2.0.0-dev.3/quill.core.min.css',
// 			'https://cdn.bootcss.com/viewerjs/1.3.7/viewer.min.css',
// 			'https://cdn.bootcss.com/element-ui/2.13.0/theme-chalk/index.css'
// 		],
// 		js: [
// 			'https://cdn.bootcss.com/vue/2.6.10/vue.min.js',
// 			'https://cdn.bootcss.com/vue-router/3.1.3/vue-router.min.js',
// 			'https://cdn.bootcss.com/vuex/3.1.1/vuex.min.js',
// 			'https://cdn.bootcss.com/clipboard.js/2.0.4/clipboard.min.js',
// 			'https://cdn.bootcss.com/axios/0.19.0-beta.1/axios.min.js',
// 			'https://cdn.bootcss.com/nprogress/0.2.0/nprogress.min.js',
// 			'https://cdn.bootcss.com/Mock.js/1.0.1-beta3/mock-min.js',
// 			'https://cdn.bootcss.com/quill/2.0.0-dev.3/quill.min.js',
// 			'https://cdn.bootcss.com/element-ui/2.13.0/index.js',
// 			'https://cdn.bootcss.com/viewerjs/1.3.7/viewer.min.js',
// 			'https://cdn.bootcss.com/echarts/4.4.0-rc.1/echarts.min.js',
// 			'https://cdn.jsdelivr.net/npm/vue-echarts@4.0.2'
// 		]
// 	}
// };

module.exports = {
	publicPath: '/',
	lintOnSave: true,
	productionSourceMap: false,
	parallel: require('os').cpus().length > 1,

	css: {
		extract: isProduction,
		sourceMap: false,
		loaderOptions: {
			stylus: {
				import: '~@/assets/css/common.styl'
			}
		}
	},

	devServer: {
		port: 9000,
		open: false,
		compress: false,
		overlay: {
			warnings: false,
			errors: true
		},

		proxy: {
			'/dev': {
				target: 'http://127.0.0.1:7001',
				changeOrigin: true,
				pathRewrite: { '^/dev': '' }
			},
			'/pro': {
				target: 'http://47.107.48.44:7001',
				changeOrigin: true,
				pathRewrite: { '^/pro': '/api' }
			}
		}
	},

	chainWebpack: config => {
		// svg
		config.module.rule('svg').uses.clear();

		config.module
			.rule('svg-sprite-loader')
			.test(/.svg$/)
			.exclude.add(/node_modules/)
			.end()
			.use('svg-sprite-loader')
			.loader('svg-sprite-loader')
			.options({
				symbolId: '[name]'
			});

		// 去掉元素之间空格
		config.module
			.rule('vue')
			.use('vue-loader')
			.loader('vue-loader')
			.tap(options => {
				options.compilerOptions.preserveWhitespace = true;
				return options;
			})
			.end();

		// 引入cdn
		// config.plugin('html').tap(args => {
		// 	args[0].cdn = cdn[isProduction ? 'pro' : 'dev'];
		// 	return args;
		// });

		if (isProduction) {
			config.performance.set('hints', false);

			config.optimization.splitChunks({
				chunks: 'all',
				cacheGroups: {
					libs: {
						name: 'chunk-libs',
						test: /[\\/]node_modules[\\/]/,
						priority: 10,
						chunks: 'initial'
					},
					commons: {
						name: 'chunk-cool',
						test: resolve('src/cool'),
						minChunks: 3,
						priority: 5,
						reuseExistingChunk: true
					}
				}
			});
		}
	},

	configureWebpack: config => {
		if (isProduction) {
			// 打包忽略。配合cdn使用
			// config.externals = {
			// 	vue: 'Vue',
			// 	'vue-router': 'VueRouter',
			// 	'element-ui': 'ELEMENT',
			// 	vuex: 'Vuex',
			// 	axios: 'axios',
			// 	mockjs: 'Mock',
			// 	nprogress: 'NProgress',
			// 	quill: 'Quill',
			// 	viewer: 'Viewer',
			// 	echarts: 'echarts',
			// 	'vue-echarts': 'VueECharts'
			// };
		}
	}
};
