<template>
	<div class="ui-components">
		<div class="block" :ref="`col-${index + 1}`" v-for="(item, index) in layout" :key="index">
			<transition-group name="fade">
				<component
					:ref="item2"
					:is="item2"
					:key="item2 + index2"
					v-for="(item2, index2) in item"
				></component>
			</transition-group>
		</div>
	</div>
</template>

<script>
import BClUpload from './lib/b-cl-upload';
import BClViewer from './lib/b-cl-viewer';
import BVCopy from './lib/b-v-copy';
import BIconSvg from './lib/b-icon-svg';
import BClCrud from './lib/b-cl-crud';
import BClForm from './lib/b-cl-form';
import BClSmsBtn from './lib/b-cl-sms-btn';
import BClContextMenu from './lib/b-cl-context-menu';
import BErrorPage from './lib/b-error-page';
import BClEditorQuill from './lib/b-cl-editor-quill';

export default {
	components: {
		BClUpload,
		BClViewer,
		BVCopy,
		BIconSvg,
		BClCrud,
		BClForm,
		BClSmsBtn,
		BClContextMenu,
		BErrorPage,
		BClEditorQuill
	},

	data() {
		return {
			list: [
				'b-cl-upload'
				// 'b-cl-viewer',
				// 'b-cl-crud',
				// 'b-icon-svg',
				// 'b-v-copy',
				// 'b-cl-form',
				// 'b-cl-sms-btn',
				// 'b-cl-context-menu',
				// 'b-error-page',
				// 'b-cl-editor-quill'
			],
			layout: [[], [], [], []]
		};
	},

	mounted() {
		this.append();
	},

	methods: {
		getHeight(name) {
			return this.$refs[name][0].offsetHeight;
		},

		selectCol() {
			const h1 = this.getHeight('col-1');
			const h2 = this.getHeight('col-2');
			const h3 = this.getHeight('col-3');
			const h4 = this.getHeight('col-4');

			switch (Math.min(h1, h2, h3, h4)) {
				case h1:
					return 0;
				case h2:
					return 1;
				case h3:
					return 2;
				case h4:
					return 3;
				default:
					return 0;
			}
		},

		append(index = 0) {
			const i = this.selectCol();
			const item = this.list[index];

			if (!item) {
				return false;
			}

			this.layout[i].push(item);

			this.$nextTick(() => {
				setTimeout(() => {
					this.append(index + 1);
				}, 100);
			});
		}
	}
};
</script>

<style lang="stylus">
&.fade-enter-active, &.fade-leave-active {
	transition: all 0.5s ease;
}

&.fade-enter, &.fade-leave-active {
	opacity: 0;
}

.ui-components {
	overflow-y: auto;

	.block {
		width: calc(25% - 10px);
		margin-right: 10px;
		float: left;
	}

	.scope {
		background-color: #fff;
		border-radius: 3px;
		margin-bottom: 10px;

		.h {
			height: 30px;
			display: flex;
			align-items: center;
			padding: 10px;
			font-size: 12px;

			span {
				background-color: $color2;
				color: #fff;
				border-radius: 3px;
				padding: 2px 5px;
				margin-right: 10px;
				font-size: 14px;
				letter-spacing: 1px;
			}
		}

		.c {
			padding: 10px;

			&._svg {
				.icon-svg {
					margin-right: 15px;
				}
			}

			a {
				font-size: 13px;
				color: #666;
				position: relative;

				&:hover {
					color: $color2;

					&:after {
						content: '';
						width: 100%;
						height: 1px;
						position: absolute;
						bottom: -2px;
						left: 0;
						background-color: $color2;
					}
				}
			}
		}

		.f {
			height: 30px;
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding: 10px;
			font-size: 12px;

			.date {
				color: #999;
			}
		}
	}
}
</style>
