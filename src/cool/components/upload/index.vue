<template>
	<div class="cl-upload">
		<el-input type="hidden" v-model="value"></el-input>

		<el-upload
			v-for="(item, index) in list"
			:key="index"
			accept="image/*"
			v-bind="props"
			:headers="{
				Authorization: token
			}"
			:action="action"
			:show-file-list="false"
			:on-success="
				(res, file) => {
					onSuccess(res, file, item);
				}
			"
			:on-error="onError"
			:before-upload="
				e => {
					beforeUpload(e, item);
				}
			"
		>
			<div class="upload-wrap" v-loading="item.loading">
				<img :src="item.url" alt="" v-if="item.url" />
				<i class="el-icon-plus avatar-uploader-icon" v-else></i>

				<i class="el-icon-close" v-if="item.url" @click.stop="removeFile(index)"></i>
			</div>
		</el-upload>
	</div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
	props: {
		props: {
			type: Object,
			default: () => {
				return {};
			}
		},
		value: [Array, String]
	},

	data() {
		const upload = this.$service.common.upload();

		return {
			action: upload.url,
			list: []
		};
	},

	computed: {
		...mapGetters(['token'])
	},

	watch: {
		value() {
			this.render();
		}
	},

	mounted() {
		this.render();
	},

	methods: {
		render() {
			const { multiple } = this.props;

			let val = this.value;

			if (multiple) {
				let list = [];

				if (val instanceof Array) {
					list = val;
				} else {
					list = (val || '').split(',');
				}

				this.list = list.filter(Boolean).map(e => {
					return {
						url: e,
						loading: false
					};
				});

				this.ajSize();
			} else {
				this.list = [
					{
						url: val,
						loading: false
					}
				];
			}
		},

		callback() {
			this.ajSize();

			this.$emit(
				'input',
				this.list
					.filter(e => e.url)
					.map(e => e.url)
					.join(',')
			);
		},

		ajSize() {
			const { 'multiple-limit': multipleLimit = 1 } = this.props;

			if (this.list.length < multipleLimit) {
				this.list.unshift({});
			}
		},

		beforeUpload(file, item) {
			if (this.props && this.props['before-upload']) {
				this.props['before-upload'](file);
			}

			item.loading = true;
		},

		onSuccess(res, file, item) {
			const { code, data, message } = res;
			const { multiple } = this.props;

			if (code == 1000) {
				item.loading = false;

				if (multiple) {
					if (item.url) {
						item.url = data;
					} else {
						this.list.push({
							url: data
						});
					}
				} else {
					this.list = [
						{
							url: data
						}
					];
				}

				this.callback();

				if (this.props && this.props['on-success']) {
					this.props['on-success'](res, file);
				}
			} else {
				this.onError(message);
			}
		},

		onError(err, file, fileList) {
			console.error('upload error', err);
			this.$message.error(err.toString());
			this.loading = false;

			if (this.props && this.props['on-error']) {
				this.props['on-error'](err, file, fileList);
			}
		},

		removeFile(i) {
			this.list.splice(i, 1);
			this.callback();
		}
	}
};
</script>

<style lang="stylus" scoped>
.cl-upload {
	display: flex;
	flex-wrap: wrap;

	.upload-wrap {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 120px;
		width: 120px;
		cursor: pointer;
		border: 1px dashed #d9d9d9;
		border-radius: 6px;
		margin-right: 10px;
		position: relative;

		.el-icon-plus {
			font-size: 28px;
			color: #8c939d;
		}

		.el-icon-close {
			position: absolute;
			right: 5px;
			top: 5px;
			color: red;
			background-color: #F56C6C;
			color: #fff;
			border-radius: 100%;
			padding: 2px;

			&:hover {
				background-color: red;
			}
		}

		img {
			height: 100%;
			width: 100%;
			border-radius: 6px;
		}

		&:hover {
			border: 1px dashed #409EFF;
		}
	}
}
</style>
