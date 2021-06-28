<template>
	<div id="auth" class="d-flex align-items-center justify-content-center" :style="clientHeight">
		<div v-if="isLoggingIn">
			<div style="text-align: center; border-bottom: 1px solid black">
				<h1>Orderify</h1>
				<h2>Login</h2>
			</div>
			<br />
			<MDBInput label="Usuário" type="text" v-model="user" />
			<br />
			<MDBInput label="Senha" type="password" v-model="passwd" />
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
			<div style="text-align: center; border-bottom: 1px solid black">
				<h1>Orderify</h1>
				<h2>Troca de Senha</h2>
			</div>
			<br />
			<MDBInput label="Usuário" type="text" v-model="user" />
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
			<div v-if="serverConnection">
				<MDBSpinner color="success" style="width: 50px; height: 50px;" />
			</div>
			<div v-else>
				<MDBCard text="center" style="color: #121212">
					<MDBCardHeader
						color="danger"
						style="background-color: #F93154; color: aliceblue"
						><MDBIcon icon="exclamation-triangle" iconStyle="fas"/> Erro
						<MDBIcon icon="exclamation-triangle" iconStyle="fas"
					/></MDBCardHeader>
					<MDBCardBody>
						<MDBCardTitle>Sem conexão com o servidor</MDBCardTitle>
						<MDBCardText>
							Verifique se o servidor está de pé e que a conexão está estabelecida!
						</MDBCardText>
						<MDBBtn @click="checkServerConnection" color="success"
							><MDBIcon icon="check" iconStyle="fas" /> Entendi!</MDBBtn
						>
						<MDBBtn @click="$router.push('/dashboard/settings')" color="secondary">
							<MDBIcon icon="wrench" iconStyle="fas" /> Configurações
						</MDBBtn>
					</MDBCardBody>
					<MDBCardFooter class="text-muted"
						>Caso o erro persista, contate o suporte!</MDBCardFooter
					>
				</MDBCard>
			</div>
		</div>
		<MDBModal staticBackdrop v-model="show">
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
		<div id="serverAddressChanged">
			<a href="javascript:void(0)" @click.prevent="redirectToSettings()"
				>servidor não configurado?</a
			>
		</div>
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
	MDBCard,
	MDBCardHeader,
	MDBCardBody,
	MDBCardText,
	MDBCardTitle,
	MDBCardFooter,
	MDBIcon,
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
		MDBCard,
		MDBCardHeader,
		MDBCardText,
		MDBCardBody,
		MDBCardTitle,
		MDBCardFooter,
		MDBIcon,
	},
	data: () => {
		return {
			clientHeight: "height: 500px;",
			user: "",
			passwd: "",
			isLoggingIn: true,
			isLoading: false,
			show: false,
			serverConnection: true,
		};
	},
	async mounted() {
		this.clientHeight = `height: ${window.screen.availHeight}px; margin-top: -50px`;
		try {
			const USER_LOGIN_RESULT = await axios.post(`${localStorage.serverAddress}/user/get`, {
				headers: {
					withCredentials: true,
				},
			});

			if (USER_LOGIN_RESULT.data === "ALREADY_LOGGED_IN") {
				this.$router.push("/dashboard");
			} else {
				localStorage.user = null;
			}
		} catch (err) {
			if (err) {
				this.isLoading = true;
				this.serverConnection = false;
			}
		}

		window.addEventListener("keypress", (event) => {
			event.key === "Enter" ? this.logIn() : console.log();
		});
	},
	methods: {
		async logIn() {
			this.isLoading = true;
			const USER_LOGIN_RESULT = await axios.post(`${localStorage.serverAddress}/user/get`, {
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
		async checkServerConnection() {
			try {
				const ping = await axios.get(`${localStorage.serverAddress}/ping`);
				if (ping.data === "Pong!") {
					this.isLoading = false;
					this.serverConnection = true;
				}
			} catch (e) {
				this.isLoading = true;
				this.serverConnection = false;
			}
		},
		redirectToSettings() {
			this.$router.push("/dashboard/settings");
		},
	},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.fade-enter-active,
.fade-leave-active {
	transition: all 0.1s ease;
}

.fade-enter-from,
.fade-leave-to {
	opacity: 0;
	transform: translateX(50vw);
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

#serverAddressChanged {
	transition: text-decoration 1s;
	position: absolute;
	bottom: 0;
	right: 0;
	text-decoration: none;
}

#serverAddressChanged:hover {
	transition: text-decoration 1s;
	text-decoration: underline;
}
</style>
