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
