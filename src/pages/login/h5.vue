<template>
	<div class="scope">
		<div class="tmp2">
			<h4 class="title">COOL-ADMIN</h4>

			<el-form ref="form" class="form" size="medium" :disabled="saving">
				<el-form-item label="用户名">
					<el-input
						placeholder="请输入用户名"
						v-model="form.username"
						maxlength="20"
						@keyup.enter.native="next"
						auto-complete="off"
						clearable
					></el-input>
				</el-form-item>

				<el-form-item label="密码">
					<el-input
						type="password"
						placeholder="请输入密码"
						v-model="form.password"
						maxlength="20"
						auto-complete="off"
						@keyup.enter.native="next"
						clearable
					></el-input>
				</el-form-item>

				<el-form-item label="验证码" class="captcha">
					<el-input
						placeholder="请输入图片验证码"
						maxlength="4"
						v-model="form.verifyCode"
						auto-complete="off"
						@keyup.enter.native="next"
						clearable
					></el-input>

					<captcha
						ref="captcha"
						class="value"
						v-model="form.captchaId"
						@change="captchaChange"
					></captcha>
				</el-form-item>

				<el-button class="submit-btn" @click="next" :saving="saving">登录</el-button>
			</el-form>
		</div>
	</div>
</template>

<script>
import { isPc } from '@/cool/utils/index';
import index from './index';

export default {
	mixins: [index],

	beforeRouteEnter(to, from, next) {
		document.querySelector("meta[name='viewport']")['content'] =
			'width=device-width, initial-scale=1';

		next();
	},

	beforeRouteLeave(to, from, next) {
		document.querySelector("meta[name='viewport']")['content'] = '';

		next();
	},

	created() {
		if (isPc()) {
			this.$router.push('/login');
		}
	}
};
</script>

<style lang="stylus" scoped>
.scope {
	height: 100vh;
	width: 100vw;
	position: relative;
	background-color: #f7f7f7;

	.tmp2 {
		height: 450px;
		width: 90%;
		max-width: 500px;
		border-radius: 10px;
		box-shadow: 6px 11px 41px -28px $color2;
		background-color: #fff;
		position: absolute;
		left: 0;
		top: 0;
		right: 0;
		bottom: 0;
		margin: auto;
		padding: 20px 25px;
		box-sizing: border-box;

		>>>.el-input {
			input {
				padding: 0 5px;
				border: 0;
				border-bottom: 1px solid #eee;
				background-color: #fff;
			}
		}

		.title {
			margin: 20px 0 30px 0;
			text-align: center;
		}

		.captcha {
			position: relative;

			.value {
				position: absolute;
				bottom: 0;
				right: 0;
			}
		}

		.submit-btn {
			width: 100%;
			background-color: $color2;
			color: #fff;
		}
	}
}
</style>
