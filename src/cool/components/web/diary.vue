<template>
	<el-select v-model="newValue" v-bind="props" v-on="on">
		<el-option
			v-for="(item, index) in list"
			:value="item.label"
			:label="item.label"
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
			list: [
				{ label: 'diary', value: 'diary' },
				{ label: 'tour', value: 'tour' },
				{ label: 'pic', value: 'pic' },
				{ label: 'cat', value: 'cat' },
				{ label: 'food', value: 'food' },
				{ label: 'music', value: 'music' }
			],
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
	}
};
</script>

<style lang="stylus" scoped></style>
