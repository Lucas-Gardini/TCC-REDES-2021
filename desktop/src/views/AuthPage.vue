<template>
	<div v-if="updated" class="fullscreen">
		<MDBContainer fluid>
			<MDBRow class="align-items-center">
				<MDBCol :class="smallMode ? 'left-panel-no-margin' : 'left-panel'">
					<div style="margin-top: 15px">
						<!-- <img width="64" height="64" src="../assets/icon.png" class="img-fluid" /> -->
						<h1>Login</h1>
						<hr />
					</div>
					<div style="margin-top: auto; margin-bottom: auto">
						<div>
							<MDBInput
								inputGroup
								:formOutline="true"
								v-model="user"
								aria-label="Usuário"
								placeholder="Usuário"
							>
								<template #prepend>
									<span class="input-group-text" style="height: 35.25px !important">
										<i class="mdi mdi-account-circle"></i>
									</span>
								</template>
							</MDBInput>
						</div>
						<br />
						<div>
							<div>
								<MDBInput
									style="border-right: 0px solid transparent !important"
									inputGroup
									:formOutline="false"
									v-model="passwd"
									aria-label="Senha"
									placeholder="Senha"
									:type="showPassword ? 'text' : 'password'"
								>
									<span
										class="input-group-text showPasswordButton"
										style="height: 35.25px !important"
										@click="showPassword = !showPassword"
									>
										<i v-if="!showPassword" class="mdi mdi-eye"></i>
										<i v-else class="mdi mdi-eye-off"></i>
									</span>
									<template #prepend>
										<span class="input-group-text" style="height: 35.25px !important">
											<i class="mdi mdi-key-variant"></i>
										</span>
									</template>
								</MDBInput>
							</div>
						</div>
						<div
							style="display: grid; grid-template-columns: repeat(2, 50%); grid-template-rows: auto; grid-column-gap: 0px; grid-row-gap: 0px;;margin-top: 10px; margin-bottom: 10px; margin-left: 5px; margin-right: 5px"
						>
							<div
								@click="rememberUserLoginCredentials = !rememberUserLoginCredentials"
								style="grid-area: 1 / 1 / 2 / 2; cursor: pointer; user-select: none;"
							>
								<input
									class="form-check-input"
									type="checkbox"
									aria-required="false"
									v-model="rememberUserLoginCredentials"
								/>Lembrar de mim
							</div>
							<div
								style="grid-area: 1 / 2 / 2 / 3; text-align: right; display: flex; opacity: 0"
							>
								<a
									href="javascript:void(0)"
									@click="isLoggingIn = !isLoggingIn"
									role="button"
									style="margin-left: auto; color: rgb(59, 89, 152);"
								>
									Esqueceu a senha?
								</a>
							</div>
						</div>
						<div>
							<MDBBtn @click="logIn" color="success" rounded>
								<i class="mdi mdi-login-variant"></i> Entrar</MDBBtn
							>&nbsp;
						</div>
					</div>
				</MDBCol>
				<transition name="fade">
					<MDBCol class="right-panel" v-if="!smallMode">
						<img src="../assets/icon-variant.png" />
					</MDBCol>
				</transition>
			</MDBRow>
		</MDBContainer>
		<div v-if="isLoading" class="overlay">
			<div class="mask" style="background-color: rgba(12, 12, 12, 0.5)"></div>
			<div v-if="serverConnection">
				<MDBSpinner color="success" style="width: 50px; height: 50px; color: #00B74A !important" />
			</div>
			<div v-else>
				<MDBCard text="center" style="color: #121212">
					<MDBCardHeader color="danger" style="background-color: #F93154; color: aliceblue"
						><i class="mdi mdi-exclamation-thick"></i> Erro
						<i class="mdi mdi-exclamation-thick"></i
					></MDBCardHeader>
					<MDBCardBody>
						<MDBCardTitle>Sem conexão com o servidor</MDBCardTitle>
						<MDBCardText>
							Verifique se o servidor está de pé e que a conexão está estabelecida!
						</MDBCardText>
						<MDBBtn @click="checkServerConnection" color="success"
							><i class="mdi mdi-check-bold"></i> Entendi!</MDBBtn
						>
						<MDBBtn @click="$router.push('/dashboard/settings')" color="secondary">
							<i class="mdi mdi-cog"></i> Configurações
						</MDBBtn>
					</MDBCardBody>
					<MDBCardFooter class="text-muted">Caso o erro persista, contate o suporte!</MDBCardFooter>
				</MDBCard>
			</div>
		</div>
		<div id="serverAddressChanged" style="margin-right: 10px">
			<a href="javascript:void(0)" @click.prevent="redirectToSettings()">servidor não configurado?</a>
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
	</div>
	<div v-else id="auth" class="d-flex align-items-center justify-content-center" :style="clientHeight">
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
	MDBContainer,
	MDBRow,
	MDBCol,
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
		MDBContainer,
		MDBRow,
		MDBCol,
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
			rememberUserLoginCredentials: false,
			updated: true,
			smallMode: false,
			showPassword: false,
		};
	},
	async mounted() {
		this.clientHeight = `height: ${window.screen.availHeight}px; margin-top: -50px`;
		this.responsivityCheck();
		window.addEventListener("resize", this.responsivityCheck);
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
				localStorage.currentUser = this.user;
			}
		} catch (err) {
			if (err) {
				this.isLoading = true;
				this.serverConnection = false;
			}
		}
		if (localStorage.rememberUser && localStorage.currentUser.length > 0) {
			this.user = localStorage.currentUser;
			this.passwd = localStorage.currentPasswd;
			this.logIn();
		} else {
			localStorage.currentUser = null;
			localStorage.currentPasswd = null;
		}

		window.addEventListener("keypress", (event) => {
			event.key === "Enter" ? this.logIn() : console.log();
		});
	},
	methods: {
		responsivityCheck() {
			if (window.innerWidth < 800 || window.innerHeight < 460) {
				this.smallMode = true;
			} else {
				this.smallMode = false;
			}
		},
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
				localStorage.currentPasswd = this.passwd;
				localStorage.rememberUser = this.rememberUserLoginCredentials;
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
* {
	font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
	/* cursor: url("../assets/cursors/kawaii-pizza.gif"), auto !important; */
	-webkit-touch-callout: none; /* iOS Safari */
	-webkit-user-select: none; /* Safari */
	-khtml-user-select: none; /* Konqueror HTML */
	-moz-user-select: none; /* Old versions of Firefox */
	-ms-user-select: none; /* Internet Explorer/Edge */
	user-select: none; /* Non-prefixed version, currently
                                  supported by Chrome, Edge, Opera and Firefox */
}

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

#serverAddressChanged a {
	color: #00b74a;
}

