import React, {useState} from 'react';
import {StyleSheet, View, AppRegistry} from 'react-native';
import {Appearance} from 'react-native-appearance';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Header} from 'react-native-elements';
import {name as appName} from './app.json';
import {NativeRouter, Route} from 'react-router-native';
import axios from 'axios';

import Login from './screens/Login';
import AppConfig from './screens/AppConfig';
import Dashboard from './screens/Dashboard/index';

Appearance.set({colorScheme: 'light'});
axios.defaults.withCredentials = true;

const App = () => {
	const [isAtLogin, setIsAtLogin] = useState(false);
	const [currentPage, setCurrentPage] = useState('');
	return (
		<SafeAreaProvider>
			<NativeRouter>
				{!isAtLogin ? (
					<Header
						backgroundColor="#00B74A"
						placement="left"
						leftComponent={{
							text: `ORDERBYTE - ${currentPage}`,
							style: {color: '#fff', fontSize: 15},
						}}
						rightComponent={{
							icon: 'utensils',
							type: 'font-awesome-5',
							color: '#fff',
						}}
					/>
				) : (
					<View />
				)}
				<View style={styles.container}>
					<Route
						exact
						path="/"
						children={
							<Login
								onLoad={() => {
									setIsAtLogin(true);
								}}
							/>
						}
					/>
					<Route
						exact
						path="/serverconfig"
						children={
							<AppConfig
								onLoad={() => {
									setIsAtLogin(false);
									setCurrentPage('Configurações');
								}}
							/>
						}
					/>
					<Route
						exact
						path="/dashboard"
						children={
							<Dashboard
								onLoad={() => {
									setIsAtLogin(false);
									setCurrentPage('Início');
								}}
							/>
						}
					/>
				</View>
			</NativeRouter>
		</SafeAreaProvider>
	);
};

const styles = StyleSheet.create({
	container: {
		padding: 0,
		paddingTop: 0,
		paddingBottom: 0,
		backgroundColor: '#fff',
	},
});

AppRegistry.registerComponent(appName, () => App);
