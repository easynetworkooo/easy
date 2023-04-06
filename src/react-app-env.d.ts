/// <reference types="react-scripts" />

export {}

declare global {
    interface Window {
        ethereum?: any | {
            isMetaMask?: boolean;
            request?: (request: { method: string, params?: any[] }) => Promise<any>;
            on?: (event: string, callback: Function) => void;
            selectedAddress?: string;
            chainId?: string;
        }
    }
}
