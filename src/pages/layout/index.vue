<template>
	<div class="wrapper" :class="{ collapse: menuCollapse }">
		<div class="wrapper-left">
			<slider></slider>
		</div>

		<div class="wrapper-right">
			<div class="wrapper-right__navbar">
				<topbar></topbar>
			</div>

			<div class="wrapper-right__container">
				<process></process>

				<div class="content-view">
					<keep-alive>
						<router-view v-if="$route.meta.keepAlive"></router-view>
					</keep-alive>

					<router-view v-if="!$route.meta.keepAlive"></router-view>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import Topbar from './topbar/index';
import Slider from './slider/index';
import Process from './process/index';
import { mapGetters } from 'vuex';

export default {
	components: {
		Topbar,
		Slider,
		Process
	},

	computed: {
		...mapGetters(['menuCollapse'])
	}
};
</script>

<style lang="stylus" scoped>
.wrapper {
	background-color: #f7f7f7;
	height: 100vh;
	width: 100vw;
	display: flex;
	overflow: hidden;

	.wrapper-left {
		background-color: #fff;
		overflow: hidden;
		height: 100%;
		width: 255px;
	}

	.wrapper-right {
		height: 100%;
		width: calc(100% - 255px);

		.wrapper-right__container {
			height: 100%;
			width: 100%;
			box-sizing: border-box;

			.scope-process {
				padding: 10px;
			}

			.content-view {
				height: calc(100% - 110px);
				width: 100%;
				box-sizing: border-box;
				padding: 0 10px;
				border-radius: 3px;

				& > div {
					height: 100%;
				}
			}
		}
	}

	&.collapse {
		.wrapper-left {
			width: 64px;
		}

		.wrapper-right {
			width: calc(100% - 64px);
		}
	}
}
</style>
