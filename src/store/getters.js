const getters = {
	processList: state => state.process.list,
	menuGroup: state => state.menu.group,
	menuList: state => state.menu.menu,
	routes: state => state.menu.routes,
	menuCollapse: state => state.menu.collapse,
	token: state => state.user.token,
	userInfo: state => state.user.info,
	permission: state => state.menu.permission
};
export default getters;
