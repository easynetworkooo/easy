export interface IWallet {
    isWalletConnected: boolean
    address: string
    networkId: bigint
    networkType: string
    balance: bigint
}

export interface ProviderRpcError {
    message: string;
    code: number;
    data?: unknown;
}
