import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Alert, ActivityIndicator} from 'react-native';
import {Input, Button, Icon, Text} from 'react-native-elements';
import {useHistory} from 'react-router-native';
import KeyStorage from 'react-native-sensitive-info';
import axios from 'axios';

export default ({onLoad}) => {
	const router = useHistory();

	const [serverAddress, setServerAddress] = useState('');
	const [login, setLogin] = useState({user: null, password: null});

	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		onLoad();
		KeyStorage.getItem('user', {
			sharedPreferencesName: 'userLogin',
			keychainService: 'userLogin',
		})
			.then(user => {
				if (user) {
					setLogin({
						user: JSON.parse(user).user,
						password: JSON.parse(user).password,
					});
				}
			})
			.catch(err => {
				console.log(err);
			});

		async function getLogin() {
			const StorageServerAddress = await KeyStorage.getItem(
				'serverAddress',
				{
					sharedPreferencesName: 'appConfig',
					keychainService: 'appConfig',
				},
			);
			if (StorageServerAddress) {
				try {
					const serverTimeout = setTimeout(() => {
						Alert.alert(
							'Tempo Esgotado',
							'O servidor demorou mais de 10 segundos para responder! Verifique se ele está funcionando e que sua conexão está estável!',
						);
						router.push('/serverconfig');
					}, 12000);
					axios
						.post(`http://${StorageServerAddress}/user/get`, {
							headers: {
								withCredentials: true,
							},
						})
						.then(USER_LOGIN_RESULT => {
							clearTimeout(serverTimeout);
							setIsLoading(false);
							if (
								USER_LOGIN_RESULT.data === 'ALREADY_LOGGED_IN'
							) {
								router.push('/dashboard');
							} else {
								setServerAddress(StorageServerAddress);
							}
						})
						.catch(err => {
							clearTimeout(serverTimeout);
							Alert.alert(
								`${err}`,
								'Ocorreu um erro! Talvez o servidor não esteja configurado corretamente.',
							);
							router.push('/serverconfig');
						});
				} catch (err) {
					if (err) {
						Alert.alert(
							`${err}`,
							'Ocorreu um erro! Talvez o servidor não esteja configurado corretamente.',
						);
						router.push('/serverconfig');
					}
				}
			} else {
				setIsLoading(false);
			}
		}
		getLogin();
	}, [router, serverAddress, onLoad]);

	return (
		<View style={styles.mainContainer}>
			<Text style={styles.title}>ORDERIFY - Login</Text>
			<View style={styles.container}>
				{isLoading ? (
					<ActivityIndicator
						// eslint-disable-next-line react-native/no-inline-styles
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
					<View>
						<View>
							<Input
								placeholder="Usuário"
								leftIcon={{
									type: 'font-awesome-5',
									solid: true,
									name: 'user',
								}}
								value={login.user}
								onChangeText={user => {
									setLogin({
										user,
										password: login.password,
									});
								}}
							/>
							<Input
								secureTextEntry={true}
								placeholder="Senha"
								leftIcon={{type: 'font-awesome-5', name: 'key'}}
								value={login.password}
								onChangeText={password => {
									setLogin({
										user: login.user,
										password,
									});
								}}
							/>
						</View>
						<Button
							icon={
								<Icon
									name="sign-in-alt"
									type="font-awesome-5"
									size={20}
									color="#00B74A"
								/>
							}
							title=" Entrar"
							buttonStyle={styles.loginButton}
							titleStyle={styles.loginButtonText}
							onPress={() => {
								try {
									axios
										.post(
											`http://${serverAddress}/user/get`,
											{
												user: login.user,
												password: login.password,
												headers: {
													withCredentials: true,
												},
											},
										)
										.then(USER_LOGIN_RESULT => {
											if (
												USER_LOGIN_RESULT.data ===
												'ALREADY_LOGGED_IN'
											) {
												router.push('/dashboard');
											} else if (
												USER_LOGIN_RESULT.data === 'OK'
											) {
												KeyStorage.setItem(
													'user',
													JSON.stringify({
														user: login.user,
														password: '',
													}),
													{
														sharedPreferencesName:
															'userLogin',
														keychainService:
															'userLogin',
													},
												)
													.then(() => {
														router.push(
															'/dashboard',
														);
													})
													.catch(err => {
														console.log(err);
													});
											} else {
												Alert.alert(
													'Erro na Autenticação!',
													'Cheque suas credenciais e verifique se o servidor se encontra ativo!',
												);
											}
										})
										.catch(err => {
											console.log(
												`http://${serverAddress}/user/get`,
											);
											console.log(`ass: ${err}`);
										});
								} catch (error) {
									Alert.alert(
										'Erro',
										'Ocorreu um erro! Talvez o servidor não esteja configurado ou não esteja rodando!',
									);
								}
							}}
						/>
						<View style={styles.serverConfig}>
							<Button
								title="Configurar Servidor"
								buttonStyle={styles.configButton}
								type="clear"
								onPress={() => {
									router.push('/serverconfig');
								}}
							/>
						</View>
					</View>
				)}
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	mainContainer: {
		backgroundColor: '#00B74A',
	},
	container: {
		marginTop: '30%',
		// padding: 10,
		display: 'flex',
		paddingTop: '20%',
		height: '100%',
		borderWidth: 1,
		borderTopLeftRadius: 60,
		borderTopRightRadius: 60,
		borderColor: '#fff',
		backgroundColor: '#fff',
	},
	title: {
		fontSize: 30,
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		alignContent: 'center',
		alignSelf: 'center',
		textAlign: 'center',
		paddingTop: '10%',
		color: '#fff',
	},
	checkbox: {
		color: '#121212',
	},
	loginButton: {
		backgroundColor: '#262626',
		width: '80%',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		alignContent: 'center',
		alignSelf: 'center',
		textAlign: 'center',
	},
	loginButtonText: {
		color: '#00B74A',
	},
	serverConfig: {
		display: 'flex',
		textAlign: 'right',
		alignContent: 'flex-end',
		alignItems: 'flex-end',
		alignSelf: 'flex-end',
		marginTop: '45%',
	},
	configButton: {
		color: '#00B74A',
	},
});
