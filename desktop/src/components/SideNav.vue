<template>
	<div v-if="isLoggedIn" id="sidenav" class="sidenav">
		<div
			id="userPicture"
			style="text-align: center; color: white;display: grid; place-items: center; margin-top: 20px"
		>
			<img src="../assets/icon-variant-no-name.png" style="width: 80%" />
		</div>
		<hr />
		<MDBTooltip arrow v-model="homeTooltip" direction="right">
			<template #reference>
				<a :class="isAtHome" href="javascript:void(0)" @click="redirect('/dashboard')"
					><i class="mdi mdi-home"></i
				></a>
			</template>
			<template #tip>
				Início
			</template> </MDBTooltip
		><br />
		<MDBTooltip arrow v-model="requestsTooltip" direction="right">
			<template #reference>
				<a :class="isAtRequests" href="javascript:void(0)" @click="redirect('/dashboard/requests')"
					><i class="mdi mdi-cash-register"></i
				></a>
			</template>
			<template #tip>
				Pedidos
			</template> </MDBTooltip
		><br />
		<MDBTooltip arrow v-model="productsTooltip" direction="right">
			<template #reference>
				<a :class="isAtProducts" href="javascript:void(0)" @click="redirect('/dashboard/products')"
					><i class="mdi mdi-food"></i
				></a>
			</template>
			<template #tip>
				Produtos
			</template> </MDBTooltip
		><br />
		<MDBTooltip arrow v-model="tablesTooltip" direction="right">
			<template #reference>
				<a :class="isAtTables" href="javascript:void(0)" @click="redirect('/dashboard/tables')"
					><i class="mdi mdi-table-furniture"></i
				></a>
			</template>
			<template #tip>
				Mesas
			</template> </MDBTooltip
		><br />
		<MDBTooltip arrow v-model="usersTooltip" direction="right">
			<template #reference>
				<a :class="isAtUsers" href="javascript:void(0)" @click="redirect('/dashboard/users')"
					><i class="mdi mdi-account-cog"></i
				></a>
			</template>
			<template #tip>
				Usuários
			</template> </MDBTooltip
		><br />
		<MDBTooltip arrow v-model="settingsTooltip" direction="right">
			<template #reference>
				<a :class="isAtSettings" href="javascript:void(0)" @click="redirect('/dashboard/settings')"
					><i class="mdi mdi-tune"></i
				></a>
			</template>
			<template #tip>
				Configurações
			</template> </MDBTooltip
		><br />
		<MDBTooltip arrow v-model="logoutTooltip" direction="right">
			<template #reference>
				<a href="javascript:void(0)" @click="loggout()"><i class="mdi mdi-exit-to-app"></i></a>
			</template>
			<template #tip>
				Sair
			</template>
		</MDBTooltip>
		<MDBModal id="loggingout" tabindex="-1" labelledby="loggingout" v-model="isLoggingOut" centered>
			<MDBModalHeader>
				<MDBModalTitle id="exampleModalCenterTitle"> Deseja mesmo sair? </MDBModalTitle>
			</MDBModalHeader>
			<MDBModalFooter>
				<MDBBtn color="danger" @click="isLoggingOut = !isLoggingOut"> Não </MDBBtn>
				<MDBBtn color="success" @click="loggout(true)"> Sim </MDBBtn>
			</MDBModalFooter>
		</MDBModal>
		<MDBModal id="loggingout" tabindex="-1" labelledby="loggingout" v-model="loggedOutError" centered>
			<MDBModalHeader>
				<MDBModalTitle color="danger" id="exampleModalCenterTitle">
					ERRO AO ENCERRAR SESSÂO! VERIFIQUE A CONEXÃO COM O SERVIDOR
				</MDBModalTitle>
			</MDBModalHeader>
			<MDBModalFooter>
				<MDBBtn color="danger" @click="loggedOutError = !loggedOutError"> Entendi </MDBBtn>
			</MDBModalFooter>
		</MDBModal>
	</div>
</template>

<script>
import { MDBModal, MDBModalHeader, MDBModalTitle, MDBModalFooter, MDBBtn, MDBTooltip } from "mdb-vue-ui-kit";
import { ref } from "vue";
import axios from "axios";

