<template>
	<div class="scope-topbar">
		<div class="collapse" @click="collapse">
			<icon-svg name="icon-menu"></icon-svg>
		</div>

		<el-menu :default-active="index" mode="horizontal" @select="onSelect">
			<el-menu-item v-for="(item, index) in this.menuGroup" :index="`${index}`" :key="index">
				<icon-svg v-if="item.icon" :name="item.icon"></icon-svg>
				<span>{{ item.name }}</span>
			</el-menu-item>
		</el-menu>

		<div class="flex1"></div>

		<ul class="tools">
			<li-notice></li-notice>
		</ul>

		<div class="user" v-if="userInfo">
			<el-dropdown trigger="click" :hide-on-click="false" @command="onCommand">
				<span class="el-dropdown-link">
					<span class="name">{{ userInfo.nickName | default_name }}</span>
					<img class="avatar" :src="userInfo.headImg | default_avatar" alt="" />
				</span>

				<el-dropdown-menu slot="dropdown" class="popper-dropdown-menu-user">
					<el-dropdown-item command="my">个人中心</el-dropdown-item>
					<el-dropdown-item command="exit">退出</el-dropdown-item>
				</el-dropdown-menu>
			</el-dropdown>
		</div>
	</div>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex';
import { href, firstMenu } from '@/cool/utils/index';
import LiNotice from './tools/notice';

export default {
	components: {
		LiNotice
	},

	data() {
		return {
			index: '0'
		};
	},

	mounted() {
		this.menuGroup.forEach((e, i) => {
			if (this.$route.path.includes(e.path) && e.path != '/') {
				this.index = String(i);
				this.SET_MENU_LIST(i);
			}
		});
	},

	computed: {
		...mapGetters(['menuGroup', 'userInfo', 'menuCollapse'])
	},

	methods: {
		...mapMutations(['SET_MENU_GROUP', 'SET_MENU_LIST', 'COLLAPSE_MENU']),

		onSelect(index) {
			this.SET_MENU_LIST(index);

			const url = firstMenu(this.menuGroup[index].children);
			this.$router.push(url);
		},

		onCommand(name) {
			switch (name) {
				case 'my':
					this.$router.push('/my/info');
					break;
				case 'exit':
					this.$store.dispatch('userLogout').done(() => {
						href('/login');
					});
					break;
			}
		},

		collapse() {
			this.COLLAPSE_MENU(!this.menuCollapse);
		}
	}
};
</script>

<style lang="stylus" scoped>
.popper-dropdown-menu-user {
	width: 160px;
}
</style>

<style lang="stylus" scoped>
.scope-topbar {
	display: flex;
	align-items: center;
	height: 50px;
	padding: 0 10px;
	background: linear-gradient(120deg, $color2, $color);
	color: #fff;
	box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);

	.collapse {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 40px;
		width: 40px;
		cursor: pointer;

		.icon-svg {
			height: 22px;
			width: 22px;
		}
	}

	.el-menu {
		height: 50px;
		background: transparent;
		border-bottom: 0;
		overflow: hidden;

		.el-menu-item {
			height: 50px;
			display: flex;
			align-items: center;
			background: transparent;
			border-bottom: 0;
			color: #fff;
			padding: 0 40px;

			span {
				font-size: 12px;
				margin-left: 3px;
				line-height: normal;
			}

			&.is-active {
				background: rgba(255, 255, 255, 0.13);
			}

			>>>.icon-svg {
				height: 18px;
				width: 18px;
				margin-right: 5px;
			}
		}
	}

	.flex1 {
		flex: 1;
	}

	.tools {
		margin-right: 40px;

		>>>li {
			list-style: none;
			height: 45px;
			width: 45px;
			display: flex;
			justify-content: center;
			align-items: center;
			cursor: pointer;
			position: relative;

			i {
				font-size: 20px;

				&:hover {
					opacity: 0.8;
				}
			}

			.tag {
				height: 14px;
				min-width: 10px;
				border-radius: 14px;
				position: absolute;
				left: 30px;
				top: 1px;
				background-color: red;
				color: #fff;
				text-align: center;
				line-height: 13px;
				font-size: 12px;
				padding: 1px 3px;
				transform: scale(0.9);
			}
		}
	}

	.user {
		margin-right: 10px;
		cursor: pointer;

		.el-dropdown-link {
			display: flex;
			align-items: center;
			color: #fff;
		}

		.avatar {
			height: 32px;
			width: 32px;
			border-radius: 32px;
		}

		.name {
			white-space: nowrap;
			margin-right: 15px;
		}

		.el-icon-arrow-down {
			margin-left: 10px;
		}
	}
}
</style>
