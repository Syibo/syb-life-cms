<template>
	<cl-crud @load="onLoad"> </cl-crud>
</template>

<script>
export default {
	methods: {
		onLoad({ ctx, app }) {
			ctx.service(this.$service.web.news)
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
