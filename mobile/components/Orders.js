/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from "react";
import {ScrollView, StyleSheet, useWindowDimensions, View} from "react-native";
import {Text, Card, Icon} from "react-native-elements";
import {DataTable} from "react-native-paper";
import axios from "axios";
require("intl");
require("intl/locale-data/jsonp/pt-BR");

export default function ({serverAddress}) {
	const {width} = useWindowDimensions();
	const [orders, setOrders] = useState([]);

	useEffect(() => {
		function getRequests(address) {
			console.log(`http://${address}/requests/gettoday`);
			axios
				.get(`http://${address}/requests/gettoday`)
				.then(apiRequests => {
					console.log(apiRequests.data[0].products);
					setOrders(apiRequests.data);
				})
				.catch(() => {
					setOrders([]);
				});
		}
		serverAddress()
			.then(promise_address => {
				getRequests(promise_address);
				const ws = new WebSocket(`ws://${promise_address}`);
				ws.onmessage = message => {
					if (message === "requests") {
						getRequests(promise_address);
					}
				};
			})
			.catch(err => {
				console.log(err);
			});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	function toCurrency(products, single = false) {
		let price = 0;
		single
			? (price = products)
			: products.forEach(product => {
					price += product.price * product.quantity;
			  });

		return new Intl.NumberFormat("pt-BR", {
			style: "currency",
			currency: "BRL",
		}).format(price);
	}

	return (
		<ScrollView style={styles.scrollview}>
			{orders.map((order, i) => (
				<Card containerStyle={styles.cardContainer} key={i}>
					<Card.Title style={styles.cardTitle}>
						<View
							style={{
								display: "flex",
								flexDirection: "row",
								justifyContent: "space-between",
								width: width * 0.95,
							}}>
							<View
								style={{
									color: "#fff",
									paddingLeft: 10,
									marginTop: "auto",
									marginBottom: "auto",
									display: "flex",
									flexDirection: "row",
								}}>
								<Icon
									name="concierge-bell"
									type="font-awesome-5"
									color="#fff"
									style={{marginRight: 10}}
								/>
								<Text style={{fontSize: 20, color: "#fff"}}>
									Mesa: {order.tableDoc.table}
								</Text>
							</View>
						</View>
					</Card.Title>

					<View
						style={{
							display: "flex",
							flex: 1,
							flexDirection: "column",
							marginLeft: 10,
							marginRight: 10,
						}}>
						<View
							style={{
								color: "#fff",
								paddingLeft: 10,
								marginTop: "auto",
								marginBottom: "auto",
								display: "flex",
								flexDirection: "row",
							}}>
							<Icon
								name="utensils"
								type="font-awesome-5"
								color="#121212"
								size={18}
								style={{marginRight: 10}}
							/>
							<Text>Pedido</Text>
						</View>
						<Card.Divider />
						<DataTable>
							<DataTable.Header>
								<DataTable.Title>Produto</DataTable.Title>
								<DataTable.Title numeric>
									Quantidade
								</DataTable.Title>
								<DataTable.Title numeric>
									Preço Un.
								</DataTable.Title>
							</DataTable.Header>
							{order.products.map((product, ii) => {
								return (
									<View key={ii}>
										<DataTable.Row>
											<DataTable.Cell>
												{product.name}
											</DataTable.Cell>
											<DataTable.Cell numeric>
												{product.quantity}
											</DataTable.Cell>
											<DataTable.Cell numeric>
												{toCurrency(
													product.price,
													true,
												)}
											</DataTable.Cell>
										</DataTable.Row>
									</View>
								);
							})}
							<Card.Divider />
							<View
								style={{
									color: "#fff",
									marginTop: "auto",
									marginBottom: "auto",
									display: "flex",
									flexDirection: "row",
								}}>
								<Icon
									name="eye"
									type="font-awesome-5"
									color="#121212"
									size={18}
									style={{marginRight: 10}}
								/>
								<Text>Observações</Text>
							</View>
							<ScrollView>
								<Text>{order.observations}</Text>
							</ScrollView>
							<Card.Divider />
							<View
								style={{
									color: "#fff",
									marginTop: "auto",
									marginBottom: "auto",
									display: "flex",
									flexDirection: "row",
								}}>
								<View
									style={{
										display: "flex",
										flexDirection: "row",
										justifyContent: "space-between",
										width: "100%",
									}}>
									<View
										style={{
											display: "flex",
											flexDirection: "row",
										}}>
										<Icon
											name="money-bill"
											type="font-awesome-5"
											color="#121212"
											size={20}
											style={{marginRight: 10}}
										/>
										<Text
											style={{
												fontSize: 15,
											}}>
											TOTAL:
										</Text>
									</View>
									<Text
										style={{
											fontSize: 15,
										}}>
										{toCurrency(order.products)}
									</Text>
								</View>
							</View>
							<Card.Divider style={{backgroundColor: "#fff"}} />
						</DataTable>
					</View>
				</Card>
			))}
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	scrollview: {
		minHeight: "90%",
		maxHeight: "90%",
	},
	cardContainer: {
		marginLeft: 5,
		marginRight: 5,
		padding: 0,
		borderColor: "rgba(52, 52, 52, 0.3)",
		borderWidth: 1,
	},
	cardTitle: {
		backgroundColor: "#00B74A",
		color: "#fff",
		padding: 5,
	},
});
