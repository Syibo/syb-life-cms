<template>
	<div class="scope-slider">
		<div class="logo">
			<a href="https://cool-admin.com/">
				<icon-svg class="lr" name="logo-lr" v-if="!menuCollapse"></icon-svg>
				<icon-svg class="z" name="logo" v-else></icon-svg>
			</a>
		</div>

		<div class="user" v-if="userInfo && !menuCollapse">
			<img :src="userInfo.headImg | default_avatar" alt="" class="avatar" />

			<div class="det">
				<p class="name">{{ userInfo.name }}</p>
				<p class="post">部门：{{ userInfo.departmentName || '无' }}</p>
			</div>
		</div>

		<div class="menu" v-if="visible">
			<deep-menu></deep-menu>
		</div>
	</div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';
import { setTimeout } from 'timers';

export default {
	data() {
		return {
			visible: true
		};
	},

	computed: {
		...mapGetters(['menuList', 'menuCollapse', 'userInfo'])
	},

	watch: {
		menuList() {
			this.visible = false;

			setTimeout(() => {
				this.visible = true;
			}, 0);
		}
	},

	components: {
		DeepMenu: {
			computed: {
				...mapGetters(['menuList', 'menuCollapse'])
			},

			methods: {
				toView(url) {
					if (url != this.$route.path) {
						this.$router.push(url);
					}
				}
			},

			render() {
				const fn = list => {
					return list.map(e => {
						let html = null;

						if (e.type == 0) {
							html = (
								<el-submenu index={String(e.id)} key={e.id}>
									<template slot="title">
										<icon-svg name={e.icon}></icon-svg>
										<span slot="title">{e.name}</span>
									</template>
									{fn(e.children)}
								</el-submenu>
							);
						} else {
							html = (
								<el-menu-item index={e.path} key={e.path}>
									<icon-svg name={e.icon}></icon-svg>
									<span slot="title">{e.name}</span>
								</el-menu-item>
							);
						}

						return html;
					});
				};

				let el = fn(this.menuList);

				return (
					<el-menu
						default-active={this.$route.path}
						collapse-transition={false}
						collapse={this.menuCollapse}
						on-select={this.toView}>
						{el}
					</el-menu>
				);
			}
		}
	},

	methods: {
		...mapMutations(['COLLAPSE_MENU'])
	}
};
</script>

<style lang="stylus" scoped>
.scope-slider {
	height: 100%;
	box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);

	.logo {
		height: 50px;
		display: flex;
		align-items: center;
		justify-content: center;
		letter-spacing: 1px;

		p {
			background: linear-gradient(120deg, $color, $color2);
			-webkit-background-clip: text;
			-webkit-text-fill-color: transparent;
			font-size: 20px;
		}

		.lr {
			height: 45px;
			width: 180px;
		}

		.z {
			height: 30px;
			width: 30px;
		}
	}

	.user {
		display: flex;
		height: 40px;
		position: relative;
		margin: 20px 20px 30px 25px;

		.avatar {
			height: 40px;
			width: 40px;
			border-radius: 40px;
			background-color: #eee;
		}

		.det {
			margin-left: 15px;
		}

		p {
			font-size: 13px;
			line-height: 20px;
			margin-bottom: 3px;

			&.post {
				font-size: 12px;
				color: #c2c2c2;
			}
		}

		.collapse {
			position: absolute;
			right: 10px;
			top: 10px;
			cursor: pointer;
			font-size: 18px;

			&:hover {
				color: $color;
			}
		}
	}

	.menu {
		overflow-y: auto;
		height: calc(100% - 150px);

		&::-webkit-scrollbar {
			width: 0;
			height: 0;
		}

		&::-webkit-scrollbar-thumb {
			background: linear-gradient(to bottom, $color2, $color);
		}

		&::-webkit-scrollbar-track {
			background: #ccc;
		}

		.el-menu {
			border-right: 0;
			// animation-duration: 0.3s;
			// animation-fill-mode: both;
			// animation-name: fadeInLeft;

			@keyframes fadeInLeft {
				from {
					opacity: 0;
					transform: translate3d(-100%, 0, 0);
				}

				to {
					opacity: 1;
					transform: translate3d(0, 0, 0);
				}
			}

			>>>.el-menu-item, >>>.el-submenu__title {
				color: #000;
				letter-spacing: 0.5px;

				.icon-svg {
					height: 17px;
					width: 17px;
					margin: 0 15px 0 5px;
					position: relative;
					top: 1px;
				}

				span {
					font-size: 13px;
					display: inline-block;
				}
			}

			&.el-menu--collapse {
				>>>.el-submenu__title {
					.icon-svg {
						margin-left: 2px;
						height: 19px;
						width: 19px;
					}
				}
			}

			>>>.el-menu-item {
				&.is-active {
					color: $color2;
					background-color: #E5F1FB;
				}
			}
		}
	}
}
</style>

<style lang="stylus">
.el-menu--popup-right-start {
	.el-menu-item {
		display: flex;
		align-items: center;

		.icon-svg {
			height: 18px;
			width: 18px;
			margin: 0 15px 0 5px;
		}
	}
}
</style>
