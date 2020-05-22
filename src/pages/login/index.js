import Captcha from '@/components/common/captcha';

export default {
	components: {
		Captcha
	},

	data() {
		return {
			form: {
				username: 'admin',
				password: '',
				captchaId: '',
				verifyCode: ''
			},
			saving: false,
			loading: true
		};
	},

	mounted() {
		this.loading = false;
	},

	methods: {
		captchaChange() {
			this.form.verifyCode = '';
		},

		async next() {
			const { username, password, verifyCode } = this.form;

			if (!username) {
				return this.$message.warning('用户名不能为空');
			}

			if (!password) {
				return this.$message.warning('密码不能为空');
			}

			if (!verifyCode) {
				return this.$message.warning('图片验证码不能为空');
			}

			this.saving = true;

			try {
				// 登录
				await this.$store.dispatch('userLogin', this.form);

				// 用户信息
				await this.$store.dispatch('userInfo');

				// 权限菜单
				const [first] = await this.$store.dispatch('permMenu');

				this.saving = false;

				if (!first) {
					this.$message.error('该账号没有权限');
				} else {
					this.$nextTick(() => {
						this.$router.push('/');
					});
				}
			} catch (err) {
				this.$refs.captcha.refresh();
				this.saving = false;

				this.$message.error(err);
			}
		}
	}
};
