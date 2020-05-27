<template>
	<div class="scope">
		<div class="h">
			<span>cl-upload</span>
			图片上传
		</div>
		<div class="c">
			<cl-upload v-model="avatar"></cl-upload>
		</div>
		<div class="f">
			<span class="date">2019/09/25</span>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			avatar: ''
		};
	}
};
</script>
