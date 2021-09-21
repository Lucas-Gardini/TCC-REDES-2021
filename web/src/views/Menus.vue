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
					<searcher :isMobile="isMobile" @setFilter="filter" />
					<v-list>
						<v-list-item v-for="(menu, index) in allMenus" :key="index">
							<v-card width="100%">
								<v-card-title>
									<v-row>
										<v-col cols="1">
											<v-avatar>
												<img
													:src="
														menu.image
															? menu.image
															: `https://ui-avatars.com/api/?name=${menu.data.restaurant}`
													"
													alt="John"
													size="128"
												/>
											</v-avatar>
										</v-col>
										<v-col cols="11">
											{{ menu.data.restaurant }}
											<v-card-subtitle
												style="margin-left: 0 !important; padding-left: 0 !important"
											>
												{{
													menu.data.location.state +
													" - " +
													menu.data.location.city +
													" - " +
													menu.data.location.district +
													" - " +
													menu.data.location.street
												}}
											</v-card-subtitle>
										</v-col>
									</v-row>
								</v-card-title>
								<v-card-actions>
									<v-spacer></v-spacer>
									<v-btn color="#00B74A" dark @click="redirect(menu.data.restaurant)"
										><v-icon left>mdi-content-paste</v-icon> Cardápio</v-btn
									>
								</v-card-actions>
							</v-card>
						</v-list-item>
					</v-list>
				</div>
				<div v-else-if="page === 2" style="margin-bottom: 5%">
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
					<div v-for="(menu, index) in menus" :key="index" style="margin-top: 5%">
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
							<v-card-text>
								<v-expansion-panels>
									<v-expansion-panel
										v-for="(product, index) in menu.data.products"
										:key="index"
									>
										<v-expansion-panel-header style="width: 100%; display: flex">
											<v-card-text style="margin-right: auto"
												><h4>{{ product.productName }}</h4></v-card-text
											>
											<v-card-text style="margin-left: auto"
												><h4>{{ product.price }}</h4></v-card-text
											>
										</v-expansion-panel-header>
										<v-expansion-panel-content>
											<v-list>
												<v-list-item
													v-for="(ingredient, index) in product.productIngredients"
													:key="index"
												>
													{{ ingredient }}
												</v-list-item>
											</v-list>
										</v-expansion-panel-content>
									</v-expansion-panel>
								</v-expansion-panels>
							</v-card-text>
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
import {
	collection,
	addDoc,
	getDocs,
	doc,
	query,
	where,
	updateDoc,
	onSnapshot,
	limit,
} from "firebase/firestore";
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
		this.getAllMenus();
	},
	beforeDestroy() {
		this.unsub();
	},
	data() {
		return {
			page: 1,
			isAddingNewMenu: false,
			menus: [],
			allMenus: [],
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
			this.getUserMenus();
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
			this.getUserMenus();
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
		async getAllMenus() {
			try {
				const q = query(collection(firebase.db, "menus"), limit(10));
				const querySnapshot = await getDocs(q);
				this.allMenus = querySnapshot.docs.map((doc) => {
					return { data: doc.data() };
				});
			} catch (error) {
				console.error("Error getting document: ", error);
			}
		},
		async filter(state, city) {
			where("location.state", "==", state);
			where("location.city", "==", city);
			try {
				let q;
				if (state && city) {
					q = query(
						collection(firebase.db, "menus"),
						where("location.state", "==", state),
						where("location.city", "==", city)
					);
				} else if (state && !city) {
					q = query(collection(firebase.db, "menus"), where("location.state", "==", state));
				} else {
					q = query(collection(firebase.db, "menus"));
				}
				const querySnapshot = await getDocs(q);
				this.allMenus = querySnapshot.docs.map((doc) => {
					return { data: doc.data() };
				});
			} catch (error) {
				console.error("Error getting document: ", error);
			}
		},
		redirect(restaurantID) {
			this.$router.push(`/cardapio/${restaurantID}`);
		},
	},
};
</script>

<style></style>
