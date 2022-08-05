import { AppState } from "./store";
import { useContextSelector } from 'use-context-selector'
import { Context } from "react";

export const useWallet = (state: Context<AppState>) => useContextSelector(state, (state: AppState) => state.wallet)

export const useBalance = (state: Context<AppState>) => useContextSelector(state, (state: AppState) => state.totalBalance)

export const useTransactions = (state: Context<AppState>) => useContextSelector(state, (state: AppState) => state.transactions)