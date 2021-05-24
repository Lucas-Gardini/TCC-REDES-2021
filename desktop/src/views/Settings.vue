<template>
	<MDBContainer>
		<h1>Configurações</h1>
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
			<MDBCol>
				<MDBCard text="center">
					<MDBCardHeader>Endereço do Websocket</MDBCardHeader>
					<MDBCardBody>
						<MDBRow>
							<MDBCol col="10">
								<MDBInput
									v-model="websocketPort"
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
		console.log(this.notification);
		this.notification = Boolean(localStorage.notification);
		if (localStorage.serverAddress) {
			this.serverIp = String(String(localStorage.serverAddress).split("//")[1]).split(":")[0];
			this.serverPort = String(String(localStorage.serverAddress).split("//")[1]).split(
				":"
			)[1];
			this.websocketPort = localStorage.websocketPort;
		}
	},
	data: () => {
		return {
			notification: false,
			// Pegando Ip
			serverIp: "",
			serverPort: "",
			websocketPort: "",
		};
	},
	methods: {
		saveConfigs() {
			localStorage.serverAddress = `http://${this.serverIp}:${this.serverPort}`;
			localStorage.websocketPort = this.websocketPort;
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
