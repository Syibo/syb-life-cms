export default {
	state: {
		list: [
			{
				label: '首页',
				value: '/',
				active: true
			}
		]
	},
	actions: {},
	mutations: {
		ADD_PROCESS(state, item) {
			const index = state.list.findIndex(e => e.value == item.value);

			state.list.map(e => {
				e.active = e.value == item.value;
			});

			if (index < 0) {
				if (item.value == '/') {
					item.label = '首页';
				}

				if (item.label) {
					state.list.push({
						...item,
						active: true
					});
				}
			}
		},

		DEL_PROCESS(state, index) {
			state.list.splice(index, 1);
		},

		SET_PROCESS(state, list) {
			state.list = list;
		},

		RESET_PROCESS(state) {
			state.list = [
				{
					label: '首页',
					value: '/',
					active: true
				}
			];
		}
	}
};
