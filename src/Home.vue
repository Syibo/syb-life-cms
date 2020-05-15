<template>
	<div class="home">
		<el-row :gutter="20" class="card-statistics">
			<el-col :md="12" :xl="6">
				<div class="card block">
					<div class="val">
						<div class="left">
							<i class="el-icon-s-goods"></i>
						</div>

						<div class="right">
							<p>文章</p>
							<p>97</p>
						</div>
					</div>

					<div class="desc">
						<i class="el-icon-warning"></i>
						<span>25% lower growth</span>
					</div>
				</div>
			</el-col>

			<el-col :md="12" :xl="6">
				<div class="card block">
					<div class="val">
						<div class="left">
							<i class="el-icon-s-flag"></i>
						</div>

						<div class="right">
							<p>笔记</p>
							<p>18</p>
						</div>
					</div>

					<div class="desc">
						<i class="el-icon-warning"></i>
						<span>Product-wise sales</span>
					</div>
				</div>
			</el-col>
		</el-row>

		<div class="card card-visitor">
			<p class="card-title">用户访客</p>

			<div class="card-body">
				<echart1></echart1>
			</div>
		</div>

		<!-- <div class="card card-plan">
			<p class="card-title">计划</p>

			<div class="card-body">
				<cl-crud @load="onCrudLoad">
					<template #table-column-process="{scope}">
						<el-progress
							:show-text="false"
							:stroke-width="6"
							:percentage="scope.row.process"
						></el-progress>
					</template>

					<template #table-column-price="{scope}">
						<span>￥{{ scope.row.price }}</span>
					</template>

					<template #table-column-salesRate="{scope}">
						<div :class="scope.row.salesStatus == 1 ? 'sales-top' : 'sales-bottom'">
							<span>{{ scope.row.salesRate }}%</span>
							<i class="el-icon-bottom" v-if="scope.row.salesStatus"></i>
							<i class="el-icon-top" v-else></i>
						</div>
					</template>
				</cl-crud>
			</div>
		</div> -->
	</div>
</template>

<script>
import Echart1 from '@/components/echarts/1.vue';

export default {
	components: {
		Echart1
	},

	data() {
		return {
			crud: {
				service: this.$service.test,
				table: {
					columns: [
						{
							type: 'index',
							align: 'center',
							width: 100
						},
						{
							label: '名字',
							prop: 'name',
							align: 'center'
						},
						{
							label: '进展',
							prop: 'process',
							align: 'center'
						},
						{
							label: '总量',
							prop: 'price',
							align: 'center'
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
						hidden: true
					},

					props: {
						'max-height': '500px'
					}
				},
				layout: [['data-table']]
			}
		};
	},

	methods: {
		toDocs() {
			window.open('https://docs.cool-admin.com/#/');
		},

		onCrudLoad({ ctx, app }) {
			ctx({
				service: this.$service.test,
				table: {
					columns: [
						{
							type: 'index',
							align: 'center',
							width: 100
						},
						{
							label: '名字',
							prop: 'name',
							align: 'center'
						},
						{
							label: '进展',
							prop: 'process',
							align: 'center'
						},
						{
							label: '总量',
							prop: 'price',
							align: 'center'
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
						visible: false
					},

					props: {
						'max-height': '500px'
					}
				},
				layout: [['data-table']]
			}).done();

			app.refresh();
		}
	}
};
</script>

<style lang="stylus" scoped>
.home {
	overflow-y: auto;
	overflow-x: hidden;

	.card {
		background-color: #fff;
		border-radius: 5px;
		margin-bottom: 20px;

		.card-title {
			color: #000;
			padding: 20px 20px 0 20px;
		}

		.card-body {
			padding: 10px;
		}
	}

	.tips {
		display: flex;
		align-items: center;
		background-color: #ECEFF0;
		padding: 15px 20px;
		border-radius: 3px;
		margin-bottom: 20px;

		.flex1 {
			flex: 1;
		}

		span {
			color: #7e7e7e;
			font-size: 12px;
		}

		.doc-btn {
			margin-right: 10px;
		}
	}

	.card-statistics {
		.block {
			background-color: #fff;
			height: 100px;
			padding: 20px;

			.val {
				display: flex;
				justify-content: space-between;
				align-items: center;

				.left {
					i {
						font-size: 34px;

						&.el-icon-s-goods {
							color: #EC5555;
						}

						&.el-icon-s-flag {
							color: #FFB431;
						}

						&.el-icon-s-custom {
							color: #9257DB;
						}

						&.el-icon-s-marketing {
							color: #00D06F;
						}
					}
				}

				.right {
					p {
						&:first-child {
							font-size: 13px;
							text-align: right;
						}

						&:last-child {
							font-size: 24px;
							margin-top: 5px;
						}
					}
				}
			}

			.desc {
				color: #999;
				font-size: 13px;
				margin-top: 20px;

				span {
					margin-left: 5px;
				}
			}
		}
	}

	.sales-top {
		color: red;
	}

	.sales-bottom {
		color: green;
	}
}
</style>
