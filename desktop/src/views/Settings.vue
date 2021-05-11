<template>
	<MDBContainer>Área de Configurações </MDBContainer>
</template>

<script>
import { MDBContainer } from "mdb-vue-ui-kit";
export default {
	components: {
		MDBContainer,
	},
	data: () => {
		return {
			notification: localStorage.notifications || false,
		};
	},
};
</script>

<style></style>
