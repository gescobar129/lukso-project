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
import { StateProvider } from './store';
import App from './App';


export default function Project() {
	return (
		<StateProvider>
			<App />
		</StateProvider>
	);
};

AppRegistry.registerComponent(appName, () => Project)
