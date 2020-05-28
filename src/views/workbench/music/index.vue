<template>
	<cl-crud @load="onLoad">
		<template #slot-content="{ scope }">
			<div class="editor" v-for="(item, index) in tab.list" :key="index">
				<component :is="item.component" height="300px" v-model="scope.content"></component>
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
				list: [
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
			ctx.service(this.$service.web.music)
				.set('upsert', {
					props: {
						width: '1000px'
					},

					items: [
						{
							prop: 'title',
							label: '标题',
							span: 24,
							component: {
								name: 'el-input',
								attrs: {
									placeholder: '请输入类型名称'
								}
							},
							rules: {
								required: true,
								message: '类型名称不能为空'
							}
						},
						{
							prop: 'author',
							label: '作者',
							span: 24,
							component: {
								name: 'el-input',
								attrs: {
									placeholder: '请输入作者'
								}
							},
							rules: {
								required: true,
								message: '作者不能为空'
							}
						},
						{
							prop: 'picture',
							label: '图片',
							span: 24,
							component: {
								name: 'cl-upload'
							}
						},
						{
							prop: 'link',
							label: '链接',
							span: 24,
							component: {
								name: 'el-input',
								attrs: {
									placeholder: '请输入作者'
								}
							},
							rules: {
								required: true,
								message: '作者不能为空'
							}
						},
						{
							prop: 'content',
							label: '内容',
							component: {
								name: 'slot-content'
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
							prop: 'title',
							label: '标题',
							align: 'center',
							minWidth: '200',
							'show-overflow-tooltip': true
						},
						{
							prop: 'author',
							label: '作者',
							align: 'center',
							minWidth: '200',
							'show-overflow-tooltip': true
						},
						{
							prop: 'picture',
							label: '图片',
							align: 'center',
							minWidth: '200',
							'show-overflow-tooltip': true
						},
						{
							prop: 'link',
							label: '链接',
							align: 'center',
							minWidth: '200',
							'show-overflow-tooltip': true
						},
						{
							prop: 'content',
							label: '内容',
							align: 'center',
							minWidth: '200',
							'show-overflow-tooltip': true
						},
						{
							prop: 'updateTime',
							label: '更新时间',
							align: 'center',
							'show-overflow-tooltip': true
						}
					],

					props: {
						'default-sort': {
							prop: 'createTime',
							order: 'descending'
						}
					}
				})
				.set('layout', [
					['refresh-btn', 'add-btn', 'multi-delete-btn', 'flex1', 'search-key'],
					['data-table'],
					['flex1', 'pagination']
				])
				.done();

			app.refresh();
		}
	}
};
</script>

<style lang="stylus" scoped></style>
