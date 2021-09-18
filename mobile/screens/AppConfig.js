import React, {useState, useEffect} from "react";
import {View, StyleSheet, Alert, Image} from "react-native";
import {Input, Button, Icon, Text} from "react-native-elements";
import {useHistory} from "react-router-native";
import KeyStorage from "react-native-sensitive-info";

export default () => {
	const router = useHistory();
	const [serverIp, setServerIp] = useState("");
	const [serverPort, setServerPort] = useState("");

	useEffect(() => {
		async function checkStorage() {
			const StorageServerAddress = await KeyStorage.getItem(
				"serverAddress",
				{
					sharedPreferencesName: "appConfig",
					keychainService: "appConfig",
				},
			);
			if (StorageServerAddress) {
				setServerIp(StorageServerAddress.split(":")[0]);
				setServerPort(StorageServerAddress.split(":")[1]);
			}
		}
		checkStorage();
	}, []);

	return (
		<View style={styles.mainContainer}>
			<Image
				source={require("./logo.png")}
				// eslint-disable-next-line react-native/no-inline-styles
				style={{
					width: 262.5,
					height: 174.5,
					transform: [{scale: 1}],
					margin: "auto",
					marginBottom: 0,
					marginTop: "60%",
				}}
			/>
			<View style={styles.container}>
				<Text style={styles.title}>Configurar Servidor</Text>
				<View>
					<Input
						placeholder="Endereço IP"
						leftIcon={{
							type: "font-awesome-5",
							solid: true,
							name: "server",
						}}
						value={serverIp}
						onChangeText={newIp => {
							setServerIp(newIp);
						}}
					/>
					<Input
						placeholder="Porta"
						leftIcon={{type: "font-awesome-5", name: "door-open"}}
						value={serverPort}
						onChangeText={newPort => {
							setServerPort(newPort);
						}}
					/>
				</View>
				<Button
					icon={
						<Icon
							name="save"
							solid={true}
							type="font-awesome-5"
							size={20}
							color="#00B74A"
						/>
					}
					title=" Salvar"
					buttonStyle={styles.loginButton}
					titleStyle={styles.loginButtonText}
					onPress={async () => {
						try {
							await KeyStorage.setItem(
								"serverAddress",
								`${serverIp}:${serverPort}`,
								{
									sharedPreferencesName: "appConfig",
									keychainService: "appConfig",
								},
							);
							router.push("/");
						} catch (err) {
							Alert.alert(
								"Erro",
								`Não foi possível salvar as informações, erro: ${err}`,
							);
						}
					}}
				/>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	mainContainer: {
		backgroundColor: "#00B74A",
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
	},
	title: {
		fontSize: 30,
		color: "#121212",
		fontWeight: "bold",
		textAlign: "center",
	},
	container: {
		// marginTop: '30%',
		// padding: 10,
		marginTop: 0,
		display: "flex",
		paddingTop: "10%",
		height: "100%",
		width: "100%",
		borderWidth: 1,
		borderTopLeftRadius: 60,
		borderTopRightRadius: 60,
		borderColor: "#fff",
		backgroundColor: "#fff",
	},
	loginButton: {
		backgroundColor: "#262626",
		width: "80%",
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		alignContent: "center",
		alignSelf: "center",
		textAlign: "center",
	},
	loginButtonText: {
		color: "#00B74A",
	},
	serverConfig: {
		display: "flex",
		textAlign: "right",
		alignContent: "flex-end",
		alignItems: "flex-end",
		alignSelf: "flex-end",
		marginTop: "5%",
	},
	configButton: {
		color: "#00B74A",
	},
});
