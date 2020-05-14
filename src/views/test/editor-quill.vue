<template>
	<div>
		<div class="data">
			{{ content || 'html' }}
		</div>

		<cl-editor-quill v-model="content" @load="onLoad" :height="400"></cl-editor-quill>
	</div>
</template>

<script>
export default {
	data() {
		return {
			content: '',
			options: {
				placeholder: '输入内容'
			}
		};
	},

	methods: {
		onLoad(ref) {
			console.log(ref);
		}
	}
};
</script>

<style lang="stylus" scoped>
.data {
	height: 100px;
	width: 100%;
	border: 1px solid #DCDFE6;
	background-color: #fff;
	margin-bottom: 10px;
	padding: 10px;
	box-sizing: border-box;
	overflow-y: auto;
	word-break: break-all;
}
</style>
