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
					<div v-for="(menu, index) in menus" :key="index">
						<new-menu
							v-if="menu.editing"
							:menu="menu"
							@cancel="menu.editing = !menu.editing"
							@updateMenu="
								(menu) => {
									updateMenu(menu);
								}
							"
						/>
						<v-card v-else>
							<v-card-title>{{ menu.data.restaurant }}</v-card-title>
							<v-divider />
							<v-card-subtitle>Produtos</v-card-subtitle>
							<v-list>
								<v-list-item v-for="(product, index) in menu.data.products" :key="index">
									<v-card-actions>
										<v-card-text>{{ product.productName }}</v-card-text>
										<v-divider />
										<v-card-text>{{ product.price }}</v-card-text>
									</v-card-actions>
									<v-list>
										<v-list-item
											v-for="(ingredient, index) in product.ingredients"
											:key="index"
										>
											{{ ingredient.ingredientName }}
										</v-list-item>
									</v-list>
								</v-list-item>
							</v-list>
							<v-footer>
								<v-spacer />
								<v-btn color="#00B74A" dark @click="menu.editing = !menu.editing">
									<v-icon left>mdi-pencil</v-icon> Editar
								</v-btn>
							</v-footer>
						</v-card>
					</div>
				</div>
			</transition>
		</div>
	</div>
</template>

<script>
import Searcher from "../components/Menus/Searcher.vue";
import NewMenu from "../components/Menus/NewMenu.vue";
import firebase from "../firebase.js";
import { collection, addDoc, getDocs, doc, query, where, updateDoc, onSnapshot } from "firebase/firestore";
import Swal from "sweetalert2";
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
	watch: {
		user() {
			this.getUserMenus();
		},
	},
	mounted() {
		this.unsub = onSnapshot(doc(collection(firebase.db, "menus")), () => {
			this.getUserMenus();
		});
		this.getUserMenus();
	},
	beforeDestroy() {
		this.unsub();
	},
	data() {
		return {
			page: 1,
			isAddingNewMenu: false,
			menus: [],
			unsub: null,
		};
	},
	methods: {
		async newMenu(menu) {
			this.isAddingNewMenu = false;
			try {
				await addDoc(collection(firebase.db, "menus"), {
					restaurant: menu.restaurant,
					location: menu.location,
					products: menu.products,
					uid: this.user.info.uid,
				});
				Swal.fire({
					title: "Sucesso!",
					text: "Seu cardápio foi salvo/atualizado!",
					icon: "success",
					confirmButtonText: "OK",
				});
			} catch (error) {
				console.error("Error adding document: ", error);
			}
		},
		async updateMenu(menu) {
			this.isAddingNewMenu = false;
			try {
				const docRef = doc(collection(firebase.db, "menus"), menu.id);
				await updateDoc(docRef, {
					restaurant: menu.restaurant,
					location: menu.location,
					products: menu.products,
				});
				Swal.fire({
					title: "Sucesso!",
					text: "Seu cardápio foi salvo/atualizado!",
					icon: "success",
					confirmButtonText: "OK",
				});
			} catch (error) {
				console.log("Error updating document: ", error);
			}
		},
		async getUserMenus() {
			if (this.user.info) {
				try {
					const q = query(collection(firebase.db, "menus"), where("uid", "==", this.user.info.uid));
					const querySnapshot = await getDocs(q);
					this.menus = querySnapshot.docs.map((doc) => {
						return { data: doc.data(), id: doc.id, editing: false };
					});
				} catch (error) {
					console.error("Error getting document: ", error);
				}
			}
		},
	},
};
</script>

<style></style>
