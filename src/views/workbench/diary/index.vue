<template>
	<cl-crud @load="onLoad">
		<template #table-column-picture="{scope}">
			<el-image
				v-if="scope.row.picture"
				:src="scope.row.picture.split(',')[0]"
				:preview-src-list="getArrPic(scope.row.picture)"
				:style="{
					height: '60px',
					width: '60px'
				}"
			></el-image>
		</template>

		<template #slot-content="{ scope }">
			<!-- <div class="editor" v-for="(item, index) in tab.list" :key="index">
				<component :is="item.component" height="300px" v-model="scope.content"></component>
			</div> -->
			<MarkdownPro v-model="scope.content"></MarkdownPro>
		</template>
	</cl-crud>
</template>

<script>
import { MarkdownPro } from 'vue-meditor';
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
	components: {
		MarkdownPro
	},
	methods: {
		onLoad({ ctx, app }) {
			this.crud = app;
			ctx.service(this.$service.web.diary)
				.set('upsert', {
					props: {
						width: '1000px'
					},

					items: [
						{
							prop: 'title',
							label: '日记标题',
							span: 12,
							component: {
								name: 'el-input',
								attrs: {
									placeholder: '请输入日记标题'
								}
							},
							rules: {
								required: true,
								message: '日记标题不能为空'
							}
						},
						{
							prop: 'place',
							label: '地址',
							span: 12,
							component: {
								name: 'el-input',
								attrs: {
									placeholder: '请输入地址'
								}
							}
						},
						{
							prop: 'picture',
							label: '图片',
							span: 24,
							component: {
								name: 'cl-upload',
								props: {
									props: {
										multiple: true,
										'multiple-limit': 9
									}
								}
							}
						},
						{
							prop: 'type',
							label: '日记类型',
							span: 12,
							component: {
								name: 'cl-diary-select',
								attrs: {
									placeholder: '日记类型'
								}
							},
							rules: {
								required: true,
								message: '日记类型'
							}
						},
						{
							prop: 'link',
							label: '链接',
							span: 24,
							component: {
								name: 'el-input',
								attrs: {
									placeholder: '请输入地址'
								}
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
							prop: 'title',
							label: '日记标题',
							align: 'center',
							minWidth: '200',
							'show-overflow-tooltip': true
						},
						{
							prop: 'place',
							label: '地址',
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
							prop: 'type',
							label: '类型',
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
							prop: 'createTime',
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
		getArrPic(pic) {
			let arr = pic.split(',');
			return arr;
		}
	}
};
</script>

<style lang="stylus" scoped></style>
