<template>
	<li class="tools-notice">
		<i class="el-icon-message-solid"></i>
		<span class="tag">4</span>

		<div class="popover" v-if="visible">
			<div class="tips">
				<span>您有4条新通知</span>

				<el-button size="mini" type="primary" round>查看全部</el-button>
			</div>

			<div class="list">
				<a class="block">
					<div class="icon">
						<i class="el-icon-s-promotion"></i>
					</div>
					<div class="det">
						<p class="title">您的Apple ID 被用在iPhone 11 上登录 iCould</p>
						<p class="sub-title">5分钟前</p>
					</div>
				</a>
			</div>
		</div>
	</li>
</template>

<script>
import { contains } from '@/cool/utils/index';

export default {
	data() {
		return {
			visible: false
		};
	},

	mounted() {
		document.onclick = e => {
			let popover = document.querySelector('.tools-notice .popover');

			if (e.target.className == 'el-icon-message-solid') {
				this.visible = !this.visible;
			}

			if (popover) {
				if (!contains(popover, e.target)) {
					this.visible = false;
				}
			}
		};
	}
};
</script>

<style lang="stylus" scoped>
.tools-notice {
	.popover {
		position: absolute;
		top: 55px;
		right: -20px;
		background-color: #fff;
		box-shadow: 0px 1px 10px 0 rgba(0, 0, 0, 0.15);
		z-index: 99;
		width: 300px;
		color: #444;
		font-size: 12px;
		padding: 5px 0;
		border-radius: 5px;

		.tips {
			display: flex;
			align-items: center;
			justify-content: space-between;
			background-color: #F9FAFC;
			padding: 10px;

			span {
				font-size: 14px;
			}

			.el-button {
				padding: 4px 7px;
			}
		}

		.list {
			display: flex;
			flex-direction: column;

			.block {
				display: flex;
				align-items: center;
				padding: 10px 15px;

				.icon {
					display: flex;
					justify-content: center;
					align-items: center;
					height: 40px;
					width: 40px;
					margin-right: 15px;
					background-color: #eee;
					border-radius: 40px;
				}

				.det {
					width: calc(100% - 50px);

					.title {
						font-size: 12px;
					}

					.sub-title {
						font-size: 12px;
						color: #999;
						margin-top: 5px;
					}
				}
			}
		}
	}
}
</style>
