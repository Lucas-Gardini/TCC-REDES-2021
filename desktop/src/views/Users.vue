<template>
	<MDBContainer>
		<h1 style="margin-top: 20px">
			Usuários
			<MDBBtn color="success" @click="isCreatingUser = !isCreatingUser" floating>
				<MDBIcon v-if="!isCreatingUser" icon="plus"></MDBIcon>
				<MDBIcon v-else icon="minus"></MDBIcon>
			</MDBBtn>
		</h1>
		<MDBContainer v-if="isLoaded">
			<MDBRow v-if="isCreatingUser" style="margin-bottom: 100px">
				<MDBCard class="border">
					<MDBCardHeader style="display: flex; flex-direction: row; align-content: space-between;">
						<MDBCardTitle style="margin-top: auto; margin-bottom: auto;">
							<div style="display: flex;">
								<span style="margin-left: 10px"
									><i class="mdi mdi-account-multiple-plus"></i> Novo Usuário</span
								>
							</div>
						</MDBCardTitle>
						<div style="margin-left: auto">
							<MDBBtn @click="saveNewUser()" color="success" floating size="sm">
								<MDBIcon icon="check" iconStyle="fas" /> </MDBBtn
							>&nbsp;
							<MDBBtn
								@click="
									(newUser = {
										user: null,
										password: null,
										user_function: null,
										adm: false,
									}),
										(isCreatingUser = false)
								"
								color="danger"
								floating
								size="sm"
							>
								<MDBIcon icon="times" iconStyle="fas" />
							</MDBBtn>
						</div>
					</MDBCardHeader>
					<MDBCardBody>
						<MDBCardText>
							<MDBListGroup>
								<MDBListGroupItem>
									<MDBRow>
										<MDBCol><i class="mdi mdi-card-text"></i> ID</MDBCol>
										<MDBCol
											><span style="color: #757575"
												>Será preenchido no cadastro</span
											></MDBCol
										>
										<MDBCol style="text-align: right" col="2">&nbsp;</MDBCol>
									</MDBRow>
								</MDBListGroupItem>
								<MDBListGroupItem>
									<MDBRow>
										<MDBCol><i class="mdi mdi-card-account-details"></i> Usuário</MDBCol>
										<MDBCol>
											<MDBInput v-model="newUser.user" />
										</MDBCol>
										<MDBCol style="text-align: right" col="2">&nbsp;</MDBCol>
									</MDBRow>
								</MDBListGroupItem>
								<MDBListGroupItem>
									<MDBRow>
										<MDBCol><i class="mdi mdi-key"></i> Senha</MDBCol>
										<MDBCol>
											<MDBInput v-model="newUser.password" />
										</MDBCol>
										<MDBCol style="text-align: right" col="2">&nbsp;</MDBCol>
									</MDBRow>
								</MDBListGroupItem>
								<MDBListGroupItem>
									<MDBRow>
										<MDBCol><i class="mdi mdi-account-tie"></i> Cargo</MDBCol>
										<MDBCol>
											<div class="form-outline">
												<select v-model="newUser.user_function" class="form-control">
													<option selected disabled>Escolha um</option>
													<option value="adm">Administrador</option>
													<option value="waiter">Garçom</option>
													<option value="kitchen">Cozinha</option>
													<option value="manager">Recepcionista / Gerente</option>
												</select>
												<div class="form-notch">
													<div class="form-notch-leading" style="width: 9px;"></div>
													<div class="form-notch-middle" style="width: 0px;"></div>
													<div class="form-notch-trailing"></div>
												</div>
											</div>
										</MDBCol>
										<MDBCol style="text-align: right" col="2">&nbsp;</MDBCol>
									</MDBRow>
								</MDBListGroupItem>
								<MDBListGroupItem>
									<MDBRow>
										<MDBCol><i class="mdi mdi-hat-fedora"></i> Administrador</MDBCol>
										<MDBCol>
											<MDBBtn
												v-if="newUser.adm"
												@click="newUser.adm = false"
												color="success"
												size="sm"
											>
												<MDBIcon iconStyle="fas" icon="check"></MDBIcon>
											</MDBBtn>
											<MDBBtn
												v-else
												@click="newUser.adm = true"
												color="danger"
												size="sm"
											>
												<MDBIcon iconStyle="fas" icon="times"></MDBIcon>
											</MDBBtn>
										</MDBCol>
										<MDBCol style="text-align: right" col="2">&nbsp;</MDBCol>
									</MDBRow>
								</MDBListGroupItem>
							</MDBListGroup>
						</MDBCardText>
					</MDBCardBody>
				</MDBCard>
			</MDBRow>
			<MDBRow
				class="border-bottom"
				style="margin-bottom: 50px !important;"
				v-for="(user, i) in users"
				:key="i"
			>
				<MDBCol>
					<MDBCard class="border">
						<MDBCardHeader
							style="display: flex; flex-direction: row; align-content: space-between;"
						>
							<MDBCardTitle style="margin-top: auto; margin-bottom: auto;">
								<div style="display: flex;">
									<span style="margin-left: 10px"
										><i class="mdi mdi-account"></i> {{ user.user }}</span
									>
								</div>
							</MDBCardTitle>
						</MDBCardHeader>
						<MDBCardBody>
							<MDBCardText>
								<MDBListGroup>
									<MDBListGroupItem>
										<MDBRow>
											<MDBCol><i class="mdi mdi-card-text"></i> ID</MDBCol>
											<MDBCol>{{ user._id }}</MDBCol>
											<MDBCol style="text-align: right" col="2">&nbsp;</MDBCol>
										</MDBRow>
									</MDBListGroupItem>
									<MDBListGroupItem>
										<MDBRow>
											<MDBCol
												><i class="mdi mdi-card-account-details"></i> Usuário</MDBCol
											>
											<MDBCol>
												<span v-if="!user.isModifyingUser">{{ user.user }}</span>
												<MDBInput v-else v-model="user.newUser" />
											</MDBCol>
											<MDBCol style="text-align: right" col="2">
												<MDBBtn
													v-if="user.newUser.length <= 0"
													@click="user.isModifyingUser = !user.isModifyingUser"
													:color="user.isModifyingUser ? 'danger' : 'warning'"
													floating
													size="sm"
												>
													<MDBIcon
														:icon="user.isModifyingUser ? 'times' : 'pencil-alt'"
														iconStyle="fas"
													/>
												</MDBBtn>
												<MDBBtn
													@click="updateUser(i)"
													v-else
													color="success"
													floating
													size="sm"
												>
													<MDBIcon icon="check" iconStyle="fas" />
												</MDBBtn>
											</MDBCol>
										</MDBRow>
									</MDBListGroupItem>
									<MDBListGroupItem>
										<MDBRow>
											<MDBCol><i class="mdi mdi-key"></i> Senha</MDBCol>
											<MDBCol>
												<span v-if="!user.isModifyingPassword">••••••••••</span>
												<MDBInput v-else v-model="user.newPasswd" />
											</MDBCol>
											<MDBCol style="text-align: right" col="2">
												<MDBBtn
													v-if="user.newPasswd.length <= 0"
													@click="
														user.isModifyingPassword = !user.isModifyingPassword
													"
													:color="user.isModifyingPassword ? 'danger' : 'warning'"
													floating
													size="sm"
												>
													<MDBIcon
														:icon="
															user.isModifyingPassword ? 'times' : 'pencil-alt'
														"
														iconStyle="fas"
													/>
												</MDBBtn>
												<MDBBtn
													@click="updateUser(i)"
													v-else
													color="success"
													floating
													size="sm"
												>
													<MDBIcon icon="check" iconStyle="fas" />
												</MDBBtn>
											</MDBCol>
										</MDBRow>
									</MDBListGroupItem>
									<MDBListGroupItem>
										<MDBRow>
											<MDBCol><i class="mdi mdi-account-tie"></i> Cargo</MDBCol>
											<MDBCol>
												<span v-if="!user.isModifyingFunction">{{
													translateUserFunction(user.function)
												}}</span>
												<div class="form-outline" v-else>
													<select v-model="user.newFunction" class="form-control">
														<option selected disabled>Escolha um</option>
														<option value="cancel">Cancelar</option>
														<option value="adm">Administrador</option>
														<option value="waiter">Garçom</option>
														<option value="kitchen">Cozinha</option>
														<option value="manager"
															>Recepcionista / Gerente</option
														>
													</select>
													<div class="form-notch">
														<div
															class="form-notch-leading"
															style="width: 9px;"
														></div>
														<div
															class="form-notch-middle"
															style="width: 0px;"
														></div>
														<div class="form-notch-trailing"></div>
													</div></div
											></MDBCol>
											<MDBCol style="text-align: right" col="2">
												<MDBBtn
													v-if="
														!(
															user.newFunction !== 'cancel' &&
															user.newFunction !== ''
														)
													"
													@click="
														user.isModifyingFunction = !user.isModifyingFunction
													"
													:color="user.isModifyingFunction ? 'danger' : 'warning'"
													floating
													size="sm"
												>
													<MDBIcon
														:icon="
															user.isModifyingFunction ? 'times' : 'pencil-alt'
														"
														iconStyle="fas"
													/>
												</MDBBtn>
												<MDBBtn
													@click="updateUser(i)"
													v-else
													color="success"
													floating
													size="sm"
												>
													<MDBIcon icon="check" iconStyle="fas" /> </MDBBtn
											></MDBCol>
										</MDBRow>
									</MDBListGroupItem>
									<MDBListGroupItem>
										<MDBRow>
											<MDBCol><i class="mdi mdi-hat-fedora"></i> Administrador</MDBCol>
											<MDBCol>{{ user.adm ? "Sim" : "Não" }}</MDBCol>
											<MDBCol style="text-align: right" col="2">
												<MDBBtn
													v-if="user.adm"
													@click="manageUserAdminRole(user, false)"
													color="danger"
													floating
													size="sm"
												>
													<MDBIcon icon="times" iconStyle="fas" />
												</MDBBtn>
												<MDBBtn
													v-else
													@click="manageUserAdminRole(user, true)"
													color="success"
													floating
													size="sm"
												>
													<MDBIcon icon="check" iconStyle="fas" />
												</MDBBtn>
											</MDBCol>
										</MDBRow>
									</MDBListGroupItem>
								</MDBListGroup>
							</MDBCardText>
						</MDBCardBody>
					</MDBCard>
				</MDBCol>
			</MDBRow>
		</MDBContainer>
	</MDBContainer>
