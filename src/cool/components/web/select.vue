<template>
	<el-select v-model="newValue" v-bind="props" v-on="on">
		<el-option
			v-for="(item, index) in list"
			:value="item.artName"
			:label="item.artName"
			:key="index"
		></el-option>
	</el-select>
</template>

<script>
export default {
	props: {
		value: String,
		props: Object,
		on: Object
	},

	data() {
		return {
			list: [],
			newValue: this.value
		};
	},

	watch: {
		value(val) {
			this.newValue = val;
		},

		newValue(val) {
			this.$emit('input', val);
		}
	},

	async created() {
		this.list = await this.$service.web.artType.list();
	}
};
</script>

<style lang="stylus" scoped></style>
