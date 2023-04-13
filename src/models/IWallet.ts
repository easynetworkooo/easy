export interface IWallet {
    isWalletConnected: boolean
    addresses: string[]
    address: string
    networkId: number
    networkType: string
    chainId: number
    balance: number
}

export interface ProviderRpcError {
    message: string;
    code: number;
    data?: unknown;
}
