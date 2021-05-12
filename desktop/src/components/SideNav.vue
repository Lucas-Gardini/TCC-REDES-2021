<template>
	<div v-if="isLoggedIn" id="sidenav" class="sidenav">
		<div
			id="userPicture"
			style="text-align: center; font-size: xx-large; color: white;display: grid"
		>
			<i v-if="isMan" class="mdi mdi-face"></i>
			<i v-else-if="isAdm" class="mdi mdi-account-cowboy-hat"></i>
			<i v-else class="mdi mdi-face-woman"></i>
			<!-- {{ user }} -->
		</div>
		<hr />

		<a :class="isAtHome" href="javascript:void(0)" @click="redirect('/dashboard')"
			><i class="mdi mdi-home"></i
		></a>
		<a :class="isAtSettings" href="javascript:void(0)" @click="redirect('/dashboard/settings')"
			><i class="mdi mdi-tune"></i
		></a>
		<a href="javascript:void(0)" @click="loggout()"><i class="mdi mdi-exit-to-app"></i></a>
		<a
			style="position: absolute; bottom: 0%; left: 0%"
			href="javascript:void(0)"
			@click="changeColorMode()"
			><i :class="colorModeClass"></i
		></a>
		<MDBModal
			id="loggingout"
			tabindex="-1"
			labelledby="loggingout"
			v-model="isLoggingOut"
			centered
		>
			<MDBModalHeader>
				<MDBModalTitle id="exampleModalCenterTitle"> Deseja mesmo sair? </MDBModalTitle>
			</MDBModalHeader>
			<MDBModalFooter>
				<MDBBtn color="danger" @click="isLoggingOut = !isLoggingOut"> Não </MDBBtn>
				<MDBBtn color="success" @click="loggout(true)"> Sim </MDBBtn>
			</MDBModalFooter>
		</MDBModal>
		<MDBModal
			id="loggingout"
			tabindex="-1"
			labelledby="loggingout"
			v-model="loggedOutError"
			centered
		>
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
import detectGender from "detect-gender";
import { MDBModal, MDBModalHeader, MDBModalTitle, MDBModalFooter, MDBBtn } from "mdb-vue-ui-kit";
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
			colorMode: localStorage.colorMode || "light",
			colorModeClass: localStorage.colorModeIcon || "mdi mdi-weather-night",
		};
	},
	components: {
		MDBModal,
		MDBModalHeader,
		MDBModalTitle,
		MDBModalFooter,
		MDBBtn,
	},
	async mounted() {
		if (localStorage.currentUser !== null || typeof localStorage.currentUser !== "undefined") {
			this.user = localStorage.currentUser;
			if (localStorage.currentUser !== "admin") {
				const GENDER = await detectGender(this.user);
				if (GENDER === "male") {
					this.isMan = true;
				} else {
					this.isMan = false;
				}
			} else {
				this.isAdm = true;
			}
		}
		this.changeActualColors();
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

				case "/dashboard/settings":
					this.isAtSettings = "active";
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
		},
		changeColorMode() {
			this.colorMode === "light"
				? ((this.colorMode = "dark"), (this.colorModeClass = "mdi mdi-weather-night"))
				: ((this.colorMode = "light"), (this.colorModeClass = "mdi mdi-weather-sunny"));
			localStorage.colorMode = this.colorMode;
			localStorage.colorModeClass = this.colorModeClass;
			this.changeActualColors();
		},
		changeActualColors() {
			setTimeout(() => {
				try {
					const NAVBAR = document.querySelector("#sidenav");
					document.querySelector("body").style =
						this.colorMode === "light"
							? "background-color: #121212 !important; color: aliceblue;"
							: "background-color: white !important; color: black;";
					NAVBAR.style =
						this.colorMode === "light"
							? "background-color: aliceblue !important; color: aliceblue"
							: "background-color: #121212 !important; color: black !important";
					NAVBAR.querySelector("#userPicture").style =
						this.colorMode === "light"
							? "text-align: center; font-size: xx-large; color: black;display: grid"
							: "text-align: center; font-size: xx-large; color: aliceblue;display: grid";
					const NAVBAR_A = NAVBAR.querySelectorAll("a");
					for (let a of NAVBAR_A) {
						if (String(a.style.cssText).indexOf("absolute") === 10) {
							a.style =
								this.colorMode === "light"
									? "position: absolute; bottom: 0%; left: 0%; color: black"
									: "position: absolute; bottom: 0%; left: 0%; color: aliceblue";
						} else {
							a.style =
								this.colorMode === "light"
									? "text-align: center; color: black;"
									: "text-align: center; color: aliceblue;";
						}
					}
				} catch (e) {
					console.log("slk");
				}
			}, 100);
			// document.querySelector(".ToolBar").style =
			// 	this.colorMode === "light"
			// 		? "background-color: white !important; color: black;"
			// 		: "background-color: #121212 !important; color: aliceblue;";
		},
		async loggout(isLoggingOut = false) {
			if (isLoggingOut) {
				localStorage.currentUser = null;
				localStorage.user = null;
				try {
					const logoff = await axios.post("http://localhost:8080/user/logoff");
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
	overflow-x: hidden; /* Disable horizontal scroll */
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
