import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Alert} from 'react-native';
import {Input, Button, Icon, Text} from 'react-native-elements';
import {useHistory} from 'react-router-native';
import KeyStorage from 'react-native-sensitive-info';

export default ({onLoad}) => {
	const router = useHistory();
	const [serverIp, setServerIp] = useState('');
	const [serverPort, setServerPort] = useState('');

	useEffect(() => {
		onLoad();
		async function checkStorage() {
			const StorageServerAddress = await KeyStorage.getItem(
				'serverAddress',
				{
					sharedPreferencesName: 'appConfig',
					keychainService: 'appConfig',
				},
			);
			if (StorageServerAddress) {
				setServerIp(StorageServerAddress.split(':')[0]);
				setServerPort(StorageServerAddress.split(':')[1]);
			}
		}
		checkStorage();
	}, [onLoad]);

	return (
		<View style={styles.mainContainer}>
			<View style={styles.container}>
				<View>
					<Input
						placeholder="Endereço IP"
						leftIcon={{
							type: 'font-awesome-5',
							solid: true,
							name: 'server',
						}}
						value={serverIp}
						onChangeText={newIp => {
							setServerIp(newIp);
						}}
					/>
					<Input
						placeholder="Porta"
						leftIcon={{type: 'font-awesome-5', name: 'door-open'}}
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
								'serverAddress',
								`${serverIp}:${serverPort}`,
								{
									sharedPreferencesName: 'appConfig',
									keychainService: 'appConfig',
								},
							);
							router.push('/');
						} catch (err) {
							Alert.alert(
								'Erro',
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
		backgroundColor: '#00B74A',
	},
	container: {
		marginTop: '5%',
		padding: 10,
		display: 'flex',
		paddingTop: '20%',
		height: '100%',
		borderWidth: 1,
		borderTopLeftRadius: 60,
		borderTopRightRadius: 60,
		borderColor: '#fff',
		backgroundColor: '#fff',
	},
	checkbox: {
		color: '#121212',
	},
	loginButton: {
		backgroundColor: '#262626',
	},
	loginButtonText: {
		color: '#00B74A',
	},
});
