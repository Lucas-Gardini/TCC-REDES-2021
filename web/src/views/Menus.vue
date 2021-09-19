<template>
	<div>
		<searcher :isMobile="isMobile" />

		<v-dialog transition="dialog-bottom-transition" max-width="600">
			<template v-slot:activator="{ on, attrs }">
				<v-btn
					v-bind="attrs"
					v-on="on"
					elevation="2"
					icon
					style="position: absolute; bottom: 3%; right: 3%"
				>
					<v-icon style="color: #00b74a">mdi-plus</v-icon>
				</v-btn>
			</template>
			<template v-slot:default="dialog">
				<v-card>
					<v-toolbar color="#00b74a" dark>Gerenciar Cardápios</v-toolbar>
					<v-card-text>
						<div>
							<v-card-title>Seus Cardápios</v-card-title>
							<v-btn v-if="!addingMenu" @click="addingMenu = !addingMenu"
								><v-icon left>mdi-open-in-new</v-icon> Novo</v-btn
							>
							<!-- STEPPER -->
							<transition
								enter-active-class="animate__animated animate__fadeInDown"
								leave-active-class="animate__animated animate__fadeOutUp"
							>
								<v-stepper v-if="addingMenu" v-model="stepper" vertical>
									<v-stepper-step :complete="stepper > 1" step="1">
										Nome do Restaurante
										<small>Deve ser único</small>
									</v-stepper-step>

									<v-stepper-content step="1">
										<v-text-field label="" v-model="restaurant"></v-text-field>
										<v-btn color="#00b74a" dark @click="stepper = 2"> Continuar </v-btn>
										<v-btn text @click="addingMenu = !addingMenu"> Cancelar </v-btn>
									</v-stepper-content>

									<v-stepper-step :complete="stepper > 2" step="2">
										Produtos
									</v-stepper-step>

									<v-stepper-content step="2">
										<v-text-field label="" v-model="products"></v-text-field>
										<v-btn color="#00b74a" dark @click="newMenu"> Continuar </v-btn>
										<v-btn text @click="stepper = 1"> Cancelar </v-btn>
									</v-stepper-content>
								</v-stepper>
							</transition>
						</div>
					</v-card-text>
					<v-card-actions class="justify-end">
						<v-btn text @click="dialog.value = false">Fechar</v-btn>
					</v-card-actions>
				</v-card>
			</template>
		</v-dialog>
	</div>
</template>

<script>
import Searcher from "../components/Menus/Searcher.vue";
import firebase from "../firebase.js";
import { collection, addDoc } from "firebase/firestore";
export default {
	components: { Searcher },
	props: {
		isMobile: {
			type: Boolean,
			default: false,
			required: false,
		},
	},
	data() {
		return {
			restaurant: "",
			products: [],
			addingMenu: false,
			stepper: 1,
		};
	},
	methods: {
		async newMenu() {
			try {
				const docRef = await addDoc(collection(firebase.db, "menus"), {
					restaurant: this.restaurant,
					products: this.products,
				});
				console.log(docRef);
			} catch (error) {
				console.error("Error adding document: ", error);
			}
		},
	},
};
</script>

<style></style>
