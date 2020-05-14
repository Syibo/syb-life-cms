<template>
	<cl-crud @load="onLoad">
		<template #slot-content="{ scope }">
			<div class="editor" v-for="(item, index) in tab.list" :key="index">
				<template v-if="tab.index === index">
					<el-button class="change-btn" size="mini" @click="changeTab(item.to)">{{
						item.label
					}}</el-button>
					<component :is="item.component" height="300px" v-model="scope.data"></component>
				</template>
			</div>
		</template>
	</cl-crud>
</template>

<script>
export default {
	data() {
		return {
			crud: null,
			tab: {
				index: null,

				list: [
					{
						label: '切换富文本编辑器',
						to: 1,
						component: 'cl-code'
					},
					{
						label: '切换代码编辑器',
						to: 0,
						component: 'cl-editor-quill'
					}
				]
			}
		};
	},

	methods: {
		onLoad({ ctx, app }) {
			this.crud = app;

			ctx.service(this.$service.system.param)
				.set('upsert', {
					props: {
						width: '1000px'
					},

					items: [
						{
							prop: 'name',
							label: '名称',
							span: 12,
							component: {
								name: 'el-input',
								attrs: {
									placeholder: '请输入名称'
								}
							},
							rules: {
								required: true,
								message: '名称不能为空'
							}
						},
						{
							prop: 'key',
							label: 'Key',
							span: 12,
							component: {
								name: 'el-input',
								attrs: {
									placeholder: '请输入Key'
								}
							},
							rules: {
								required: true,
								message: 'Key不能为空'
							}
						},
						{
							prop: 'data',
							label: '数据',
							component: {
								name: 'slot-content'
							}
						},
						{
							prop: 'remark',
							label: '备注',
							component: {
								name: 'el-input',
								props: {
									type: 'textarea'
								},
								attrs: {
									placeholder: '请输入备注',
									rows: 3
								}
							}
						}
					]
				})
				.set('table', {
					columns: [
						{
							type: 'selection',
							align: 'center',
							width: 60
						},
						{
							label: '名称',
							prop: 'name',
							align: 'center'
						},
						{
							label: 'Key',
							prop: 'key',
							align: 'center'
						},
						{
							label: '数据',
							prop: 'data',
							align: 'center',
							'show-overflow-tooltip': true
						},
						{
							label: '备注',
							prop: 'remark',
							align: 'center'
						}
					]
				})
				.set('layout', [
					['refresh-btn', 'add-btn', 'multi-delete-btn', 'flex1', 'search-key'],
					['data-table'],
					['flex1', 'pagination']
				])
				.on('open', (isEdit, data) => {
					if (isEdit) {
						this.tab.index = /<*>/g.test(data.data) ? 1 : 0;
					} else {
						this.tab.index = 1;
					}
				})
				.done();

			app.refresh();
		},

		changeTab(i) {
			this.$confirm('切换编辑器会清空输入内容，是否继续？', '提示', {
				type: 'warning'
			})
				.then(() => {
					this.tab.index = i;
					this.crud.setForm('data', '');
				})
				.catch(() => {});
		}
	}
};
</script>

<style lang="stylus" scoped>
.change-btn {
	display: flex;
	position: absolute;
	right: 10px;
	bottom: 10px;
	z-index: 9;
}

.editor {
	transition: all 0.3s;
}
</style>
