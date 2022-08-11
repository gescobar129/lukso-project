import { AppState, Dispatch } from "./store";
import { useContextSelector } from 'use-context-selector'
import { Context } from "react";



export const useWallet = (state: Context<[AppState, Dispatch]>) => useContextSelector(state, (state: [AppState, Dispatch]) => state[0].wallet)

export const useBalance = (state: Context<AppState>) => useContextSelector(state, (state: [AppState, Dispatch]) => state[0].totalBalance)

export const useTransactions = (state: Context<AppState>) => useContextSelector(state, (state: [AppState, Dispatch]) => state[0].transactions)

export const useProfile = (state: Context<AppState>) => useContextSelector(state, (state: [AppState, Dispatch]) => state[0].profile)

export const useNftVault = (state: Context<AppState>) => useContextSelector(state, (state: [AppState, Dispatch]) => state[0].nftVault)

export const useAssetVault = (state: Context<AppState>) => useContextSelector(state, (state: [AppState, Dispatch]) => state[0].assetVault)

export const useAppState = (state: Context<[AppState, Dispatch]>) => useContextSelector(state, (state: [AppState, Dispatch]) => state[0])

export const useDispatch = (state: Context<AppState>) => useContextSelector(state, (state: [AppState, Dispatch]) => state[1])