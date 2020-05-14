<template>
	<div class="cl-sms-btn">
		<slot name="reference">
			<el-button size="small" @click="openForm">{{
				count == count2 ? '获取验证码' : count2 + 's后重试'
			}}</el-button>
		</slot>

		<cl-form ref="cl-form"></cl-form>
	</div>
</template>

<script>
export default {
	props: {
		count: {
			type: Number,
			default: 60
		}
	},

	data() {
		const count2 = this.count;

		return {
			timer: null,
			svg: '',
			captchaId: '',
			loading: false,
			count2
		};
	},

	methods: {
		async getCaptcha() {
			this.loading = true;

			const { data, captchaId } = await this.$service.common.captcha({
				height: 40,
				width: 120
			});

			this.svg = data;
			this.captchaId = captchaId;
			this.loading = false;
		},

		async openForm() {
			if (this.count2 != this.count) {
				return false;
			}

			let _this = this;

			this.$refs['cl-form'].open({
				props: {
					title: '图片验证码',
					width: '400px'
				},

				items: [
					{
						prop: 'code',
						component: {
							name: 'image-code',

							data() {
								return {
									code: ''
								};
							},

							mounted() {
								_this.getCaptcha();
							},

							watch: {
								code(val) {
									this.$emit('input', val);
								}
							},

							render() {
								return (
									<el-row type="flex" v-loading={_this.loading}>
										<el-input
											v-model={this.code}
											maxlength="4"
											style={{ width: '240px' }}
										/>

										<div
											class="svg"
											on-click={_this.getCaptcha}
											style={{
												height: '30px',
												width: '120px',
												position: 'relative',
												top: '-10px'
											}}
											{...{
												domProps: {
													innerHTML: _this.svg
												}
											}}></div>
									</el-row>
								);
							}
						},
						rules: [
							{
								required: true,
								message: '图片验证码不能为空'
							},
							{
								min: 4,
								max: 4,
								message: '图片验证码为4个字符',
								trigger: 'blur'
							}
						]
					}
				],

				on: {
					submit: (data, done) => {
						this.$message.success('发送短信验证码成功');
						done();
						this.send();
						this.$emit('success', this.captchaId);
					}
				}
			});
		},

		send() {
			this.count2 = this.count - 1;

			this.timer = setInterval(() => {
				this.count2 -= 1;

				if (this.count2 <= 0) {
					this.count2 = this.count;
					clearInterval(this.timer);
				}
			}, 1000);
		}
	}
};
</script>
