<template>
	<v-card v-if="menu.restaurant">
		<v-row>
			<v-col cols="1">
				<v-card-title>
					<v-avatar>
						<img
							:src="
								menu.image
									? menu.image
									: `https://ui-avatars.com/api/?name=${menu.restaurant}`
							"
							alt="John"
							size="128"
						/>
					</v-avatar>
				</v-card-title>
			</v-col>
			<v-col cols="10">
				<v-card-title>{{ menu.restaurant }}</v-card-title>
				<v-card-subtitle>
					<v-list>
						<v-list-item style="padding: 0px !important">
							<v-list-item-content style="padding: 0px !important"
								>{{ menu.location.state }} - {{ menu.location.city }}</v-list-item-content
							>
						</v-list-item>
						<v-list-item style="padding: 0px !important">
							<v-list-item-content style="padding: 0px !important"
								>{{ menu.location.district }} - {{ menu.location.city }} -
								{{ menu.location.number }}</v-list-item-content
							>
						</v-list-item>
						<v-list-item style="padding: 0px !important">
							<v-list-item-content style="padding: 0px !important">{{
								menu.location.zipcode
							}}</v-list-item-content>
						</v-list-item>
					</v-list>
				</v-card-subtitle>
			</v-col>
		</v-row>
		<v-row style="margin-left: 5%; margin-right: 5%">
			<v-col v-for="(product, index) in menu.products" :key="index">
				<v-card class="mx-auto" max-width="344" style="height: 100% !important">
					<v-img v-if="product.img" :src="product.img" height="200px"></v-img>

					<v-card-title> {{ product.productName }} </v-card-title>

					<v-card-subtitle> {{ product.price }} </v-card-subtitle>

					<v-card-actions>
						<v-spacer></v-spacer>
						<v-icon>mdi-food</v-icon>
						<v-btn icon @click="showIngredients(product)">
							<v-icon>{{ product.show ? "mdi-chevron-up" : "mdi-chevron-down" }}</v-icon>
						</v-btn>
					</v-card-actions>

					<v-expand-transition>
						<div v-show="product.show">
							<v-divider></v-divider>

							<v-card-text>
								<p v-for="(ingredient, index2) in product.productIngredients" :key="index2">
									{{ ingredient }}
								</p>
							</v-card-text>
						</div>
					</v-expand-transition>
				</v-card>
			</v-col>
		</v-row>
	</v-card>
</template>

<script>
import firebase from "../firebase.js";
import { getDocs, query, where, collection } from "firebase/firestore";
export default {
	data() {
		return {
			menu: {
				location: {
					zipcode: "",
					city: "",
					state: "",
					district: "",
					number: "",
					street: "",
				},
				restaurant: "",
				uid: "",
				products: [],
			},
		};
	},
	mounted() {
		this.getMenu();
	},
	methods: {
		async getMenu() {
			try {
				const q = query(
					collection(firebase.db, "menus"),
					where("restaurant", "==", this.$route.params.id)
				);
				const querySnapshot = await getDocs(q);
				this.menu = querySnapshot.docs[0].data();
				let productsWithShow = [];
				this.menu.products.map((product) => {
					product.show = false;
					productsWithShow.push(product);
				});
				this.menu.products = productsWithShow;
			} catch (error) {
				this.menu = "Este cardápio não existe";
			}
		},
		showIngredients(product) {
			let index = this.menu.products.indexOf(product);
			let menuCopy = { ...this.menu };
			menuCopy.products[index].show = !menuCopy.products[index].show;
			this.menu = menuCopy;
		},
	},
};
</script>

<style></style>