</template>

<script>
import axios from "axios";
import {
	MDBContainer,
	MDBRow,
	MDBCol,
	MDBCard,
	MDBCardHeader,
	MDBCardBody,
	MDBCardTitle,
	MDBCardText,
	MDBBtn,
	MDBIcon,
	MDBListGroup,
	MDBListGroupItem,
	MDBInput,
} from "mdb-vue-ui-kit";
import { useToast } from "vue-toastification";

export default {
	components: {
		MDBContainer,
		MDBRow,
		MDBCol,
		MDBCard,
		MDBCardHeader,
		MDBCardBody,
		MDBCardTitle,
		MDBCardText,
		MDBBtn,
		MDBIcon,
		MDBListGroup,
		MDBListGroupItem,
		MDBInput,
	},
	setup() {
		const toast = useToast();
		return { toast };
	},
	data: () => {
		return {
			ws: null,
			isAdm: false,
			user: "",
			users: [],
			isLoaded: false,
			isCreatingUser: false,
			newUser: {
				user: null,
				password: null,
				user_function: null,
				adm: false,
			},
		};
	},
	async mounted() {
		const isAdmin = (await axios.get(`${localStorage.serverAddress}/user/getsession`)).data;
		if (!isAdmin) {
			this.$router.push("/dashboard");
		} else {
			this.ws = new WebSocket(`ws://${String(localStorage.serverAddress).split("://")[1]}`);
			this.ws.onmessage = async (event) => {
				switch (event.data) {
					case "users":
						await this.getUsers();
						break;
				}
			};
		}
		this.isAdm = isAdmin;
		if (this.isAdm) {
			if (localStorage.currentUser === "admin") {
				this.user = "Administrador";
			} else {
				this.user = localStorage.currentUser;
			}
			try {
				await this.getUsers();
				this.isLoaded = true;
			} catch (err) {
				console.log(err);
			}
		}
	},
	beforeUnmount() {
		if (this.ws) {
			this.ws.close();
		}
	},
	methods: {
		async getUsers() {
			let getUsers = (await axios.get(`${localStorage.serverAddress}/user/getall`)).data;
			let fixedUsers = [];
			getUsers.forEach((user) => {
				user.isModifyingUser = false;
				user.isModifyingPassword = false;
				user.isModifyingFunction = false;
				user.newPasswd = "";
				user.newUser = "";
				user.newFunction = "";
				fixedUsers.push(user);
			});
			this.users = fixedUsers;
		},
		async saveNewUser() {
			const addUser = await axios.post(`${localStorage.serverAddress}/user/add`, this.newUser);
			if (addUser.status == "200") {
				this.toast.success("Usuário Cadastrado!", {
					position: "top-right",
					timeout: 3500,
					closeOnClick: true,
					pauseOnFocusLoss: false,
					pauseOnHover: true,
					draggable: true,
					draggablePercent: 1,
					showCloseButtonOnHover: false,
					hideProgressBar: false,
					closeButton: "button",
					icon: true,
					rtl: false,
				});
				this.getUsers();
			} else {
				this.toast.error("Ocorreu um Erro!", {
					position: "top-right",
					timeout: 3500,
					closeOnClick: true,
					pauseOnFocusLoss: false,
					pauseOnHover: true,
					draggable: true,
					draggablePercent: 1,
					showCloseButtonOnHover: false,
					hideProgressBar: false,
					closeButton: "button",
					icon: true,
					rtl: false,
				});
			}
		},
		async updateUser(userIndex) {
			if (this.users[userIndex].newUser.length > 0) {
				this.users[userIndex].user = this.users[userIndex].newUser;
			}
			if (
				this.users[userIndex].newFunction !== "cancel" &&
				this.users[userIndex].newFunction.length > 0
			) {
				this.users[userIndex].function = this.users[userIndex].newFunction;
			}
			const updatedUser = await axios.post(
				`${localStorage.serverAddress}/user/update`,
				this.users[userIndex]
			);
			if (updatedUser.status == "200") {
				this.getUsers();
				this.toast.success("Modificação Salva!", {
					position: "top-right",
					timeout: 3500,
					closeOnClick: true,
					pauseOnFocusLoss: false,
					pauseOnHover: true,
					draggable: true,
					draggablePercent: 1,
					showCloseButtonOnHover: false,
					hideProgressBar: false,
					closeButton: "button",
					icon: true,
					rtl: false,
				});
			} else {
				this.toast.error("Ocorreu um Erro!", {
					position: "top-right",
					timeout: 3500,
					closeOnClick: true,
					pauseOnFocusLoss: false,
					pauseOnHover: true,
					draggable: true,
					draggablePercent: 1,
					showCloseButtonOnHover: false,
					hideProgressBar: false,
					closeButton: "button",
					icon: true,
					rtl: false,
				});
			}
		},
		translateUserFunction(userFunction) {
			switch (userFunction) {
				case "adm":
					return "Administrador";
				case "waiter":
					return "Garçom";
				case "kitchen":
					return "Cozinha";
				case "manager":
					return "Recepcionista / Gerente	";
			}
		},
		manageUserAdminRole(user, value) {
			const question = confirm(
				value
					? "Deseja remover a permissão de Administrador?"
					: "Deseja adicionar a permissão de Administrador?"
			);
			if (question) {
				user.adm = value;
			}
		},
	},
};
</script>

<style></style>
