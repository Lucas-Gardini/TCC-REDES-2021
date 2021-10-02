/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from "react";
import {
	StyleSheet,
	View,
	ScrollView,
	Dimensions,
	ActivityIndicator,
	Alert,
	useWindowDimensions,
} from "react-native";
import {
	Button,
	Icon,
	SpeedDial,
	Text,
	ListItem,
	BottomSheet,
	Overlay,
	PricingCard,
	Input,
	Card,
} from "react-native-elements";
import {DataTable} from "react-native-paper";
import KeyStorage from "react-native-sensitive-info";
import axios from "axios";
import {useHistory} from "react-router-native";
import Orders from "../../components/Orders";

export default () => {
	const {width} = useWindowDimensions();

	const router = useHistory();
	const [isLoading, setIsLoading] = useState(true);
	const [isReviewing, setIsReviewing] = useState(false);
	const [open, setOpen] = useState(false);
	const [isMakingNewRequest, setIsMakingNewRequest] = useState(false);
	const [changingTable, setChangingTable] = useState(false);
	const [products, setProducts] = useState([]);
	const [tables, setTables] = useState([]);
	const [newRequest, setNewRequest] = useState({
		table_id: "",
		table_number: 0,
		products: [],
		observations: "",
	});
	const deviceDimensions = Dimensions.get("window");

	useEffect(() => {
		KeyStorage.getItem("serverAddress", {
			sharedPreferencesName: "appConfig",
			keychainService: "appConfig",
		}).then(serverAddress => {
			axios
				.get(`http://${serverAddress}/products/getall`)
				.then(apiProducts => {
					setProducts(apiProducts.data);
					axios
						.get(`http://${serverAddress}/tables/getall`)
						.then(apiTables => {
							setTables(apiTables.data);
							setNewRequest({
								table_id: "",
								table_number: apiTables.data[0].table,
								observations: "",
								products: [],
							});
							setTimeout(() => {
								setIsLoading(false);
							}, 800);
						});
				});
			const ws = new WebSocket(`ws://${serverAddress}`);

			ws.onmessage = message => {
				console.log(message);
			};
		});
	}, []);

	function manageNewProducts(newProduct, quantity) {
		if (!newProduct.available) {
			Alert.alert("Produto Indisponível");
			return;
		}
		let newProducts = [...newRequest.products];
		const alreadyAdded = newProducts.findIndex(product => {
			return product.productId === newProduct._id;
		});
		if (alreadyAdded > -1) {
			newProducts[alreadyAdded].quantity += quantity;
			if (newProducts[alreadyAdded].quantity <= 0) {
				newProducts.splice(alreadyAdded, 1);
			}
		} else {
			if (quantity === -1) {
				return;
			}
			newProducts.push({
				name: newProduct.name,
				productId: newProduct._id,
				quantity,
				price: newProduct.price,
			});
		}

		setNewRequest({
			table_id: newRequest.table_id,
			table_number: newRequest.table_number,
			observations: newRequest.observations,
			products: newProducts,
		});
	}

	function getPrice() {
		let totalPrice = 0;
		newRequest.products.map(product => {
			totalPrice += product.quantity * product.price;
		});
		return `R$ ${String(
			totalPrice.toFixed(2).toLocaleString("pt-br", {
				style: "currency",
				currency: "BRL",
			}),
		).replace(".", ",")}`;
	}

	async function sendRequest() {
		axios
			.post(
				`http://${await KeyStorage.getItem("serverAddress", {
					sharedPreferencesName: "appConfig",
					keychainService: "appConfig",
				})}/requests/add`,
				newRequest,
			)
			.then(response => {
				if (response.data === "OK") {
					Alert.alert("Pedido Enviado!");
					setIsReviewing(false);
					setIsMakingNewRequest(false);
					setIsMakingNewRequest(false);
					setNewRequest({
						table_id: "",
						table_number: 0,
						products: [],
						observations: "",
					});
				} else {
					Alert.alert(response.data);
				}
			});
	}

	function toCurrency(_products, single = false) {
		let price = 0;
		single
			? (price = _products)
			: _products.forEach(product => {
					price += product.price * product.quantity;
			  });

		return new Intl.NumberFormat("pt-BR", {
			style: "currency",
			currency: "BRL",
		}).format(price);
	}

	return (
		<View style={styles.mainContainer}>
			<Overlay
				isVisible={isReviewing}
				onBackdropPress={() => {
					setIsReviewing(false);
				}}>
				<View
					style={{
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
					}}>
					<Text>Mesa: {newRequest.table_number}</Text>
				</View>
				<PricingCard
					containerStyle={{width: width * 0.8}}
					color="#00B74A"
					title="Total"
					titleStyle={{color: "#00B74A"}}
					price={getPrice()}
					button={{
						title: " Finalizar Pedido",
						icon: {
							name: "clipboard-check",
							type: "font-awesome-5",
							color: "#fff",
						},
						// color: '#00B74A',
						onPress: sendRequest,
					}}
				/>
				<View>
					<Input
						placeholder="Observações"
						multiline={true}
						leftIcon={{
							type: "font-awesome-5",
							solid: true,
							name: "eye",
						}}
						value={newRequest.observations}
						onChangeText={obs => {
							setNewRequest({
								observations: obs,
								products: newRequest.products,
								table_id: newRequest.table_id,
								table_number: newRequest.table_number,
							});
						}}
					/>
				</View>
				<View
					style={{
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
					}}>
					<Text>Produtos: </Text>
				</View>
				<ScrollView style={{maxHeight: 200}}>
					<DataTable>
						<DataTable.Header>
							<DataTable.Title>Produto</DataTable.Title>
							<DataTable.Title numeric>
								Quantidade
							</DataTable.Title>
							<DataTable.Title numeric>Preço Un.</DataTable.Title>
						</DataTable.Header>
						{newRequest.products.map((product, i) => (
							<DataTable.Row key={i}>
								<DataTable.Cell>{product.name}</DataTable.Cell>
								<DataTable.Cell numeric>
									{product.quantity}
								</DataTable.Cell>
								<DataTable.Cell numeric>
									{toCurrency(product.price, true)}
								</DataTable.Cell>
							</DataTable.Row>
						))}
					</DataTable>
				</ScrollView>
				<Button
					type="clear"
					titleStyle={{color: "#F93154"}}
					title="Cancelar"
					onPress={() => {
						setIsReviewing(false);
					}}
				/>
			</Overlay>
			{isMakingNewRequest && !isLoading ? (
				<ScrollView>
					{/* <Text h1={true} style={{marginLeft: 10}}>
						<Icon
							name="plus"
							type="font-awesome-5"
							color="#121212"
							style={{marginRight: 10}}
						/>
						Novo Pedido
					</Text> */}
					<ListItem>
						<Button
							buttonStyle={{
								justifyContent: "flex-start",
								width: deviceDimensions.width - 35,
							}}
							titleStyle={{
								color: "#00B74A",
							}}
							title={` Escolher Mesa: ${newRequest.table_number} `}
							type="clear"
							onPress={() => setChangingTable(!changingTable)}
						/>
						<BottomSheet
							isVisible={changingTable}
							containerStyle={{
								backgroundColor: "rgba(0.5, 0.25, 0, 0.2)",
							}}>
							{tables.map((table, i) => (
								<ListItem
									disabled={!table.available}
									disabledStyle={{backgroundColor: "gray"}}
									onPress={() => {
										const newTableOnRequest = newRequest;
										newTableOnRequest.table_number =
											table.table;
										newTableOnRequest.table_id = table._id;
										setNewRequest(newTableOnRequest);
										setChangingTable(false);
									}}
									key={i}>
									<ListItem.Content>
										<ListItem.Title>
											{table.table}
										</ListItem.Title>
									</ListItem.Content>
								</ListItem>
							))}
							<ListItem
								onPress={() => {
									setChangingTable(false);
								}}
								containerStyle={{backgroundColor: "#F93154"}}>
								<ListItem.Content>
									<ListItem.Title style={{color: "#fff"}}>
										Cancelar
									</ListItem.Title>
								</ListItem.Content>
							</ListItem>
						</BottomSheet>
					</ListItem>
					{products.map((product, i) => (
						<Card
							containerStyle={{
								marginLeft: 5,
								marginRight: 5,
								padding: 0,
								borderColor: "rgba(52, 52, 52, 0.3)",
								borderWidth: 1,
							}}
							key={i}>
							<Card.Title
								style={{
									backgroundColor: product.available
										? "#00B74A"
										: "#F93154",
									color: "#fff",
									padding: 5,
								}}>
								<View
									style={{
										display: "flex",
										flexDirection: "row",
										justifyContent: "space-between",
										width: width * 0.95,
									}}>
									<Text
										style={{
											color: "#fff",
											paddingLeft: 10,
											marginTop: "auto",
											marginBottom: "auto",
										}}>
										{product.name}
									</Text>
									<View
										style={{
											display: "flex",
											flexDirection: "row",
											justifyContent: "space-between",
										}}>
										<Button
											buttonStyle={{
												backgroundColor: "#fff",
											}}
											icon={
												<Icon
													type="font-awesome-5"
													name="plus"
													color="#00B74A"
													size={15}
												/>
											}
											onPress={() => {
												manageNewProducts(product, 1);
											}}
										/>
										<Text> </Text>
										<Button
											buttonStyle={{
												backgroundColor: "#fff",
											}}
											icon={
												<Icon
													type="font-awesome-5"
													name="minus"
													color="#F93154"
													size={15}
												/>
											}
											onPress={() => {
												manageNewProducts(product, -1);
											}}
										/>
									</View>
								</View>
							</Card.Title>
							<Card.Divider />
							<View
								style={{
									display: "flex",
									flex: 1,
									flexDirection: "column",
									marginLeft: 10,
									marginRight: 10,
								}}>
								{product.ingredients.map((ingredient, ii) => {
									return (
										<View key={ii}>
											{/* <Button
															buttonStyle={{
																justifyContent:
																	'flex-start',
																width:
																	deviceDimensions.width -
																	35,
															}}
															title={}
															type="clear"
														/> */}
											<Text>• {ingredient}</Text>
										</View>
									);
								})}
							</View>
							<Card.Divider />
							<Card.Title
								style={{
									padding: 5,
								}}>
								<Text>
									{newRequest.products.findIndex(prod => {
										return prod.productId === product._id;
									}) === -1
										? "Quantidade: 0"
										: `Quantidade: ${
												newRequest.products[
													newRequest.products.findIndex(
														prod => {
															return (
																prod.productId ===
																product._id
															);
														},
													)
												].quantity
												// eslint-disable-next-line no-mixed-spaces-and-tabs
										  }`}
								</Text>
							</Card.Title>
						</Card>
						// <ListItem key={i} bottomDivider>
						// 	<ListItem.Content>
						// 		<ListItem.Title>
						// 			<View>
						// 				<Text style={{fontSize: 25}}>
						// 					{product.name} -{' '}
						// 					{product.available
						// 						? 'Disponível'
						// 						: 'Indisponível'}
						// 				</Text>
						// 			</View>
						// 		</ListItem.Title>
						// 		<ListItem.Subtitle>
						// 			<View
						// 				style={{
						// 					display: 'flex',
						// 					flex: 1,
						// 					flexDirection: 'column',
						// 				}}>
						// 				{product.ingredients.map(
						// 					(ingredient, ii) => {
						// 						return (
						// 							<View key={ii}>
						// 								{/* <Button
						// 									buttonStyle={{
						// 										justifyContent:
						// 											'flex-start',
						// 										width:
						// 											deviceDimensions.width -
						// 											35,
						// 									}}
						// 									title={}
						// 									type="clear"
						// 								/> */}
						// 								<Text>
						// 									• {ingredient}
						// 								</Text>
						// 							</View>
						// 						);
						// 					},
						// 				)}
						// 			</View>
						// 		</ListItem.Subtitle>
						// 		<View
						// 			style={{
						// 				flexDirection: 'row',
						// 				marginTop: 15,
						// 			}}>
						// 			<View style={{marginRight: 15}}>
						// 				<Button
						// 					buttonStyle={{
						// 						backgroundColor: '#fff',
						// 					}}
						// 					icon={
						// 						<Icon
						// 							type="font-awesome-5"
						// 							name="plus"
						// 							color="#00B74A"
						// 							size={15}
						// 						/>
						// 					}
						// 					onPress={() => {
						// 						manageNewProducts(product, 1);
						// 					}}
						// 				/>
						// 			</View>
						// 			<View style={{marginRight: 15}}>
						// 				<Button
						// 					buttonStyle={{
						// 						backgroundColor: '#fff',
						// 					}}
						// 					icon={
						// 						<Icon
						// 							type="font-awesome-5"
						// 							name="minus"
						// 							color="#F93154"
						// 							size={15}
						// 						/>
						// 					}
						// 					onPress={() => {
						// 						manageNewProducts(product, -1);
						// 					}}
						// 				/>
						// 			</View>
						// 			<View>
						// 				<Button
						// 					buttonStyle={{
						// 						backgroundColor: '#fff',
						// 					}}
						// 					titleStyle={{
						// 						color: '#121212',
						// 					}}
						// 					disabled={true}
						// 					disabledStyle={{
						// 						backgroundColor: '#fff',
						// 					}}
						// 					disabledTitleStyle={{
						// 						color: '#121212',
						// 					}}
						// 					title={
						// 						newRequest.products.findIndex(
						// 							prod => {
						// 								return (
						// 									prod.productId ===
						// 									product._id
						// 								);
						// 							},
						// 						) === -1
						// 							? 'Quantidade: 0'
						// 							: `Quantidade: ${
						// 									newRequest.products[
						// 										newRequest.products.findIndex(
						// 											prod => {
						// 												return (
						// 													prod.productId ===
						// 													product._id
						// 												);
						// 											},
						// 										)
						// 									].quantity
						// 									// eslint-disable-next-line no-mixed-spaces-and-tabs
						// 							  }`
						// 					}
						// 				/>
						// 			</View>
						// 		</View>
						// 	</ListItem.Content>
						// </ListItem>
					))}
				</ScrollView>
			) : (
				<View style={{height: "100%"}}>
					{!isLoading ? (
						<Orders
							serverAddress={function () {
								return new Promise((resolve, reject) => {
									KeyStorage.getItem("serverAddress", {
										sharedPreferencesName: "appConfig",
										keychainService: "appConfig",
									}).then(serverAddress => {
										resolve(serverAddress);
									});
								});
							}}
						/>
					) : (
						<View />
					)}
				</View>
			)}
			{isLoading ? (
				<ActivityIndicator
					style={{
						position: "absolute",
						left: 0,
						right: 0,
						top: 0,
						bottom: 0,
						alignItems: "center",
						justifyContent: "center",
					}}
					size="large"
					color="#00B74A"
				/>
			) : (
				<SpeedDial
					style={styles.speedDialMenu}
					color="#00B74A"
					isOpen={open}
					icon={
						<Icon name="plus" type="font-awesome-5" color="#fff" />
					}
					openIcon={
						<Icon name="times" type="font-awesome-5" color="#fff" />
					}
					onOpen={() => setOpen(!open)}
					onClose={() => setOpen(!open)}>
					{newRequest.products.length > 0 ? (
						<SpeedDial.Action
							icon={
								<Icon
									name="clipboard-check"
									type="font-awesome-5"
									color="#fff"
									size={20}
								/>
							}
							color="#00B74A"
							title="Revisar Pedido"
							onPress={() => {
								setIsReviewing(true);
								// sendRequest();
							}}
						/>
					) : (
						false
					)}
					<SpeedDial.Action
						icon={
							isMakingNewRequest ? (
								<Icon
									name="ban"
									type="font-awesome-5"
									color="#fff"
									size={20}
								/>
							) : (
								<Icon
									name="cart-plus"
									type="font-awesome-5"
									color="#fff"
									size={20}
								/>
							)
						}
						color="#1266F1"
						title={
							isMakingNewRequest
								? "Cancelar Pedido"
								: "Novo Pedido"
						}
						onPress={() => {
							setIsMakingNewRequest(!isMakingNewRequest);
							setOpen(!open);
						}}
					/>
					<SpeedDial.Action
						icon={
							<Icon
								name="sign-in-alt"
								type="font-awesome-5"
								color="#fff"
								size={20}
							/>
						}
						color="#F93154"
						title="Sair"
						onPress={async () => {
							const serverAddress = await KeyStorage.getItem(
								"serverAddress",
								{
									sharedPreferencesName: "appConfig",
									keychainService: "appConfig",
								},
							);
							const logOut = (
								await axios.post(
									`http://${serverAddress}/user/logoff`,
								)
							).data;
							if (logOut.success) {
								router.push("/");
							}
						}}
					/>
				</SpeedDial>
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	mainContainer: {
		position: "relative",
		margin: 0,
		height: "95%",
	},
	fabNewOrder: {
		position: "absolute",
		bottom: 0,
		right: 0,
		marginBottom: 5,
	},
	speedDialMenu: {
		position: "absolute",
		bottom: "-5%",
		right: 0,
		// backgroundColor: '#00B74A',
	},
});
