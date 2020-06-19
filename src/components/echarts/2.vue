<template>
	<e-charts :options="options"></e-charts>
</template>

<script>
import ECharts from 'vue-echarts';
import 'echarts/lib/chart/pie';
import 'echarts/lib/component/legend';

export default {
	name: 'echart1',

	components: {
		ECharts
	},

	props: {
		options: {
			type: Object,
			default: function() {
				return {};
			}
		}
	},

	data() {
		return {};
	}
};
</script>

<style lang="stylus" scoped>
.echarts {
	width: 100%;
}
</style>