export default {
	data: () => {
		return {
			isLoggedIn: false,
			isLoggingOut: false,
			loggedOutError: false,
			isMan: false,
			isAdm: false,
			user: null,
			isAtHome: "",
			isAtSettings: "",
			isAtTables: "",
			isAtRequests: "",
			isAtProducts: "",
			isAtUsers: "",
			// colorMode: localStorage.colorMode || "light",
			// colorModeClass: localStorage.colorModeIcon || "mdi mdi-weather-night",
		};
	},
	components: {
		MDBModal,
		MDBModalHeader,
		MDBModalTitle,
		MDBModalFooter,
		MDBBtn,
		MDBTooltip,
	},
	setup() {
		const homeTooltip = ref(false);
		const settingsTooltip = ref(false);
		const tablesTooltip = ref(false);
		const usersTooltip = ref(false);
		const requestsTooltip = ref(false);
		const productsTooltip = ref(false);
		const logoutTooltip = ref(false);

		return {
			homeTooltip,
			settingsTooltip,
			tablesTooltip,
			usersTooltip,
			requestsTooltip,
			productsTooltip,
			logoutTooltip,
		};
	},
	async mounted() {
		if (localStorage.currentUser !== null || typeof localStorage.currentUser !== "undefined") {
			this.user = localStorage.currentUser;
			if (localStorage.currentUser !== "admin") {
				this.isMan = true;
			} else {
				this.isAdm = true;
			}
			if (localStorage.currentUser === "admin") {
				this.isAdm = true;
			}
		}
		// this.changeActualColors();
	},

	watch: {
		$route(path) {
			if (path.path === "/") {
				this.isLoggedIn = false;
				document.getElementById("app").style = `
					transition: margin-left 0.5s;
					padding: 20px;
					margin-left: 0px;`;
				document.querySelector("html").style = `overflow: hidden`;
			} else if (localStorage.currentUser === "null") {
				this.isLoggedIn = false;
				document.getElementById("app").style = `
					transition: margin-left 0.5s;
					padding: 20px;
					margin-left: 0px;`;
				document.querySelector("html").style = `overflow: hidden`;
			} else {
				this.isLoggedIn = true;
				document.getElementById("app").style = `
					transition: margin-left 0.5s;
					padding: 20px;
					padding-top: 25px;
					margin-left: 50px;`;
				document.querySelector("html").style = `overflow: auto`;
			}

			this.resetIsAtVariables();
			switch (path.path) {
				case "/dashboard":
					this.isAtHome = "active";
					break;

				case "/dashboard/requests":
					this.isAtRequests = "active";
					break;

				case "/dashboard/products":
					this.isAtProducts = "active";
					break;

				case "/dashboard/settings":
					this.isAtSettings = "active";
					break;

				case "/dashboard/tables":
					this.isAtTables = "active";
					break;

				case "/dashboard/users":
					this.isAtUsers = "active";
					break;

				default:
					// console.log(path);
					break;
			}
		},
	},
	methods: {
		redirect(path) {
			this.$router.push(path);
		},
		resetIsAtVariables() {
			this.isAtHome = "";
			this.isAtSettings = "";
			this.isAtTables = "";
			this.isAtRequests = "";
			this.isAtProducts = "";
			this.isAtUsers = "";
		},
		async loggout(isLoggingOut = false) {
			if (isLoggingOut) {
				localStorage.currentUser = "";
				localStorage.currentPasswd = "";
				localStorage.user = "";
				localStorage.rememberUser = false;
				localStorage.setItem("rememberUser", false);
				try {
					const logoff = await axios.post(`${localStorage.serverAddress}/user/logoff`);
					if (logoff.data.success === true) {
						this.$router.push("/");
					} else {
						this.loggedOutError = true;
					}
				} catch (e) {
					console.log(e);
				}
			} else {
				this.isLoggingOut = !this.isLoggingOut;
			}
		},
	},
};
</script>

<style>
/* The side navigation menu */
.sidenav {
	height: 100%; /* 100% Full-height */
	width: 50px; /* 0 width - change this with JavaScript */
	position: fixed; /* Stay in place */
	z-index: 1; /* Stay on top */
	top: 0; /* Stay at the top */
	left: 0;
	background-color: #121212; /* Black*/
	overflow-x: visible; /* Disable horizontal scroll */
	padding-top: 30px;
	transition: 0.5s; /* 0.5 second transition effect to slide in the sidenav */
	text-align: center;
}

/* The navigation menu links */
.sidenav a {
	text-decoration: none;
	font-size: 25px;
	color: #818181;
	transition: 0.3s;
	width: 100%;
	display: block;
}

.sidenav a.active {
	color: #00b74a !important;
}

.sidenav a.active:hover {
	color: #01a542 !important;
}

/* When you mouse over the navigation links, change their color */
.sidenav a:hover {
	color: #f1f1f1;
}

/* Position and style the close button (top right corner) */
.sidenav .closebtn {
	position: absolute;
	top: 0;
	right: 25px;
	font-size: 36px;
	margin-left: 50px;
}

/* On smaller screens, where height is less than 450px, change the style of the sidenav (less padding and a smaller font size) */
@media screen and (max-height: 450px) {
	.sidenav {
		padding-top: 15px;
	}
	.sidenav a {
		font-size: 18px;
	}
}
</style>
