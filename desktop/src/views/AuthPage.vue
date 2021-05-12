<template>
	<div id="auth" class="d-flex align-items-center justify-content-center" :style="clientHeight">
		<div v-if="isLoggingIn">
			<h1>Orderify</h1>
			<h2>Login</h2>
			<br />
			<MDBInput
				inputGroup
				:formOutline="false"
				wrapperClass="flex-nowrap"
				v-model="user"
				aria-label="Usuário"
				placeholder="Usuário"
			>
				<template #prepend>
					<span class="input-group-text">
						<i class="mdi mdi-account"></i>
					</span>
				</template>
			</MDBInput>
			<br />
			<MDBInput
				inputGroup
				:formOutline="false"
				wrapperClass="flex-nowrap"
				v-model="passwd"
				aria-label="Senha"
				placeholder="Senha"
				type="password"
			>
				<template #prepend>
					<span class="input-group-text">
						<i class="mdi mdi-key"></i>
					</span>
				</template>
			</MDBInput>
			<br />
			<div>
				<MDBBtn @click="logIn" color="success" rounded>Entrar</MDBBtn>&nbsp;
				<MDBBtn
					@click="isLoggingIn = !isLoggingIn"
					style="font-size: x-small !important"
					color="danger"
					rounded
					>Esqueceu a Senha?</MDBBtn
				>
			</div>
		</div>
		<div v-else>
			<h1>Orderify</h1>
			<h2>Troca de Senha</h2>
			<br />
			<MDBInput
				inputGroup
				:formOutline="false"
				wrapperClass="flex-nowrap"
				v-model="user"
				aria-label="Usuário"
				placeholder="Usuário"
			>
				<template #prepend>
					<span class="input-group-text">
						<i class="mdi mdi-account"></i>
					</span>
				</template>
			</MDBInput>
			<br />
			<div>
				<MDBBtn color="success" rounded>Enviar Solicitação</MDBBtn>&nbsp;
				<MDBBtn
					@click="isLoggingIn = !isLoggingIn"
					style="font-size: x-small !important"
					color="warning"
					rounded
					>Retornar</MDBBtn
				>
			</div>
			<br />
		</div>
		<div v-if="isLoading" class="overlay">
			<div
				class="mask"
				style="background: linear-gradient(45deg, rgba(29, 236, 197, 0.7), rgba(91, 14, 214, 0.7) 100%);"
			></div>
			<MDBSpinner style="width: 50px; height: 50px" />
		</div>
		<MDBModal v-model="show">
			<MDBModalHeader color="danger" style="color: white">
				<MDBModalTitle>Erro na Autenticação!</MDBModalTitle>
			</MDBModalHeader>
			<MDBModalBody>
				<p>Cheque suas credenciais e verifique se o servidor se encontra ativo!</p>
			</MDBModalBody>
			<MDBModalFooter>
				<MDBBtn color="danger" @click="(show = !show), (isLoading = !isLoading)">
					OK
				</MDBBtn>
			</MDBModalFooter>
		</MDBModal>
	</div>
</template>

<script>
import {
	MDBInput,
	MDBBtn,
	MDBSpinner,
	MDBModal,
	MDBModalHeader,
	MDBModalTitle,
	MDBModalBody,
	MDBModalFooter,
} from "mdb-vue-ui-kit";
import axios from "axios";

export default {
	name: "AuthPage",
	components: {
		MDBInput,
		MDBBtn,
		MDBSpinner,
		MDBModal,
		MDBModalHeader,
		MDBModalTitle,
		MDBModalBody,
		MDBModalFooter,
	},
	data: () => {
		return {
			clientHeight: "height: 500px",
			user: "",
			passwd: "",
			isLoggingIn: true,
			isLoading: false,
			show: false,
		};
	},
	async mounted() {
		this.clientHeight = `height: ${window.screen.availHeight}px`;
		localStorage.user = null;
		const USER_LOGIN_RESULT = await axios.post("http://localhost:8080/user/get", {
			headers: {
				withCredentials: true,
			},
		});

		if (USER_LOGIN_RESULT.data === "ALREADY_LOGGED_IN") {
			this.$router.push("/dashboard");
		}

		window.addEventListener("keypress", (event) => {
			event.key === "Enter" ? this.logIn() : console.log();
		});
	},
	methods: {
		async logIn() {
			this.isLoading = true;
			const USER_LOGIN_RESULT = await axios.post("http://localhost:8080/user/get", {
				user: this.user,
				password: this.passwd,
				headers: {
					withCredentials: true,
				},
			});

			if (USER_LOGIN_RESULT.data === "ALREADY_LOGGED_IN") {
				this.$router.push("/dashboard");
				this.isLoading = false;
			} else if (USER_LOGIN_RESULT.data === "OK") {
				localStorage.currentUser = this.user;
				this.$router.push("/dashboard");
				this.isLoading = false;
			} else {
				this.show = true;
			}
		},
	},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.fade-enter-active,
.fade-leave-active {
	transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active em versões anteriores a 2.1.8 */ {
	opacity: 0;
}

.overlay {
	position: fixed;
	top: 0%;
	left: 0%;
	min-width: 100%;
	min-height: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
}
</style>
