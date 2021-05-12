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
			<MDBCol>
				<MDBCard text="center">
					<MDBCardHeader>TEMPLATE</MDBCardHeader>
					<MDBCardBody>
						<MDBCardTitle>template</MDBCardTitle>
						<div style="display: flex">
							<div style="margin: auto"></div>
						</div>
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
	},
	mounted() {
		localStorage.notification = this.notification;
	},
	data: () => {
		return {
			notification: localStorage.notifications || true,
		};
	},
	methods: {
		saveConfigs() {
			localStorage.notification = !this.notification;
		},
	},
};
</script>

<style></style>
