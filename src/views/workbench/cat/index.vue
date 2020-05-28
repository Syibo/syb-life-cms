<template>
	<cl-crud @load="onLoad">
		<template #table-column-picture="{scope}">
			<el-image
				:src="scope.row.picture"
				:preview-src-list="getArrPic(scope.row.picture)"
				:style="{
					height: '60px',
					width: '60px'
				}"
			></el-image>
		</template>
	</cl-crud>
</template>

<script>
export default {
	data() {
		return {};
	},
	methods: {
		onLoad({ ctx, app }) {
			ctx.service(this.$service.web.cat)
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
							prop: 'picture',
							label: '图片',
							span: 24,
							component: {
								name: 'cl-upload'
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
							prop: 'picture',
							label: '图片',
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
		},
		getArrPic(pic) {
			const arr = [];
			arr.push(pic);
			return arr;
		}
	}
};
</script>

<style lang="stylus" scoped></style>
