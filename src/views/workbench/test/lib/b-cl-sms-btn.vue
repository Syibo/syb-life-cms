<template>
	<div class="scope">
		<div class="h">
			<span>cl-sms-btn</span>
			获取短信验证码
		</div>

		<div class="c">
			<cl-sms-btn @success="onSuccess" :count="5"></cl-sms-btn>
			<p class="captcha-id">captcha-id：{{ captchaId || '未获取' }}</p>
		</div>

		<div class="f">
			<span class="date">2019/10/19</span>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			captchaId: ''
		};
	},

	methods: {
		onSuccess(captchaId) {
			this.captchaId = captchaId;
		}
	}
};
</script>

<style lang="stylus" scoped>
.scope {
	.captcha-id {
		margin-top: 15px;
	}
}
</style>
