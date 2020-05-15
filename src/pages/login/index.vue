<template>
	<div class="scope">
		<ul class="bg-bubbles">
			<li></li>
			<li></li>
			<li></li>
			<li></li>
			<li></li>
			<li></li>
			<li></li>
			<li></li>
			<li></li>
			<li></li>
		</ul>

		<div class="tmp2">
			<div class="title">
				<!-- <icon-svg name="logo-t-lr"></icon-svg> -->
				shenyibi.life-cms
			</div>

			<el-form ref="form" class="form" size="medium" :disabled="saving">
				<el-form-item label="用户名">
					<el-input
						placeholder="请输入用户名"
						v-model="form.username"
						maxlength="20"
						@keyup.enter.native="next"
						auto-complete="off"
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
					></el-input>
				</el-form-item>

				<el-form-item label="验证码" class="captcha">
					<el-input
						placeholder="请输入图片验证码"
						maxlength="4"
						v-model="form.verifyCode"
						auto-complete="off"
						@keyup.enter.native="next"
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

	created() {
		if (!isPc()) {
			this.$router.push('/login-h5');
		}
	}
};
</script>

<style lang="stylus" scoped>
.scope {
	height: 100vh;
	width: 100vw;
	position: relative;

	.tmp2 {
		height: 383px;
		width: 767px;
		border-radius: 10px;
		overflow: hidden;
		position: absolute;
		left: calc(50% - 384px);
		top: calc(50% - 192px);
		box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.1);

		&:before {
			content: '';
			background-image: url('../../assets/images/login-bg.png');
			background-size: 100% 100%;
			position: absolute;
			left: 0px;
			right: 0;
			height: 383px;
			width: 767px;
			z-index: 1;
		}

		&:after {
			content: '';
			background: linear-gradient(to right, $color, $color2);
			position: absolute;
			left: 0px;
			right: 0;
			height: 383px;
			width: 767px;
			z-index: 0;
		}

		.title {
			position: absolute;
			left: 25px;
			top: 10px;
			z-index: 1;
			font-size: 20px;
			letter-spacing: 1px;
			text-shadow: 1px 2px 10px rgba(0, 0, 0, 0.4);

			.icon-svg {
				height: 40px;
				width: 180px;
			}
		}

		.el-form {
			height: 280px;
			width: 280px;
			border-radius: 3px;
			position: absolute;
			right: 42px;
			top: 45px;
			z-index: 1;

			.el-form-item {
				margin-bottom: 5px;
			}

			>>>.el-input {
				.el-input__inner {
					border: 0;
					box-shadow: 0 0 0px 1000px #fefcfe inset;
					border-radius: 0;
					padding: 0 5px;
				}
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
				background: linear-gradient(to top left, $color, $color2);
				color: #fff;
				font-size: 15px;
				letter-spacing: 2px;
				cursor: pointer;
				margin-top: 20px;
			}
		}
	}

	.bg-bubbles {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		overflow: hidden;
		background: linear-gradient(to bottom right, $color, $color2);
	}

	.bg-bubbles li {
		position: absolute;
		bottom: -160px;
		width: 40px;
		height: 40px;
		background-color: rgba(255, 255, 255, 0.15);
		list-style: none;
		animation: square 15s infinite;
		transition-timing-function: linear;
		border-radius: 50%;
	}

	.bg-bubbles li:nth-child(1) {
		left: 10%;
	}

	.bg-bubbles li:nth-child(2) {
		left: 20%;
		width: 90px;
		height: 90px;
		animation-delay: 2s;
		animation-duration: 7s;
	}

	.bg-bubbles li:nth-child(3) {
		left: 25%;
		animation-delay: 4s;
	}

	.bg-bubbles li:nth-child(4) {
		left: 40%;
		width: 60px;
		height: 60px;
		animation-duration: 8s;
		background-color: rgba(255, 255, 255, 0.3);
	}

	.bg-bubbles li:nth-child(5) {
		left: 70%;
	}

	.bg-bubbles li:nth-child(6) {
		left: 80%;
		width: 120px;
		height: 120px;
		animation-delay: 3s;
		background-color: rgba(255, 255, 255, 0.2);
	}

	.bg-bubbles li:nth-child(7) {
		left: 32%;
		width: 160px;
		height: 160px;
		animation-delay: 2s;
	}

	.bg-bubbles li:nth-child(8) {
		left: 55%;
		width: 20px;
		height: 20px;
		animation-delay: 4s;
		animation-duration: 15s;
	}

	.bg-bubbles li:nth-child(9) {
		left: 25%;
		width: 10px;
		height: 10px;
		animation-delay: 2s;
		animation-duration: 12s;
		background-color: rgba(255, 255, 255, 0.3);
	}

	.bg-bubbles li:nth-child(10) {
		left: 85%;
		width: 160px;
		height: 160px;
		animation-delay: 5s;
	}

	@keyframes square {
		0% {
			opacity: 0.5;
			transform: translateY(0px) rotate(45deg);
		}

		25% {
			opacity: 0.75;
			transform: translateY(-400px) rotate(90deg);
		}

		50% {
			opacity: 1;
			transform: translateY(-600px) rotate(135deg);
		}

		100% {
			opacity: 0;
			transform: translateY(-1000px) rotate(180deg);
		}
	}
}
</style>
