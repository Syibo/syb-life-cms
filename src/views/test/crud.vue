<template>
	<div>
		<cl-crud @load="onLoad">
			<template #table-column-salesRate="{scope}">
				<div :class="scope.row.salesStatus == 1 ? 'sales-top' : 'sales-bottom'">
					<span>{{ scope.row.salesRate }}%</span>
					<i class="el-icon-bottom" v-if="!scope.row.salesStatus"></i>
					<i class="el-icon-top" v-else></i>
				</div>
			</template>

			<template #slot-adv-test="{scope}">
				<el-input v-model="scope.e" clearable placeholder="插槽式"></el-input>
			</template>

			<template #table-header-price>
				<el-tooltip content="本月业绩之和">
					<span>总量<i class="el-icon-warning" style="margin-left: 5px"></i></span>
				</el-tooltip>
			</template>

			<template #slot-append="{scope}">
				<el-button type="text" @click="rowCheck(scope.row)">自定义表单</el-button>

				<el-button type="text" size="mini" @click="openForm_CRUD">内嵌crud</el-button>
				<el-button type="text" size="mini" @click="openForm_Loading">测试loading</el-button>
			</template>

			<template #slot-validate="{scope}">
				<el-form-item
					v-for="(item, index) in scope.vads"
					:key="index"
					:prop="'vads.' + index + '.val'"
					:rules="{ required: true }"
				>
					<el-input v-model="item.val"></el-input>
				</el-form-item>

				<el-button @click="addVad(scope.vads)">添加行</el-button>
			</template>
		</cl-crud>

		<cl-form ref="cl-form"></cl-form>
		<cl-form ref="cl-form-text"></cl-form>
	</div>
</template>