#serverAddressChanged:hover {
	transition: text-decoration 1s;
}

.fullscreen {
	position: fixed;
	top: 0%;
	left: 0%;
	min-width: 100vw;
	min-height: 100vh;
	max-width: 100vw;
	max-height: 100vh;
	display: grid;
	place-items: center;
}

.left-panel {
	display: flex;
	flex-direction: column;
	margin-left: 10%;
	border: 0.5px solid rgba(18, 18, 18, 0.75);
	border-right: none;
	min-height: 80vh;
}
.left-panel-no-margin {
	display: flex;
	flex-direction: column;
}
.right-panel {
	text-align: center;
	background-image: url("../assets/authBackground.svg");
	background-position: center;
	background-repeat: no-repeat;
	background-size: cover;
	margin-right: 10%;
	border: 0.5px solid rgba(18, 18, 18, 0.75);
	border-left: none;
	min-height: 80vh;
	display: flex;
}

.right-panel img {
	margin: auto;
	width: 80%;
	height: 80%;
}

.btn.btn-success.btn-rounded.ripple-surface {
	min-width: 100%;
}

.showPasswordButton {
	border-left: 0px solid transparent !important;
}

.showPasswordButton:hover {
	cursor: pointer;
	background-color: #5050500f;
	color: #121212;
}

/* Checkbox Style */
.form-check-input:before {
	content: "" !important;
	opacity: 0 !important;
}
.form-check-input[type="checkbox"]:checked {
	background-image: none !important;
	background-color: #00b74a !important;
}
.form-check-input:checked {
	border-color: #00b74a !important;
}
.form-check-input:checked {
	background-color: #00b74a !important;
	border-color: #00b74a !important;
}
.form-check-input[type="checkbox"]:checked {
	background-color: #00b74a !important;
}

.fade-enter-active {
	transition: opacity 0.3s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active em versões anteriores a 2.1.8 */ {
	opacity: 0;
}
</style>
