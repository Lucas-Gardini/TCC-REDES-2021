<template>
	<MDBContainer>
		<MDBContainer>
			<h1 style="margin-top: 20px">
				Configurações
			</h1>
		</MDBContainer>
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

		<MDBModal tabindex="-1" v-model="isServerNotConfigurated">
			<MDBModalHeader>
				<MDBModalTitle> Servidor Não Configurado! </MDBModalTitle>
			</MDBModalHeader>
			<MDBModalBody>Preencha os campos de configuração abaixo para prosseguir!</MDBModalBody>
			<MDBModalFooter>
				<MDBBtn color="success" @click="isServerNotConfigurated = false">Entendi</MDBBtn>
			</MDBModalFooter>
		</MDBModal>
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
	MDBInput,
	MDBBtn,
	MDBIcon,
	MDBModal,
	MDBModalHeader,
	MDBModalTitle,
	MDBModalBody,
	MDBModalFooter,
} from "mdb-vue-ui-kit";
export default {
	components: {
		MDBContainer,
		MDBRow,
		MDBCol,
		MDBCard,
		MDBCardHeader,
		MDBCardBody,
		MDBInput,
		MDBBtn,
		MDBIcon,
		MDBModal,
		MDBModalHeader,
		MDBModalTitle,
		MDBModalBody,
		MDBModalFooter,
	},
	mounted() {
		this.notification = Boolean(localStorage.notification);
		if (localStorage.serverAddress) {
			this.serverIp = String(String(localStorage.serverAddress).split("//")[1]).split(":")[0];
			this.serverPort = String(String(localStorage.serverAddress).split("//")[1]).split(
				":"
			)[1];
		} else {
			this.isServerNotConfigurated = true;
		}
	},
	data: () => {
		return {
			notification: false,
			// Pegando Ip
			serverIp: "",
			serverPort: "",
			isServerNotConfigurated: false,
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
