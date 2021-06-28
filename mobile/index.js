import React from 'react';
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
	return (
		<SafeAreaProvider>
			<NativeRouter>
				<Header
					backgroundColor="#00B74A"
					placement="left"
					leftComponent={{
						text: 'ORDERIFY',
						style: {color: '#fff', fontSize: 15},
					}}
					rightComponent={{
						icon: 'utensils',
						type: 'font-awesome-5',
						color: '#fff',
					}}
				/>
				<View style={styles.container}>
					<Route exact path="/" component={Login} />
					<Route exact path="/serverconfig" component={AppConfig} />
					<Route exact path="/dashboard" component={Dashboard} />
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
