<template>
	<div class="cl-viewer">
		<img :src="current || urls[0]" alt="" @click="show" :style="{ ...size }" />

		<viewer ref="viewer" :images="list" @inited="inited">
			<template slot-scope="scope">
				<img class="case" v-for="src in scope.images" :src="src" :key="src" />
			</template>
		</viewer>
	</div>
</template>

<script>
export default {
	name: 'cl-viewer',

	props: {
		urls: [Array, String],
		current: String,
		height: String,
		width: String
	},

	data() {
		return {};
	},

	computed: {
		list() {
			return this.urls || [this.current];
		},

		size() {
			return {
				height: this.height,
				width: this.width
			};
		}
	},

	methods: {
		inited(viewer) {
			this.$viewer = viewer;
		},

		show() {
			this.$viewer.show();
		}
	}
};
</script>

<style lang="stylus" scoped>
.case {
	display: none;
}
</style>
