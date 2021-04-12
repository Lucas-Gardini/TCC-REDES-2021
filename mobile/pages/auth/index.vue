<template>
	<v-card class="pb-10 pr-15 pl-15 pt-10" style="width: 100%">
		<v-form v-if="login" ref="form" v-model="valid" lazy-validation>
			<div class="m-auto">
				<div class="text-center">
					<img
						width="128"
						style="text-align: center"
						src="/logo.png"
					/>
					<p>Orderify - Login</p>
				</div>
				<v-alert
					:value="alert"
					color="pink"
					dark
					border="top"
					icon="mdi-key"
					transition="scale-transition"
				>
					Usuário ou senha incorretos
				</v-alert>
				<v-alert
					:style="erroralert"
					color="red"
					elevation="24"
					type="error"
				>
					Conexão com o servidor recusada, {{ error }}
				</v-alert>
				<v-text-field
					v-model="name"
					:rules="nameRules"
					label="Name"
					required
				></v-text-field>

				<v-text-field
					v-model="password"
					class="mt-5"
					:rules="passwordRules"
					label="Password"
					required
					type="password"
				></v-text-field>

				<v-btn
					:disabled="!valid"
					color="green"
					class="mr-4 mt-5"
					@click="validate"
				>
					<span v-if="loading"
						><v-progress-circular
							indeterminate
							:size="25"
							color="white"
						></v-progress-circular>
						Carregando</span
					>
					<span v-else><i class="mdi mdi-login"></i>&nbsp;Login</span>
				</v-btn>
				<v-btn color="blue" class="mr-4 mt-5" @click="forgotPass()">
					<i class="mdi mdi-key-variant"></i>&nbsp;Esqueceu a senha?
				</v-btn>
			</div>
		</v-form>
		<v-form v-if="passwd" ref="form" v-model="valid" lazy-validation>
			<div class="m-auto">
				<div v-ripple="{ center: true }" class="text-center">
					<img
						width="128"
						style="text-align: center"
						src="/logo.png"
					/>
					<p>Orderify - Recuperar Conta</p>
				</div>
				<v-text-field
					v-model="name"
					:rules="nameRules"
					label="Name"
					required
				></v-text-field>

				<v-btn
					:disabled="!valid"
					color="green"
					class="mr-4 mt-5"
					@click="validate"
				>
					<i class="mdi mdi-login"></i>&nbsp;Enviar Solicitação
				</v-btn>
				<v-btn
					color="red"
					class="mr-4 mt-5"
					@click="forgotPass('leave')"
				>
					<i class="mdi mdi-close"></i>&nbsp;Cancelar
				</v-btn>
			</div>
		</v-form>
		<div class="loader" style="display: none">
			<div id="loading">
				<v-progress-circular
					indeterminate
					color="primary"
				></v-progress-circular>
			</div>
		</div>
	</v-card>
</template>

<script>
import { mapMutations } from 'vuex';

export default {
	data: () => ({
		valid: true,
		name: '',
		nameRules: [(v) => !!v || 'Insira o nome de usuário'],
		password: '',
		passwordRules: [(v) => !!v || 'Insira a senha'],
		loading: false,
		login: true,
		passwd: false,
		alert: false,
		error: '',
		erroralert: 'display: none',
	}),
	beforeCreate() {
		if (this.$store.getters.getAuthentication) {
			this.$router.push('/');
			return true;
		}
	},
	methods: {
		async validate() {
			this.erroralert = 'display: none';
			this.error = '';
			if (this.$refs.form.validate()) {
				this.loading = true;
				try {
					const auth = await this.$axios.$post(
						'http://localhost:8080/user/get',
						{
							user: this.name,
							password: this.password,
						}
					);
					console.log(auth);
					if (auth === 'OK') {
						this.authenticate({
							user: this.name,
							password: this.password,
						});
						this.$router.push('/');
					} else {
						this.alert = true;
						setTimeout(() => {
							this.alert = false;
						}, 5000);
						console.log('invalid');
					}
					this.loading = false;
				} catch (e) {
					this.erroralert = '';
					this.error = e;
					this.loading = false;
				}
			}
		},
		// reset() {
		// 	this.$refs.form.reset()
		// },
		// resetValidation() {
		// 	this.$refs.form.resetValidation()
		// },
		forgotPass(func = 'login') {
			if (func === 'login') {
				this.login = false;
				this.passwd = true;
			} else {
				this.login = true;
				this.passwd = false;
			}
		},
		mounted() {
			console.log(this.$store);
		},
		...mapMutations({
			authenticate: 'authenticate',
		}),
	},
};
</script>

<style>
.loader {
	position: absolute;
	top: 0%;
	left: 0%;
	min-width: 100%;
	min-height: 100%;
	max-width: 100%;
	max-height: 100%;
	display: grid;
	place-items: center;
	background-color: black;
	z-index: 9;
}
</style>
