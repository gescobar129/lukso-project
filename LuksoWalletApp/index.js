/**
 * @format
 */

import './shim.js'
import crypto from 'crypto'
import * as encoding from 'text-encoding';



import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import { createAndDeployUniversalProfile } from './utils/lukso';

createAndDeployUniversalProfile({
	controllerAddresses: ["0x508fe8e6494B144acDF62110Aef01A11EcfFbf7f"], // our EOA that will be controlling the UP
	lsp3Profile: {
		name: 'My Universal Profile',
		description: 'My Cool Universal Profile',
		tags: ['Public Profile'],
		links: [
			{
				title: 'My Website',
				url: 'https://my-website.com',
			},
		],
	},
})

AppRegistry.registerComponent(appName, () => App);
