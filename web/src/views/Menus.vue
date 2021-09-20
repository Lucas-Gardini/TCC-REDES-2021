<template>
	<div>
		<v-tabs background-color="accent-4" color="#00B74A" grow>
			<v-tab @click="page = 1">Cardápios</v-tab>
			<v-tab v-if="user.info" @click="page = 2">Meus Cardápios</v-tab>
		</v-tabs>
		<v-divider />
		<div style="margin-left: 5%; margin-right: 5%">
			<transition
				:duration="{ enter: 500, leave: 100 }"
				enter-active-class="animate__animated animate__fadeIn"
				leave-active-class="animate__animated animate__fadeOut"
			>
				<div v-if="page === 1">
					<searcher :isMobile="isMobile" />
				</div>
				<div v-else-if="page === 2">
					<transition
						enter-active-class="animate__animated animate__fadeIn"
						leave-active-class="animate__animated animate__fadeOut"
					>
						<new-menu
							v-if="isAddingNewMenu"
							@cancel="isAddingNewMenu = false"
							@newMenu="
								(menu) => {
									newMenu(menu);
								}
							"
						/>
					</transition>
					<v-btn
						v-if="!isAddingNewMenu"
						@click="isAddingNewMenu = !isAddingNewMenu"
						color="#fff"
						class="ma-2 black--text"
					>
						<v-icon>mdi-plus</v-icon>
						Novo Cardápio
					</v-btn>
				</div>
			</transition>
		</div>
	</div>
</template>

<script>
import Searcher from "../components/Menus/Searcher.vue";
import firebase from "../firebase.js";
import { collection, addDoc } from "firebase/firestore";
import NewMenu from "../components/Menus/NewMenu.vue";
export default {
	components: { Searcher, NewMenu },
	props: {
		user: {
			type: Object,
			required: true,
		},
		isMobile: {
			type: Boolean,
			default: false,
			required: false,
		},
	},
	data() {
		return {
			page: 1,
			isAddingNewMenu: false,
		};
	},
	methods: {
		async newMenu(menu) {
			try {
				const docRef = await addDoc(collection(firebase.db, "menus"), {
					restaurant: menu.restaurant,
					products: menu.products,
					uid: this.user.info.uid,
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
