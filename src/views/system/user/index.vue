<template>
	<div class="system-user">
		<div class="_box">
			<div class="dept scroller1" :class="[dept.expand ? '_collapse' : '_expand']">
				<div class="label">
					<div>组织架构</div>

					<ul>
						<li>
							<el-tooltip content="刷新">
								<i class="el-icon-refresh" @click="deptRefresh()"></i>
							</el-tooltip>
						</li>

						<li>
							<el-tooltip content="拖动排序">
								<i class="el-icon-s-operation" @click="dept.isDrag = true"></i>
							</el-tooltip>
						</li>

						<li class="no" v-show="dept.isDrag">
							<el-button type="text" size="mini" @click="deptOrder(true)"
								>保存</el-button
							>
							<el-button type="text" size="mini" @click="deptOrder(false)"
								>取消</el-button
							>
						</li>
					</ul>
				</div>

				<div class="container" @contextmenu.prevent="deptCM">
					<el-tree
						:data="dept.list"
						:props="{
							label: 'name'
						}"
						:draggable="dept.isDrag"
						:allow-drag="deptAllowDrag"
						:allow-drop="deptAllowDrop"
						v-loading="dept.loading"
						node-key="id"
						highlight-current
						default-expand-all
						:expand-on-click-node="false"
						@node-contextmenu="deptCM"
						@node-click="deptClick"
					></el-tree>
				</div>
			</div>

			<div class="user">
				<div class="label">
					<div>成员列表</div>
				</div>

				<div class="container">
					<cl-crud @load="onLoad">
						<!-- 头像 -->
						<template #table-column-headImg="{scope}">
							<cl-avatar
								shape="square"
								size="medium"
								:src="scope.row.headImg | default_avatar"
								:style="{ margin: 'auto' }"
							>
							</cl-avatar>
						</template>

						<!-- 状态 -->
						<template #table-column-status="{scope}">
							<el-tag v-if="scope.row.status == 1" size="medium" type="success"
								>启用</el-tag
							>
							<el-tag v-else size="medium" type="danger">禁用</el-tag>
						</template>

						<!-- 权限 -->
						<template #table-column-roleName="{scope}">
							<el-tag
								size="medium"
								disable-transitions
								v-for="(item, index) in scope.row.roleNameList"
								:key="index"
								style="margin: 2px"
								>{{ item }}</el-tag
							>
						</template>

						<!-- 批量转移 -->
						<template #slot-multi-move>
							<el-button
								v-permission="$service.system.user.permission.move"
								size="mini"
								type="success"
								:disabled="selects.ids.length == 0"
								@click="toMove()"
								>转移</el-button
							>
						</template>

						<!-- 单个转移 -->
						<template #slot-move="{ scope }">
							<el-button
								v-permission="$service.system.user.permission.move"
								type="text"
								size="mini"
								@click="toMove(scope.row)"
								>转移</el-button
							>
						</template>
					</cl-crud>
				</div>
			</div>

			<div
				class="icon-arrow"
				:class="[dept.expand ? '_collapse' : '_expand']"
				@click="deptExpand"
			>
				<i class="el-icon-arrow-right" v-if="dept.expand"></i>
				<i class="el-icon-arrow-left" v-else></i>
			</div>
		</div>

		<cl-form ref="cl-form">
			<!-- 部门转移 -->
			<template #slot-move-dept="{}">
				<div class="system-user-move-dept">
					<el-tree
						:data="dept.list"
						:props="{
							label: 'name'
						}"
						node-key="id"
						highlight-current
						@node-click="moveDeptClick"
					></el-tree>
				</div>
			</template>
		</cl-form>

		<cl-context-menu ref="context-menu"> </cl-context-menu>
	</div>
</template>

<script>
import { deepTree, isArray, revDeepTree } from '@/cool/utils/index';

