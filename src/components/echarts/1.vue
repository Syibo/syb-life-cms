<template>
	<e-charts :options="options"></e-charts>
</template>

<script>
import ECharts from 'vue-echarts';
import 'echarts/lib/chart/line';

export default {
	name: 'echart1',

	components: {
		ECharts
	},

	data() {
		return {
			options: {
				tooltip: {
					trigger: 'axis'
				},
				xAxis: [
					{
						type: 'category',
						data: ['2019-01', '2019-02', '2019-03', '2019-04', '2019-05', '2019-06'],
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
						name: '课时',
						type: 'line',
						data: new Array(6).fill(1).map(() => parseInt(Math.random() * 10000)),
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
			}
		};
	}
};
</script>

<style lang="stylus" scoped>
.echarts {
	width: 100%;
}
</style>
