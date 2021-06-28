import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Alert} from 'react-native';
import {Input, Button, Icon, Text} from 'react-native-elements';
import {useHistory} from 'react-router-native';
import KeyStorage from 'react-native-sensitive-info';

export default () => {
	const router = useHistory();
	const [serverIp, setServerIp] = useState('');
	const [serverPort, setServerPort] = useState('');

	useEffect(() => {
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
	}, []);

	return (
		<View style={styles.container}>
			<Text style={styles.title}>ORDERIFY - Configurações</Text>
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
	);
};

const styles = StyleSheet.create({
	container: {
		marginTop: -10,
		padding: 10,
		display: 'flex',
		height: '100%',
		justifyContent: 'center',
	},
	title: {
		fontSize: 30,
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		alignContent: 'center',
		alignSelf: 'center',
		textAlign: 'center',
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
