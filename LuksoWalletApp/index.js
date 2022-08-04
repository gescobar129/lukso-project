/**
 * @format
 */
import './shim.js'
import crypto from 'crypto'
import * as encoding from 'text-encoding';

import { AppRegistry } from 'react-native';
// import App from './App';
import { name as appName } from './app.json';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CreateWallet from './CreateWallet';
import ImportWallet from './ImportWallet';
import Dashboard from './Dashboard';
import Collectibles from './Collectibles';
import RecentActivity from './RecentActivity';
import FAIcon from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';


const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const isSignedIn = false



export default function Project() {
	return (
		<NavigationContainer>
			{isSignedIn ? (
				<Tab.Navigator
					initialRouteName="Dashboard"
					screenOptions={{
						tabBarStyle: {
							borderTopColor: "#191919",
							backgroundColor: "#191919"
						},
						tabBarShowLabel: false,
						tabBarInactiveTintColor: "grey",
						tabBarActiveTintColor: '#FFFFFF',

					}}
				>
					<Tab.Screen
						name="Dashboard"
						component={Dashboard}
						options={{
							headerShown: false,
							tabBarIcon: ({ color }) => (
								<FAIcon name="dollar" color={color} size={25} />
							),
						}}
					/>
					<Tab.Screen
						name="Collectibles"
						component={Collectibles}
						options={{
							title: "Collectibles",
							tabBarIcon: ({ color }) => (
								<MaterialCommunityIcon name="view-grid" color={color} size={30} />
							),
						}}
					/>
					<Tab.Screen
						name="RecentActivity"
						component={RecentActivity}
						options={{
							title: "Recent Activity",
							tabBarIcon: ({ color }) => (
								<FAIcon name="bolt" color={color} size={25} />
							),
						}}
					/>
				</Tab.Navigator>
			) : (
				<Stack.Navigator initialRouteName="ImportWallet">
					<Stack.Screen
						name="CreateWallet"
						component={CreateWallet}
						options={{
							title: "Secret Recovery Phrase",
							headerStyle: {
								backgroundColor: "#1b1c1c"
							}
						}} />
					<Stack.Screen
						name="ImportWallet"
						component={ImportWallet}
						options={{
							headerStyle: {
								backgroundColor: "#1b1c1c",
							},
						}}
					/>
				</Stack.Navigator>
			)}
		</NavigationContainer>
	);
};

AppRegistry.registerComponent(appName, () => Project)

