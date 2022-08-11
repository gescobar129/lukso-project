/**
 * @format
 */
import './shim.js'
import crypto from 'crypto'
import * as encoding from 'text-encoding';

import { AppRegistry, TouchableOpacity } from 'react-native';
// import App from './App';
import { name as appName } from './app.json';
import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CreateWallet from './CreateWallet';
import ImportWallet from './ImportWallet';
import Dashboard from './Dashboard';
import Collectibles from './Collectibles';
import RecentActivity from './RecentActivity';
import SelectToken from './SelectToken'
import WalletAddress from './WalletAddress'
import FAIcon from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-community/async-storage';

import { initialState, store } from './store';
import { useAppInitialized, useAppState, useAssetVault, useBalance, useDispatch, useNftVault, useProfile, useTransactions, useWallet } from './hooks';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();


export default function App() {
  const dispatch = useDispatch(store)
  const appstate = useAppState(store)
  const profile = useProfile(store)
  const nftVault = useNftVault(store)
  const assetVault = useAssetVault(store)



  useEffect(() => {
    AsyncStorage.getItem('APP_STATE').then((appstate) => {
      if (appstate) {
        dispatch({
          type: 'set_appstate',
          appstate: { ...JSON.parse(appstate), appInitialized: true }
        })
      } else {
        dispatch({
          type: 'set_appinitialized',
          appInitialized: true
        })
      }
    })
  }, [])

  useEffect(() => {
    if (JSON.stringify(appstate) !== JSON.stringify(initialState)) {
      AsyncStorage.setItem('APP_STATE', JSON.stringify({ ...appstate }))
    }
  }, [appstate])


  function HomeTabs() {
    return (
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
    )
  }
  return (

    <NavigationContainer>
      {profile && assetVault && nftVault ? (
        <Stack.Navigator initialRouteName="HomeTabs">
          <Stack.Screen
            name="HomeTabs"
            component={HomeTabs}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Group
            screenOptions={{
              presentation: "modal"
            }}>
            <Stack.Screen
              name="SelectToken"
              component={SelectToken}
              options={({ navigation }) => {
                return {
                  title: 'Select Token',
                  headerTitleStyle: {
                    color: "#FFFFFF"
                  },
                  headerLeft: () => {
                    return (
                      <TouchableOpacity onPress={() => navigation.goBack()}>
                        <MaterialCommunityIcon name="window-close" color={"#FFFFFF"} size={20} />
                      </TouchableOpacity>
                    )
                  },
                  headerStyle: {
                    backgroundColor: "#262626",
                  },
                }
              }}
            />
            <Stack.Screen
              name="WalletAddress"
              component={WalletAddress}
              options={({ navigation }) => {
                return {
                  title: 'Send',
                  headerTitleStyle: {
                    color: "#FFFFFF"
                  },
                  headerLeft: () => {
                    return (
                      <TouchableOpacity onPress={() => navigation.goBack()}>
                        <MaterialCommunityIcon name="keyboard-backspace" color={"#FFFFFF"} size={20} />
                      </TouchableOpacity>
                    )
                  },
                  headerStyle: {
                    backgroundColor: "#262626",
                  },
                }
              }
              }
            />
          </Stack.Group>
        </Stack.Navigator>
      ) : (
        <Stack.Navigator initialRouteName="CreateWallet">
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

