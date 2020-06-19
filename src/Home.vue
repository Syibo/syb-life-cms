<template>
	<div class="home">
		<el-row :gutter="20" class="card-statistics">
			<el-col :md="12">
				<div class="card block">
					<div class="val">
						<div class="left">
							<i class="el-icon-s-goods"></i>
						</div>

						<div class="right">
							<p>文章数</p>
							<p>{{ artList.length }}</p>
						</div>
					</div>

					<div class="desc">
						<i class="el-icon-warning"></i>
						<span>article</span>
					</div>
				</div>
			</el-col>

			<el-col :md="12">
				<div class="card block">
					<div class="val">
						<div class="left">
							<i class="el-icon-s-flag"></i>
						</div>

						<div class="right">
							<p>笔记数</p>
							<p>{{ diaryList.length }}</p>
						</div>
					</div>

					<div class="desc">
						<i class="el-icon-warning"></i>
						<span>diary</span>
					</div>
				</div>
			</el-col>
		</el-row>

		<div class="card card-visitor">
			<p class="card-title">文章分类</p>

			<div class="card-body">
				<echart1 :options="optionsLine"></echart1>
			</div>
		</div>

		<div class="card card-visitor">
			<p class="card-title">笔记分类</p>

			<div class="card-body">
				<Echart2 :options="optionsPie"></Echart2>
			</div>
		</div>
	</div>
</template>

<script>
import Echart1 from '@/components/echarts/1.vue';
import Echart2 from '@/components/echarts/2.vue';

export default {
	components: {
		Echart1,
		Echart2
	},

	data() {
		return {
			artList: [],
			diaryList: [],
			optionsLine: {},
			optionsPie: {}
		};
	},

	mounted() {
		this.getArtList();
		this.getDirayList();
	},

	methods: {
		async getArtList() {
			this.artList = await this.$service.web.article.list();
			var na = this.artList.map(item => item.artType);
			const map = na.reduce((m, x) => m.set(x, (m.get(x) || 0) + 1), new Map());
			const x = [];
			const y = [];
			map.forEach((key, value) => {
				x.push(value);
				y.push(key);
			});
			this.optionsLine = {
				tooltip: {
					trigger: 'axis'
				},
				xAxis: [
					{
						type: 'category',
						data: x,
						axisLine: {
							lineStyle: {
								color: '#999'
							}
						}
					}
				],
				yAxis: [
					{
						type: 'value',
						splitNumber: 4,
						splitLine: {
							lineStyle: {
								type: 'dashed',
								color: '#DDD'
							}
						},
						axisLine: {
							show: false,
							lineStyle: {
								color: '#333'
							}
						},
						nameTextStyle: {
							color: '#999'
						},
						splitArea: {
							show: false
						}
					}
				],
				series: [
					{
						type: 'line',
						data: y,
						lineStyle: {
							normal: {
								width: 8,
								color: {
									type: 'linear',

									colorStops: [
										{
											offset: 0,
											color: '#A9F387'
										},
										{
											offset: 1,
											color: '#48D8BF'
										}
									],
									globalCoord: false
								},
								shadowColor: 'rgba(72,216,191, 0.3)',
								shadowBlur: 10,
								shadowOffsetY: 20
							}
						},
						itemStyle: {
							normal: {
								color: '#fff',
								borderWidth: 10,
								borderColor: '#A9F387'
							}
						},
						smooth: true
					}
				]
			};
		},
		async getDirayList() {
			this.diaryList = await this.$service.web.diary.list();
			var na = this.diaryList.map(item => item.type);
			const map = na.reduce((m, x) => m.set(x, (m.get(x) || 0) + 1), new Map());
			const x = [];
			const y = [];
			map.forEach((key, value) => {
				x.push(value);
				let obj = {
					name: value,
					value: key
				};
				y.push(obj);
			});
			this.optionsPie = {
				color: ['#37A2DA', '#32C5E9', '#67E0E3', '#9FE6B8', '#FF9D7F', '#E690D1'],
				legend: {
					show: true,
					orient: 'vertical',
					left: 'right',
					data: x
				},
				series: [
					{
						name: '访问来源',
						type: 'pie',
						radius: '55%',
						center: ['50%', '60%'],
						data: y,
						emphasis: {
							itemStyle: {
								shadowBlur: 10,
								shadowOffsetX: 0,
								shadowColor: 'rgba(0, 0, 0, 0.5)'
							}
						}
					}
				]
			};
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
