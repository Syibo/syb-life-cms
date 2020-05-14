<template>
	<div class="page-iframe" v-loading="loading" element-loading-text="拼命加载中">
		<iframe :src="url" frameborder="0"></iframe>
	</div>
</template>

<script>
export default {
	data() {
		return {
			loading: false,
			url: ''
		};
	},

	created() {
		this.url = this.$route.meta.iframeUrl;
	},

	mounted() {
		const iframe = this.$el.querySelector('iframe');
		this.loading = true;

		iframe.onload = () => {
			this.loading = false;
		};
	}
};
</script>

<style lang="stylus" scoped>
.page-iframe {
	height: 100%;
	width: 100%;
	overflow: hidden;

	iframe {
		height: 100%;
		width: 100%;
	}
}
</style>
