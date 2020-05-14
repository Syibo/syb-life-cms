import Mock from 'mockjs';
import { getUrlParams } from './utils';

let userList = [
	{
		id: 1,
		name: '刘一',
		process: 42.2,
		endTime: '2019年09月02日',
		price: 75.99,
		salesRate: 52.2,
		salesStatus: 1
	},
	{
		id: 2,
		name: '陈二',
		process: 35.2,
		endTime: '2019年09月05日',
		price: 242.1,
		salesRate: 72.1,
		salesStatus: 1
	},
	{
		id: 3,
		name: '张三',
		process: 10.2,
		endTime: '2019年09月12日',
		price: 74.11,
		salesRate: 23.9,
		salesStatus: 0
	},
	{
		id: 4,
		name: '李四',
		process: 75.5,
		endTime: '2019年09月13日',
		price: 276.64,
		salesRate: 47.2,
		salesStatus: 0
	},
	{
		id: 5,
		name: '王五',
		process: 25.4,
		endTime: '2019年09月18日',
		price: 160.23,
		salesRate: 28.3,
		salesStatus: 1
	},
	{
		id: 6,
		name: '赵六',
		process: 9.8,
		endTime: '2019年09月20日',
		price: 219.52,
		salesRate: 24.4,
		salesStatus: 0
	}
];

Mock.setup({
	timeout: '300'
});

Mock.mock(RegExp('/test/page' + '.*'), 'get', req => {
	let { page, size, salesStatus = '', keyWord = '', id = '', name = '' } = getUrlParams(req.url);

	let list = userList
		.filter(e => {
			if (salesStatus !== '') {
				return e.salesStatus == salesStatus;
			}

			return e;
		})
		.filter(e => {
			if (id) {
				return e.id == id;
			}

			if (name) {
				return e.name.includes(name);
			}

			if (keyWord) {
				return e.id == keyWord || e.name.includes(keyWord);
			}

			return e;
		})
		.slice((page - 1) * size, page * size);

	let total = list.length;

	return {
		code: 1000,
		data: {
			list,
			pagination: {
				pageSize: size,
				total,
				current: page
			}
		}
	};
});

Mock.mock(RegExp('/test/info' + '.*'), 'get', req => {
	let { id } = getUrlParams(req.url);

	return {
		code: 1000,
		data: userList.find(e => e.id == id)
	};
});

Mock.mock(RegExp('/test/update' + '.*'), 'post', req => {
	let d = JSON.parse(req.body);

	userList = userList.map(e => {
		if (e.id == d.id) {
			return Object.assign(e, d);
		}

		return e;
	});

	return {
		code: 1000
	};
});

Mock.mock(RegExp('/test/add' + '.*'), 'post', req => {
	let d = JSON.parse(req.body);

	d.id =
		Math.max.apply(
			this,
			userList.map(e => e.id)
		) + 1;

	userList.push(d);

	return {
		code: 1000
	};
});

Mock.mock(RegExp('/test/delete' + '.*'), 'post', req => {
	let { ids } = JSON.parse(req.body);

	ids = ids.split(',').map(Number);

	console.log(ids);

	userList = userList.filter(e => !ids.includes(e.id));

	return {
		code: 1000
	};
});
