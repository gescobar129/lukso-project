import keystore, { KeystoreEnum } from './keystore';
import _ from 'lodash';
import { walletWithKey } from '../types';

export type AuthDataType = Record<string, walletWithKey> | undefined;

export const getAuthData = async (): Promise<AuthDataType> => {
	const authData = await keystore.read(KeystoreEnum.AuthData);

	let jsonData: AuthDataType = {};

	if (_.some(authData)) {
		jsonData = JSON.parse(authData);
	}

	return jsonData;
};

export const getAuthDataValue = async (
	walletName: string,
): Promise<walletWithKey | undefined> => {
	const authData = await getAuthData();

	return authData && authData[walletName];
};

export const setAuthData = ({
	authData,
}: {
	authData: AuthDataType;
}): boolean => {
	return keystore.write(KeystoreEnum.AuthData, JSON.stringify(authData));
};

export const upsertAuthData = async ({
	authData,
}: {
	authData: AuthDataType;
}): Promise<boolean> => {
	const oriData = await getAuthData();

	const update = { ...oriData, ...authData };
	return setAuthData({ authData: update });
};

export const removeAuthData = async (walletName: string): Promise<boolean> => {
	const oriData = await getAuthData();

	const omittedData = _.omit(oriData, walletName);
	return setAuthData({ authData: omittedData });
};