export default {
	data() {
		return {
			crud: null,
			dept: {
				isDrag: false,
				loading: false,
				expand: true,
				list: []
			},
			selects: {
				dept: {},
				ids: []
			}
		};
	},

	created() {
		this.deptRefresh();
	},

	methods: {
		refresh(params) {
			this.crud.refresh(params);
		},

		onLoad({ ctx, app }) {
			this.crud = app;

			ctx.service(this.$service.system.user)
				.set('table', {
					columns: [
						{
							type: 'selection',
							align: 'center',
							width: '60'
						},
						{
							prop: 'headImg',
							label: '头像',
							align: 'center',
							slot: true
						},
						{
							prop: 'name',
							label: '姓名',
							align: 'center',
							'min-width': 150
						},
						{
							prop: 'username',
							label: '用户名',
							align: 'center',
							'min-width': 150
						},
						{
							prop: 'nickName',
							label: '昵称',
							align: 'center',
							'min-width': 150
						},
						{
							prop: 'departmentName',
							label: '部门名称',
							align: 'center',
							emptyText: '无',
							'min-width': 150
						},
						{
							prop: 'roleName',
							label: '角色',
							'header-align': 'center',
							emptyText: '无',
							'min-width': 200
						},
						{
							prop: 'phone',
							label: '手机号码',
							align: 'center',
							'min-width': 150,
							emptyText: '无'
						},
						{
							prop: 'remark',
							label: '备注',
							align: 'center',
							'min-width': 150,
							emptyText: '无'
						},
						{
							prop: 'status',
							label: '状态',
							align: 'center',
							'min-width': 150
						},
						{
							prop: 'createTime',
							label: '创建时间',
							align: 'center',
							sortable: true,
							width: 150
						}
					],

					props: {
						'default-sort': {
							prop: 'createTime',
							order: 'descending'
						}
					},

					on: {
						'selection-change': selection => {
							this.selects.ids = selection.map(e => e.id);
						}
					},

					op: {
						layout: ['slot-move', 'edit', 'delete']
					}
				})
				.set('upsert', {
					props: {
						with: '800px'
					},

					items: [
						{
							prop: 'headImg',
							label: '头像',
							span: 24,
							component: {
								name: 'cl-upload'
							}
						},
						{
							prop: 'name',
							label: '姓名',
							span: 24,
							component: {
								name: 'el-input',
								props: {
									placeholder: '请填写姓名'
								}
							},
							rules: {
								required: true,
								message: '姓名不能为空'
							}
						},
						{
							prop: 'nickName',
							label: '昵称',
							span: 12,
							component: {
								name: 'el-input',
								props: {
									placeholder: '请填写昵称'
								}
							},
							rules: {
								required: true,
								message: '昵称不能为空'
							}
						},
						{
							prop: 'username',
							label: '用户名',
							span: 12,
							component: {
								name: 'el-input',
								props: {
									placeholder: '请填写用户名'
								}
							},
							rules: [
								{
									required: true,
									message: '用户名不能为空'
								}
							]
						},
						{
							prop: 'password',
							label: '密码',
							span: 12,
							hidden: true,
							component: {
								name: 'el-input',
								props: {
									placeholder: '请填写密码',
									type: 'password'
								}
							},
							rules: [
								{
									min: 6,
									max: 16,
									message: '密码长度在 6 到 16 个字符'
								}
							]
						},
						{
							prop: 'roleIdList',
							label: '角色',
							span: 24,
							value: [],
							component: {
								name: 'cl-role-select',
								props: {
									props: {
										'multiple-limit': 3
									}
								}
							},
							rules: {
								required: true,
								message: '角色不能为空'
							}
						},
						{
							prop: 'phone',
							label: '手机号码',
							span: 12,
							component: {
								name: 'el-input',
								props: {
									placeholder: '请填写手机号码'
								}
							}
						},
						{
							prop: 'email',
							label: '邮箱',
							span: 12,
							component: {
								name: 'el-input',
								props: {
									placeholder: '请填写邮箱'
								}
							}
						},
						{
							prop: 'remark',
							label: '备注',
							span: 24,
							component: {
								name: 'el-input',
								props: {
									type: 'textarea',
									rows: 4
								}
							}
						},
						{
							prop: 'status',
							label: '状态',
							value: 1,
							component: {
								name: 'el-radio-group',
								options: [
									{
										label: '开启',
										value: 1
									},
									{
										label: '关闭',
										value: 0
									}
								]
							}
						},
						{
							prop: 'tips',
							hidden: true,
							component: (
								<div>
									<i class="el-icon-warning"></i>
									<span style="margin-left: 6px">新增用户默认密码为：123456</span>
								</div>
							)
						}
					]
				})
				.set('layout', [
					[
						'refresh-btn',
						'add-btn',
						'multi-delete-btn',
						'slot-multi-move',
						'flex1',
						'search-key'
					],
					['data-table'],
					['flex1', 'pagination']
				])
				.on('open', f => {
					app.setData('upsert.items[prop:password].hidden', !f);
					app.setData('upsert.items[prop:tips].hidden', f);
				})
				.on('submit', (isEdit, data, { next }) => {
					let departmentId = this.selects.dept.id;

					if (!departmentId) {
						departmentId = this.dept.list[0].id;
					}

					next({
						...data,
						departmentId
					});
				})
				.on('refresh', async (params, { next, render }) => {
					let { list } = await next(params);

					list.map(e => {
						if (e.roleName) {
							this.$set(e, 'roleNameList', e.roleName.split(','));
						}

						e.status = Boolean(e.status);
					});

					render(list);
				})
				.done();

			app.refresh();
		},

		deptRefresh() {
			this.dept.isDrag = false;
			this.dept.loading = true;

			this.$service.system.dept
				.list()
				.then(res => {
					this.dept.list = deepTree(res);
				})
				.done(() => {
					this.dept.loading = false;
				});
		},

		deptCM(e, d) {
			let list = [
				{
					label: '新增',
					'suffix-icon': 'el-icon-plus',
					callback: (item, done) => {
						this.deptEdit({
							name: '',
							parentName: d.name,
							parentId: d.id
						});
						done();
					}
				},
				{
					label: '编辑',
					'suffix-icon': 'el-icon-edit',
					callback: (item, done) => {
						this.deptEdit(d);
						done();
					}
				}
			];

			if (!d) {
				d = this.dept.list[0];
			}

			if (d.parentId) {
				list.push({
					label: '删除',
					'suffix-icon': 'el-icon-delete',
					callback: (item, done) => {
						this.deptDel(d);
						done();
					}
				});
			}

			list.push({
				label: '新增成员',
				'suffix-icon': 'el-icon-user',
				callback: (item, done) => {
					this.crud.append();
					done();
				}
			});

			this.$refs['context-menu'].open(e, {
				list
			});
		},

		deptExpand() {
			this.dept.expand = !this.dept.expand;
		},

		deptClick(e) {
			this.$refs['context-menu'].close();

			this.selects.dept = e;

			let ids = revDeepTree(e.children).map(e => e.id);

			ids.unshift(e.id);

			this.refresh({ departmentIds: ids.join(',') });
		},

		deptAllowDrag({ data }) {
			return data.parentId;
		},

		deptAllowDrop(draggingNode, dropNode) {
			return dropNode.data.parentId;
		},

		deptEdit(e) {
			const method = e.id ? 'update' : 'add';

			this.$refs['cl-form'].open({
				props: {
					title: '编辑部门',
					width: '550px',
					'label-width': '100px'
				},
				items: [
					{
						label: '部门名称',
						prop: 'name',
						value: e.name,
						component: {
							name: 'el-input',
							attrs: {
								placeholder: '请填写部门名称'
							}
						},
						rules: {
							required: true,
							message: '部门名称不能为空'
						}
					},
					{
						label: '上级部门',
						prop: 'parentId',
						value: e.parentName || '...',
						component: {
							name: 'el-input',
							attrs: {
								disabled: true
							}
						}
					},
					{
						label: '排序',
						prop: 'orderNum',
						value: e.orderNum || 0,
						component: {
							name: 'el-input-number',
							props: {
								'controls-position': 'right',
								min: 0,
								max: 100
							}
						}
					}
				],
				on: {
					submit: ({ data, done, close }) => {
						this.$service.system.dept[method]({
							id: e.id,
							parentId: e.parentId,
							name: data.name,
							orderNum: data.orderNum
						})
							.then(() => {
								this.$message.success(`新增部门${data.name}成功`);
								close();
								this.deptRefresh();
							})
							.catch(err => {
								this.$message.error(err);
								done();
							});
					}
				}
			});
		},

		deptDel(e) {
			const del = f => {
				this.$service.system.dept
					.delete({
						ids: e.id,
						deleteUser: f
					})
					.then(() => {
						if (f) {
							this.$message.success('删除成功');
						} else {
							this.$confirm('该部门用户已移动到部门顶级', '删除成功');
						}
					})
					.done(() => {
						this.deptRefresh();
					});
			};

			this.$confirm('该操作会删除部门下的所有用户，是否确认？', '提示', {
				type: 'warning',
				confirmButtonText: '直接删除',
				cancelButtonText: '保留用户',
				distinguishCancelAndClose: true
			})
				.then(() => {
					del(true);
				})
				.catch(action => {
					if (action == 'cancel') {
						del(false);
					}
				});
		},

		deptOrder(f) {
			if (f) {
				this.$confirm('部门架构已发生改变，是否保存？', '提示', {
					type: 'warning'
				})
					.then(() => {
						const deep = (list, pid) => {
							list.forEach(e => {
								e.parentId = pid;
								ids.push(e);

								if (e.children && isArray(e.children)) {
									deep(e.children, e.id);
								}
							});
						};

						let ids = [];

						deep(this.dept.list, null);

						this.$service.system.dept
							.order(
								ids.map((e, i) => {
									return {
										id: e.id,
										parentId: e.parentId,
										orderNum: i
									};
								})
							)
							.then(() => {
								this.$message.success('更新排序成功');
							})
							.catch(err => {
								this.$message.error(err);
							})
							.done(() => {
								this.deptRefresh();
								this.dept.isDrag = false;
							});
					})
					.catch(() => {});
			} else {
				this.deptRefresh();
			}
		},

		async toMove(e) {
			let ids = [];

			if (!e) {
				ids = this.selects.ids;
			} else {
				ids = [e.id];
			}

			let that = this;

			this.$refs['cl-form'].open({
				props: {
					title: '部门转移',
					width: '600px',
					'label-width': '80px'
				},
				items: [
					{
						label: '选择部门',
						prop: 'dept',
						component: {
							name: 'system-user-move-dept',

							methods: {
								selectRow(e) {
									this.$emit('input', e);
								}
							},

							render() {
								return (
									<div class="system-user-move-dept">
										<el-tree
											data={that.dept.list}
											{...{
												props: {
													props: {
														label: 'name'
													}
												}
											}}
											node-key="id"
											highlight-current
											on-node-click={this.selectRow}></el-tree>
									</div>
								);
							}
						}
					}
				],
				on: {
					submit: ({ data, done, close }) => {
						if (!data.dept) {
							this.$message.warning('请选择部门');
							return done();
						}

						const { name, id } = data.dept;

						this.$confirm(`是否将用户转移到部门 ${name} 下`, '提示', {
							type: 'warning'
						})
							.then(() => {
								this.$service.system.user
									.move({
										departmentId: id,
										userIds: ids
									})
									.then(() => {
										this.$message.success('转移成功');
										close();
										this.refresh();
									})
									.catch(err => {
										this.$message.error(err);
										done();
									});
							})
							.catch(() => {});
					}
				}
			});
		}
	}
};
</script>

