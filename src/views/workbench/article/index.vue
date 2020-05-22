<template>
	<cl-crud @load="onLoad"> </cl-crud>
</template>

<script>
export default {
	methods: {
		onLoad({ ctx, app }) {
			ctx.service(this.$service.web.article)
				.set('upsert', {
					props: {
						width: '1000px'
					},

					items: [
						{
							prop: 'title',
							label: '文章标题',
							span: 24,
							component: {
								name: 'el-input',
								attrs: {
									placeholder: '请输入文章标题'
								}
							},
							rules: {
								required: true,
								message: '文章标题不能为空'
							}
						},
						{
							prop: 'link',
							label: '链接',
							span: 24,
							component: {
								name: 'el-input',
								attrs: {
									placeholder: '请输入链接'
								}
							},
							rules: {
								required: true,
								message: '链接不能为空'
							}
						},
						{
							prop: 'artType',
							label: '文章类型',
							span: 24,
							component: {
								name: 'cl-article-select',
								attrs: {
									placeholder: '请输入文章类型'
								}
							},
							rules: {
								required: true,
								message: '文章类型不能为空'
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
							type: 'index',
							label: '序号',
							align: 'center',
							width: 60
						},
						{
							prop: 'title',
							label: '文章标题',
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
							prop: 'artType',
							label: '文章类型',
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
