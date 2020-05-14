<template>
	<cl-crud @load="onLoad">
		<template #slot-clear-btn>
			<el-button
				v-permission="$service.system.log.clear"
				size="mini"
				type="danger"
				@click="clear"
				>清空</el-button
			>
		</template>

		<template #slot-set>
			<div class="slot-set">
				<span>日志保存天数</span>

				<el-input-number
					controls-position="right"
					size="mini"
					:max="10000"
					:min="1"
					v-model="day"
					@blur="saveDay"
				></el-input-number>
			</div>
		</template>
	</cl-crud>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
	data() {
		return {
			crud: null,
			day: 1
		};
	},

	computed: {
		...mapGetters(['permission'])
	},

	created() {
		this.$service.system.log.getKeep().then(res => {
			this.day = res;
		});
	},

	methods: {
		onLoad({ ctx, app }) {
			this.crud = app;

			ctx.service(this.$service.system.log)
				.set('table', {
					columns: [
						{
							type: 'index',
							align: 'center',
							width: 60
						},
						{
							prop: 'userId',
							label: '用户ID',
							align: 'center'
						},
						{
							prop: 'name',
							label: '昵称',
							align: 'center'
						},
						{
							prop: 'action',
							label: '请求地址',
							align: 'center',
							minWidth: '200',
							'show-overflow-tooltip': true
						},
						{
							prop: 'params',
							label: '参数',
							align: 'center',
							minWidth: '200',
							'show-overflow-tooltip': true
						},
						{
							prop: 'ip',
							label: 'ip',
							minWidth: '180',
							align: 'center'
						},
						{
							prop: 'ipAddr',
							label: 'ip地址',
							minWidth: '150',
							align: 'center'
						},
						{
							prop: 'createTime',
							label: '创建时间',
							minWidth: '150',
							align: 'center',
							sortable: true
						}
					],

					op: {
						visible: false
					},

					props: {
						'default-sort': {
							prop: 'createTime',
							order: 'descending'
						}
					}
				})
				.set('search', {
					key: { placeholder: '请输入请求地址, 参数，ip地址' }
				})
				.set('layout', [
					['refresh-btn', 'add-btn', 'slot-clear-btn', 'slot-set', 'flex1', 'search-key'],
					['data-table'],
					['flex1', 'pagination']
				])
				.done();

			app.refresh();
		},

		saveDay() {
			this.$service.system.log.setKeep(this.day).then(() => {
				this.$message.success('保存成功');
			});
		},

		clear() {
			this.$confirm('是否要清空日志', '提示', {
				type: 'warning'
			})
				.then(() => {
					this.$service.system.log
						.clear()
						.then(() => {
							this.$message.success('清空成功');
							this.crud.refresh({ page: 1 });
						})
						.catch(err => {
							this.$message.error(err);
						});
				})
				.catch(() => {});
		}
	}
};
</script>

<style lang="stylus" scoped>
.slot-set {
	span {
		font-size 12px
		margin: 0 10px;
	}

	.el-input-number {
		margin-right 10px
	}
}
</style>
