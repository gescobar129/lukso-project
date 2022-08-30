/**
 * @format
 */
import './shim.js';
import crypto from 'crypto';
import * as encoding from 'text-encoding';

import {AppRegistry} from 'react-native';
// import App from './App';
import {name as appName} from './app.json';
import * as React from 'react';
import {StateProvider} from './store';
import * as eva from '@eva-design/eva';
import {ApplicationProvider, Layout, Text} from '@ui-kitten/components';
import App from './App';

export default function Project() {
  return (
    <ApplicationProvider {...eva} theme={eva.dark}>
      <StateProvider>
        <App />
      </StateProvider>
    </ApplicationProvider>
  );
}

AppRegistry.registerComponent(appName, () => Project);
