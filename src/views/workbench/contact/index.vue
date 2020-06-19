<template>
	<cl-crud @load="onLoad"></cl-crud>
</template>

<script>
export default {
	methods: {
		onLoad({ ctx, app }) {
			ctx.service(this.$service.web.contact)
				.set('upsert', {
					props: {
						width: '1000px'
					},

					items: [
						{
							prop: 'name',
							label: '留言人',
							span: 24,
							component: {
								name: 'el-input',
								attrs: {
									placeholder: '留言人'
								}
							}
						},
						{
							prop: 'content',
							label: '内容',
							span: 24,
							component: {
								name: 'el-input',
								attrs: {
									placeholder: '内容'
								}
							}
						},
						{
							prop: 'contact',
							label: '联系方式',
							span: 24,
							component: {
								name: 'el-input',
								attrs: {
									placeholder: '联系方式'
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
							prop: 'name',
							label: '留言人',
							align: 'center',
							minWidth: '100',
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
							prop: 'contact',
							label: '联系方式',
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