<script>
export default {
	data() {
		return {
			crud: null
		};
	},

	methods: {
		onLoad({ ctx, app }) {
			this.crud = app;

			ctx.service(this.$service.test)
				.permission({
					update: true,
					delete: true
				})
				.set('table', {
					columns: [
						{
							type: 'selection',
							align: 'center',
							width: 60
						},
						{
							label: '花名',
							prop: 'name',
							align: 'center',
							children: [
								{
									label: '进展',
									prop: 'process',
									align: 'center'
								},
								{
									label: '花名2',
									prop: 'name',
									children: [
										{
											label: '总量',
											prop: 'price',
											align: 'center'
										}
									]
								}
							]
						},
						{
							label: '销售',
							prop: 'salesRate',
							align: 'center'
						},
						{
							label: '最后期限',
							prop: 'endTime',
							align: 'center'
						}
					],

					op: {
						props: {
							width: 350
						},

						layout: ['slot-append', 'edit', 'delete']
					}
				})
				.set('upsert', {
					props: {
						labelWidth: '150px'
					},
					items: [
						{
							prop: 'vads',
							value: [],
							label: '动态增减表单验证',
							component: {
								name: 'slot-validate'
							}
						},
						{
							label: '输入框',
							prop: 'a',
							component: {
								name: 'el-input',
								attrs: {
									placeholder: '请输入关键字'
								}
							}
						},
						{
							label: '下拉选择',
							prop: 'b',
							value: [1, 2],
							component: {
								name: 'el-select',
								props: {
									multiple: true
								},
								options: [
									{
										label: '选项1',
										value: 1
									},
									{
										label: '选项2',
										value: 2
									}
								]
							}
						},
						{
							label: '时间',
							prop: 'c',
							component: {
								name: 'el-date-picker'
							}
						},
						{
							label: '多选',
							prop: 'd',
							value: [1],
							component: {
								name: 'el-checkbox-group',
								options: [
									{
										label: '选项1',
										value: 1
									},
									{
										label: '选项2',
										value: 2
									}
								]
							}
						}
					]
				})
				.set('search', {
					adv: {
						items: [
							{
								label: '输入框',
								prop: 'a',
								component: {
									name: 'el-input',
									attrs: {
										placeholder: '请输入关键字'
									}
								}
							},
							{
								label: '下拉选择',
								prop: 'b',
								value: [1, 2],
								component: {
									name: 'el-select',
									props: {
										multiple: true
									},
									options: [
										{
											label: '选项1',
											value: 1
										},
										{
											label: '选项2',
											value: 2
										}
									]
								}
							},
							{
								label: '时间',
								prop: 'c',
								component: {
									name: 'el-date-picker'
								}
							},
							{
								label: '多选',
								prop: 'd',
								value: [1],
								component: {
									name: 'el-checkbox-group',
									options: [
										{
											label: '选项1',
											value: 1
										},
										{
											label: '选项2',
											value: 2
										}
									]
								}
							}
						]
					},

					query: {
						list: [
							{
								label: '上升的',
								value: 1
							},
							{
								label: '下跌的',
								value: 0
							}
						]
					}
				})
				.set('layout', [
					[
						'refresh-btn',
						'add-btn',
						'multi-delete-btn',
						'query',
						'flex1',
						'search-key',
						'adv-btn'
					],
					['data-table'],
					['flex1', 'pagination']
				])
				.done();

			app.refresh();
		},

		openForm_Loading() {
			const $ = this.$refs['cl-form'].open({
				props: {
					title: '测试loading',
					width: '500px'
				},

				items: [
					{
						prop: 'tl',
						hidden: false,
						component: {
							name: 'test-loading',

							data() {
								return {
									status: 'loading'
								};
							},

							mounted() {
								this.status = 'loading';
								$.showLoading('加载中');

								setTimeout(() => {
									this.status = 'done';
									$.hideLoading();
								}, 1000);
							},

							render(h) {
								return h('p', this.status);
							}
						}
					}
				]
			});
		},

		openForm_CRUD() {
			this.$refs['cl-form'].open({
				props: {
					title: '内嵌CRUD',
					width: '800px',
					size: 'mini'
				},

				items: [
					{
						props: {
							labelWidth: '0px'
						},

						component: {
							name: 'test__cl-crud',

							methods: {
								load: ({ ctx, app }) => {
									ctx.service(this.$service.test)
										.set('adv', {
											props: {
												'append-to-body': true
											}
										})
										.set('table', {
											columns: [
												{
													label: '花名',
													prop: 'name',
													align: 'center'
												},
												{
													label: '最后期限',
													prop: 'endTime',
													align: 'center'
												}
											],

											op: {
												visible: false
											}
										})
										.set('layout', [
											['refresh-btn', 'flex1', 'search-key'],
											['data-table'],
											['flex1', 'pagination']
										])
										.done();

									app.refresh();
								}
							},

							render() {
								return (
									<cl-crud
										on-load={this.load}
										{...{
											scopedSlots: {
												'table-column-name': ({ scope }) => {
													return <p>{scope.row.name}1111</p>;
												}
											}
										}}></cl-crud>
								);
							}
						}
					}
				]
			});
		},

		addVad(list) {
			list.push({
				val: ''
			});
		},

		rowCheck(item) {
			let { data, done, close } = this.$refs['cl-form'].open({
				props: {
					title: '自定义表单',
					'label-width': '60px',
					size: 'small',
					width: '500px'
				},
				op: {
					confirmButtonText: '下一步',

					layout: [
						'cancel',
						'confirm',
						<el-button
							type="primary"
							size="small"
							on-click={() => {
								this.$service.test
									.update({
										id: item.id,
										name: data.name
									})
									.then(() => {
										this.$message.success('保存成功');
										close();
										this.crud.refresh();
									})
									.catch(err => {
										this.$message.error(err);
										done();
									});
							}}>
							保存
						</el-button>
					]
				},
				items: [
					{
						label: '名称',
						prop: 'name',
						value: item.name,
						span: 19,
						component: {
							name: 'el-input',
							attrs: {
								placeholder: '请填写名称'
							}
						},
						rules: {
							required: true,
							message: '名称不能为空'
						}
					},
					{
						props: {
							'label-width': '0px'
						},
						span: 5,
						component: {
							name: 'check-name',
							render() {
								return (
									<el-button
										style="margin-left: 10px"
										size="small"
										on-click={() => {
											this.$message.success(`该名称未被使用`);
										}}>
										检查名称
									</el-button>
								);
							}
						}
					},
					{
						component: (
							<div class="select-user">
								<ul>
									<li
										on-click={() => {
											data.name = '重楼';
										}}>
										<el-image
											fit="cover"
											src="https://gss2.bdstatic.com/9fo3dSag_xI4khGkpoWK1HF6hhy/baike/w%3D268%3Bg%3D0/sign=2f5fa7e1a251f3dec3b2be62acd59722/267f9e2f07082838ad79b33fb599a9014c08f1a1.jpg"></el-image>
										<p>重楼</p>
									</li>

									<li
										on-click={() => {
											data.name = '赵灵儿';
										}}>
										<el-image
											fit="cover"
											src="https://ss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=4202183887,3262431825&fm=58"></el-image>
										<p>赵灵儿</p>
									</li>
								</ul>
							</div>
						)
					}
				],
				on: {
					submit: ({ data, done }) => {
						let list = [
							{
								label: '重楼',
								value:
									'酒入愁肠，一生惆怅情多少。纵横吟啸，思恋相萦绕。魔堕凡尘，难遣流年老。人间道，天涯芳草，依旧多情好'
							},
							{
								label: '赵灵儿',
								value:
									'仙灵岛上别洞天，池中孤莲伴月眠。一朝风雨落水面，愿君拾得惜相怜。'
							}
						];

						let user = list.find(e => e.label == data.name);

						this.$refs['cl-form-text'].open({
							props: {
								title: '人物介绍',
								width: '600px'
							},

							op: {
								cancelButtonText: '关闭',

								layout: ['cancel']
							},

							items: [
								{
									props: {
										'label-width': '0px'
									},

									component: <p>{user ? user.value : '无'}</p>
								}
							]
						});

						done();
					}
				}
			});
		}
	}
};
</script>

<style lang="stylus" scoped>
.sales-top {
	color: red;
}

.sales-bottom {
	color: green;
}
</style>

<style lang="stylus">
.select-user {
	ul {
		display: flex;
		flex-wrap: wrap;

		li {
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			list-style: none;
			width: calc(25% - 20px);
			margin: 10px;
			cursor: pointer;

			.el-image {
				height: 50px;
				width: 50px;
				border-radius: 50px;
			}

			&:hover {
				p {
					color: #008ad3;
				}
			}
		}
	}
}
</style>
