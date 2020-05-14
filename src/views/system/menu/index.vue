<template>
	<div>
		<cl-crud @load="onLoad">
			<template #table-column-icon="{scope}">
				<icon-svg :name="scope.row.icon" size="20px"></icon-svg>
			</template>

			<template #table-column-perms="{scope}">
				<el-tag
					size="medium"
					v-for="(item, index) in scope.row.permList"
					:key="index"
					style="margin: 2px"
					>{{ item }}</el-tag
				>
			</template>

			<template #table-column-router="{scope}">
				<el-link type="primary" :href="scope.row.router" v-if="scope.row.type == 1">{{
					scope.row.router
				}}</el-link>
				<span v-else>{{ scope.row.router }}</span>
			</template>

			<template #table-column-keepAlive="{scope}">
				<template v-if="scope.row.type == 1">
					<i class="el-icon-check" v-if="scope.row.keepAlive"></i>
					<i class="el-icon-close" v-else></i>
				</template>
			</template>

			<template #slot-column-op="{scope}">
				<el-button
					type="text"
					size="mini"
					@click="upsertAppend(scope.row)"
					v-if="scope.row.type != 2"
					>新增</el-button
				>
			</template>
		</cl-crud>

		<cl-context-menu ref="context-menu"></cl-context-menu>
	</div>
</template>

<script>
import { deepTree } from '@/cool/utils/index';

export default {
	data() {
		return {
			crud: null
		};
	},

	methods: {
		onLoad({ ctx, app }) {
			this.crud = app;

			ctx.service(this.$service.system.menu)
				.set('dict', { api: { page: 'list' } })
				.set('table', {
					columns: [
						{
							prop: 'name',
							label: '名称',
							width: 200
						},
						{
							prop: 'icon',
							label: '图标',
							align: 'center',
							width: 80
						},
						{
							prop: 'type',
							label: '类型',
							align: 'center',
							width: 100,
							dict: [
								{
									label: '目录',
									value: 0
								},
								{
									label: '菜单',
									value: 1
								},
								{
									label: '权限',
									value: 2
								}
							]
						},
						{
							prop: 'router',
							label: '节点路由',
							align: 'center',
							'min-width': 160
						},
						{
							prop: 'keepAlive',
							label: '路由缓存',
							align: 'center',
							width: 100
						},
						{
							prop: 'viewPath',
							label: '文件路径',
							align: 'center',
							'min-width': 200,
							'show-overflow-tooltip': true
						},
						{
							prop: 'perms',
							label: '权限',
							'header-align': 'center',
							'min-width': 300
						},
						{
							prop: 'orderNum',
							label: '排序号',
							align: 'center',
							width: 100
						},
						{
							prop: 'updateTime',
							label: '更新时间',
							align: 'center',
							sortable: true,
							width: 180
						}
					],
					props: {
						'row-key': 'id'
					},
					on: {
						'row-click': (row, column) => {
							if (column.property && row.children) {
								app.refs('table').toggleRowExpansion(row);
							}
						},

						'row-contextmenu': (row, column, event) => {
							let list = [
								{
									label: '编辑',
									callback: (e, close) => {
										app.edit(row);
										close();
									}
								},
								{
									label: '删除',
									callback: (e, close) => {
										app.delete(row);
										close();
									}
								}
							];

							if (row.type != 2) {
								list.unshift({
									label: '新增',
									callback: (e, close) => {
										this.upsertAppend(row);
										close();
									}
								});
							}

							if (row.type == 1) {
								list.push({
									label: '权限',
									callback: (e, close) => {
										this.setPermission(row);
										close();
									}
								});
							}

							this.$refs['context-menu'].open(event, {
								list
							});

							event.preventDefault();
						}
					},
					op: {
						props: {
							width: '200'
						},

						layout: ['slot-column-op', 'edit', 'delete']
					}
				})
				.set('upsert', {
					props: {
						width: '600px'
					},
					items: [
						{
							prop: 'type',
							value: 0,
							label: '节点类型',
							span: 24,
							component: {
								name: 'el-radio-group',
								options: [
									{
										label: '目录',
										value: 0
									},
									{
										label: '菜单',
										value: 1
									},
									{
										label: '权限',
										value: 2
									}
								],
								on: {
									change: index => {
										this.changeType(index);
									}
								}
							}
						},
						{
							prop: 'name',
							label: '节点名称',
							span: 24,
							component: {
								name: 'el-input',
								attrs: {
									placeholder: '请输入节点名称'
								}
							},

							rules: {
								required: true,
								message: '名称不能为空'
							}
						},
						{
							prop: 'parentId',
							label: '上级节点',
							span: 24,
							component: {
								name: 'cl-menu-tree'
							}
						},
						{
							prop: 'router',
							label: '节点路由',
							span: 24,
							hidden: true,
							component: {
								name: 'el-input',
								attrs: {
									placeholder: '请输入节点路由'
								}
							}
						},
						{
							prop: 'keepAlive',
							value: true,
							label: '路由缓存',
							span: 24,
							component: {
								name: 'el-radio-group',
								options: [
									{
										label: '开启',
										value: true
									},
									{
										label: '关闭',
										value: false
									}
								]
							}
						},
						{
							prop: 'viewPath',
							label: '文件路径',
							span: 24,
							hidden: true,
							component: {
								name: 'cl-menu-file-path'
							}
						},
						{
							prop: 'icon',
							label: '节点图标',
							span: 24,
							component: {
								name: 'cl-menu-icons'
							}
						},
						{
							prop: 'orderNum',
							label: '排序号',
							span: 24,
							component: {
								name: 'el-input-number',
								props: {
									placeholder: '请填写排序号',
									min: 0,
									max: 99,
									'controls-position': 'right'
								}
							}
						},
						{
							prop: 'perms',
							label: '权限',
							span: 24,
							hidden: true,
							component: {
								name: 'cl-menu-perms'
							}
						}
					]
				})
				.set('layout', [['refresh-btn', 'add-btn'], ['data-table']])
				.on('refresh', (params, { render }) => {
					this.$service.system.menu.list().then(list => {
						list.map(e => {
							e.permList = e.perms ? e.perms.split(',') : [];
						});

						render(deepTree(list));
						this.$store.dispatch('permMenu');
					});
				})
				.on('open', (status, data) => {
					this.changeType(data ? data.type : 0);
				})
				.done();

			app.refresh();
		},

		changeType(index) {
			this.crud.setData('upsert.items[prop:router].hidden', index != 1);
			this.crud.setData('upsert.items[prop:icon].hidden', index == 2);
			this.crud.setData('upsert.items[prop:viewPath].hidden', index != 1);
			this.crud.setData('upsert.items[prop:keepAlive].hidden', index != 1);
			this.crud.setData('upsert.items[prop:perms].hidden', index != 2);
		},

		upsertAppend({ type, id }) {
			this.crud.append({
				parentId: id,
				type: type + 1
			});
		},

		setPermission({ id }) {
			this.crud.append({
				parentId: id,
				type: 2
			});
		},

		toUrl(url) {
			this.$router.push(url);
		}
	}
};
</script>
