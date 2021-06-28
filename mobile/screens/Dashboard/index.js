/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {
	StyleSheet,
	View,
	ScrollView,
	Dimensions,
	ActivityIndicator,
} from 'react-native';
import {
	Button,
	Icon,
	SpeedDial,
	Text,
	ListItem,
	BottomSheet,
} from 'react-native-elements';
import KeyStorage from 'react-native-sensitive-info';
import axios from 'axios';
import {useHistory} from 'react-router-native';

export default () => {
	const router = useHistory();
	const [isLoading, setIsLoading] = useState(true);
	const [open, setOpen] = useState(false);
	const [isMakingNewRequest, setIsMakingNewRequest] = useState(false);
	const [changingTable, setChangingTable] = useState(false);
	const [products, setProducts] = useState([]);
	const [tables, setTables] = useState([]);
	const [newRequest, setNewRequest] = useState({
		table_id: 0,
		products: [],
		observations: '',
	});
	const deviceDimensions = Dimensions.get('window');

	useEffect(() => {
		KeyStorage.getItem('serverAddress', {
			sharedPreferencesName: 'appConfig',
			keychainService: 'appConfig',
		}).then(serverAddress => {
			axios
				.get(`http://${serverAddress}/products/getall`)
				.then(apiProducts => {
					setProducts(apiProducts.data);
					axios
						.get(`http://${serverAddress}/tables/getall`)
						.then(apiTables => {
							setTables(apiTables.data);
							setTimeout(() => {
								setIsLoading(false);
							}, 800);
						});
				});
		});
	}, []);

	return (
		<View style={styles.mainContainer}>
			{isMakingNewRequest && !isLoading ? (
				<ScrollView>
					<Text h1={true} style={{marginLeft: 10}}>
						Novo Pedido
					</Text>
					<ListItem>
						<Button
							buttonStyle={{
								justifyContent: 'flex-start',
								width: deviceDimensions.width - 35,
							}}
							title={` Escolher Mesa: ${newRequest.table_id} `}
							type="clear"
							onPress={() => setChangingTable(!changingTable)}
						/>
						<BottomSheet
							isVisible={changingTable}
							containerStyle={{
								backgroundColor: 'rgba(0.5, 0.25, 0, 0.2)',
							}}>
							{tables.map((table, i) => (
								<ListItem
									onPress={() => {
										const newTableOnRequest = newRequest;
										newTableOnRequest.table_id =
											table.table;
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
								containerStyle={{backgroundColor: '#F93154'}}>
								<ListItem.Content>
									<ListItem.Title style={{color: '#fff'}}>
										Cancelar
									</ListItem.Title>
								</ListItem.Content>
							</ListItem>
						</BottomSheet>
					</ListItem>
					{products.map((product, i) => (
						<ListItem key={i} bottomDivider>
							<ListItem.Content>
								<ListItem.Title>
									<View>
										<Text>{product.name}</Text>
									</View>
								</ListItem.Title>
								<ListItem.Subtitle>
									<View
										style={{
											display: 'flex',
											flex: 1,
											flexDirection: 'column',
										}}>
										{product.ingredients.map(
											(ingredient, ii) => {
												return (
													<View key={ii}>
														<Button
															buttonStyle={{
																justifyContent:
																	'flex-start',
																width:
																	deviceDimensions.width -
																	35,
															}}
															title={` ${ingredient} `}
															type="clear"
														/>
													</View>
												);
											},
										)}
									</View>
								</ListItem.Subtitle>
							</ListItem.Content>
						</ListItem>
					))}
				</ScrollView>
			) : (
				<View style={{width: '100%'}} />
			)}
			{isLoading ? (
				<ActivityIndicator
					style={{
						position: 'absolute',
						left: 0,
						right: 0,
						top: 0,
						bottom: 0,
						alignItems: 'center',
						justifyContent: 'center',
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
								? 'Cancelar Pedido'
								: 'Novo Pedido'
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
								'serverAddress',
								{
									sharedPreferencesName: 'appConfig',
									keychainService: 'appConfig',
								},
							);
							const logOut = (
								await axios.post(
									`http://${serverAddress}/user/logoff`,
								)
							).data;
							if (logOut.success) {
								router.push('/');
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
		position: 'relative',
		margin: 0,
		height: '95%',
	},
	fabNewOrder: {
		position: 'absolute',
		bottom: 0,
		right: 0,
		marginBottom: 5,
	},
	speedDialMenu: {
		position: 'absolute',
		bottom: 0,
		right: 0,
		// backgroundColor: '#00B74A',
	},
});
