<template>
	<MDBContainer>
		<MDBContainer>
			<h1 style="margin-top: 20px">
				Produtos
			</h1>
		</MDBContainer>
		<MDBRow class="d-flex">
			<MDBCol md="6">
				<MDBCard text="center">
					<MDBCardHeader>Notificações</MDBCardHeader>
					<MDBCardBody>
						<MDBCardTitle>Receber notificações?</MDBCardTitle>
						<div style="display: flex">
							<div style="margin: auto">
								<MDBSwitch
									@click="saveConfigs()"
									v-model="notification"
								></MDBSwitch>
							</div>
						</div>
					</MDBCardBody>
				</MDBCard>
			</MDBCol>
		</MDBRow>
		<MDBRow>
			<MDBCol>
				<MDBCard text="center">
					<MDBCardHeader>Endereço da Api</MDBCardHeader>
					<MDBCardBody>
						<MDBRow>
							<MDBCol col="7">
								<MDBInput
									v-model="serverIp"
									label="Endereço Ip"
									maxlength="15"
									type="text"
								/>
							</MDBCol>
							<MDBCol col="3">
								<MDBInput
									v-model="serverPort"
									label="Porta"
									maxlength="15"
									type="text"
								/>
							</MDBCol>
							<MDBCol col="auto">
								<MDBBtn @click="saveConfigs()" color="success" floating>
									<MDBIcon icon="save" iconStyle="fas" />
								</MDBBtn>
							</MDBCol>
						</MDBRow>
					</MDBCardBody>
				</MDBCard>
			</MDBCol>
		</MDBRow>
	</MDBContainer>
</template>

<script>
import {
	MDBContainer,
	MDBRow,
	MDBCol,
	MDBCard,
	MDBCardHeader,
	MDBCardBody,
	MDBCardTitle,
	MDBSwitch,
	MDBInput,
	MDBBtn,
	MDBIcon,
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
		MDBSwitch,
		MDBInput,
		MDBBtn,
		MDBIcon,
	},
	mounted() {
		this.notification = Boolean(localStorage.notification);
		if (localStorage.serverAddress) {
			this.serverIp = String(String(localStorage.serverAddress).split("//")[1]).split(":")[0];
			this.serverPort = String(String(localStorage.serverAddress).split("//")[1]).split(
				":"
			)[1];
		}
	},
	data: () => {
		return {
			notification: false,
			// Pegando Ip
			serverIp: "",
			serverPort: "",
		};
	},
	methods: {
		saveConfigs() {
			if (localStorage.currentUser === "null") {
				this.$router.push("/");
			}
			localStorage.serverAddress = `http://${this.serverIp}:${this.serverPort}`;
			localStorage.notification = !this.notification;
		},
	},
};
</script>

<style scoped>
.row {
	margin-bottom: 10px !important;
}
</style>
