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
					<MDBCardHeader
						style="display: flex; flex-direction: row; align-content: space-between;"
					>
						<MDBCardTitle style="margin-top: auto; margin-bottom: auto;">
							<div style="display: flex;">
								<span style="margin-left: 10px"
									><i class="mdi mdi-account-multiple-plus"></i> Novo
									Usuário</span
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
										<MDBCol
											><i class="mdi mdi-card-account-details"></i>
											Usuário</MDBCol
										>
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
												<select
													v-model="newUser.user_function"
													class="form-control"
												>
													<option selected disabled>Escolha um</option>
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
												</div>
											</div>
										</MDBCol>
										<MDBCol style="text-align: right" col="2">&nbsp;</MDBCol>
									</MDBRow>
								</MDBListGroupItem>
								<MDBListGroupItem>
									<MDBRow>
										<MDBCol
											><i class="mdi mdi-hat-fedora"></i>
											Administrador</MDBCol
										>
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
											<MDBCol style="text-align: right" col="2"
												>&nbsp;</MDBCol
											>
										</MDBRow>
									</MDBListGroupItem>
									<MDBListGroupItem>
										<MDBRow>
											<MDBCol
												><i class="mdi mdi-card-account-details"></i>
												Usuário</MDBCol
											>
											<MDBCol>{{ user.user }}</MDBCol>
											<MDBCol style="text-align: right" col="2"
												><MDBBtn color="warning" floating size="sm">
													<MDBIcon
														icon="pencil-alt"
														iconStyle="fas"
													/> </MDBBtn
											></MDBCol>
										</MDBRow>
									</MDBListGroupItem>
									<MDBListGroupItem>
										<MDBRow>
											<MDBCol><i class="mdi mdi-key"></i> Senha</MDBCol>
											<MDBCol>••••••••••</MDBCol>
											<MDBCol style="text-align: right" col="2"
												><MDBBtn color="warning" floating size="sm">
													<MDBIcon
														icon="pencil-alt"
														iconStyle="fas"
													/> </MDBBtn
											></MDBCol>
										</MDBRow>
									</MDBListGroupItem>
									<MDBListGroupItem>
										<MDBRow>
											<MDBCol
												><i class="mdi mdi-account-tie"></i> Cargo</MDBCol
											>
											<MDBCol>{{
												translateUserFunction(user.function)
											}}</MDBCol>
											<MDBCol style="text-align: right" col="2"
												><MDBBtn color="warning" floating size="sm">
													<MDBIcon
														icon="pencil-alt"
														iconStyle="fas"
													/> </MDBBtn
											></MDBCol>
										</MDBRow>
									</MDBListGroupItem>
									<MDBListGroupItem>
										<MDBRow>
											<MDBCol
												><i class="mdi mdi-hat-fedora"></i>
												Administrador</MDBCol
											>
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
			this.users = (await axios.get(`${localStorage.serverAddress}/user/getall`)).data;
		},
		async saveNewUser() {
			const addUser = await axios.post(
				`${localStorage.serverAddress}/user/add`,
				this.newUser
			);
			if (addUser.status === "200") {
				console.log("ok");
			} else {
				console.log("Error");
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