<style lang="stylus">
.system-user-move-dept {
	border: 1px solid #eee;
	margin-top: 5px;
	padding: 5px;
	border-radius: 3px;
	position: relative;
	top: -8px;
}
</style>

<style lang="stylus" scoped>
.system-user {
	._box {
		display: flex;
		height: 100%;
		position: relative;
	}

	.icon-arrow {
		position: absolute;
		top: calc(50% - 20px);
		display: inline-block;
		z-index: 9;
		cursor: pointer;
		width: 0;
		height: 0;
		border-top: 20px solid transparent;
		border-bottom: 20px solid transparent;

		i {
			position: absolute;
			top: -8px;
			left: 0;
			color: #666;
		}

		&._expand {
			border-right: 15px solid #f7f7f7;
			left: 285px;
		}

		&._collapse {
			left: 0;
			border-left: 15px solid #f7f7f7;

			i {
				left: -15px;
			}
		}

		&:hover {
			opacity: 0.8;
		}
	}

	.dept {
		height: 100%;
		width: 300px;
		background-color: #fff;
		overflow-y: auto;
		overflow-x: hidden;
		transition: width 0.3s;
		margin-right: 10px;

		&._collapse {
			margin-right: 0;
			width: 0;
		}

		>>>.el-tree-node__content {
			height: 36px;
		}

		ul {
			display: flex;

			li {
				list-style: none;
				margin-left: 5px;
				cursor: pointer;
				padding: 5px;
				display: flex;
				justify-content: center;
				align-items: center;

				&:not(.no):hover {
					background-color: #eee;
				}
			}
		}
	}

	.user {
		width: calc(100% - 310px);
		flex: 1;
	}

	.dept, .user {
		.label {
			display: flex;
			align-items: center;
			justify-content: space-between;
			height: 40px;
			padding: 0 10px;
			background-color: #fff;
			letter-spacing: 1px;

			div {
				display: flex;
				align-items: center;
				font-size: 15px;
				color: $color;
				flex: 1;
				min-width: 100px;

				span {
					font-size: 12px;
					position: relative;
					left: 5px;
					background-color: $color2;
					color: #fff;
					border-radius: 10px;
					padding: 0.5px 5px;
				}
			}

			i {
				font-size: 18px;
				color: $color;
				cursor: pointer;

				&:hover {
					color: $color2;
				}
			}
		}

		.container {
			height: calc(100% - 40px);
		}
	}
}
</style>
