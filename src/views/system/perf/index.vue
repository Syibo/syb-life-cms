<template>
	<div class="system-perf">
		<ct ref="ct"></ct>

		<network ref="network"></network>

		<el-row :gutter="20" style="margin-top: 15px">
			<el-col :span="12">
				<redis ref="redis"></redis>
			</el-col>

			<el-col :span="12">
				<mysql ref="mysql"></mysql>
			</el-col>
		</el-row>
	</div>
</template>

<script>
import Ct from './ct';
import Network from './network';
import Redis from './redis';
import Mysql from './mysql';

export default {
	components: {
		Network,
		Ct,
		Redis,
		Mysql
	},

	beforeRouteLeave(to, from, next) {
		clearTimeout(this.tiemr);
		next();
	},

	data() {
		return {
			list: {},
			tiemr: null
		};
	},

	mounted() {
		this.refresh();

		this.tiemr = setInterval(this.refresh, 3000);
	},

	methods: {
		refresh() {
			this.$service.system.info.record().then(res => {
				const { network, ct, redis, mysql } = this.$refs;

				if (network) {
					network.refresh(res);
				}

				if (ct) {
					ct.refresh(res);
				}

				if (redis) {
					redis.refresh(res);
				}

				if (mysql) {
					mysql.refresh(res);
				}
			});
		}
	}
};
</script>

<style lang="stylus" scoped>
.system-perf {
	height: 100%;
	overflow-y: auto;
	overflow-x: hidden;
}
</style>
