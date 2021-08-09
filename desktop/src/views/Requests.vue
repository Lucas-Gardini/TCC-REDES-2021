<template>
	<MDBContainer :class="show_hide">
		<h1 style="margin-top: 20px">
			Pedidos
		</h1>
	</MDBContainer>
</template>

<script>
import { MDBContainer } from "mdb-vue-ui-kit";

export default {
	components: {
		MDBContainer,
	},
	data: () => {
		return {
			ws: new WebSocket(`ws://${String(localStorage.serverAddress).split("://")[1]}`),
			show_hide: "show",
		};
	},
	created() {
		this.ws.onmessage = async (event) => {
			switch (event.data) {
				case "requests":
					console.log("ass");
					break;
			}
		};
	},
	async mounted() {},
	beforeUnmount() {
		this.ws.close();
	},
	methods: {},
	watch: {},
};
</script>

<style></style>
