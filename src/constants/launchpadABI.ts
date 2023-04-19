export const launchpadABI: any =
    [{"inputs": [], "name": "InsufficientAllowance", "type": "error"}, {
        "inputs": [],
        "name": "InvalidAddress",
        "type": "error"
    }, {"inputs": [], "name": "InvalidSignature", "type": "error"}, {
        "inputs": [],
        "name": "UsedSignature",
        "type": "error"
    }, {"inputs": [], "name": "WrongCaller", "type": "error"}, {
        "anonymous": false,
        "inputs": [{"indexed": true, "internalType": "address", "name": "caller", "type": "address"}, {
            "indexed": true,
            "internalType": "address",
            "name": "_address",
            "type": "address"
        }],
        "name": "AdministratorAdded",
        "type": "event"
    }, {
        "anonymous": false,
        "inputs": [{"indexed": true, "internalType": "address", "name": "caller", "type": "address"}, {
            "indexed": true,
            "internalType": "address",
            "name": "_address",
            "type": "address"
        }],
        "name": "AdministratorRemoved",
        "type": "event"
    }, {
        "anonymous": false,
        "inputs": [{"indexed": false, "internalType": "uint8", "name": "version", "type": "uint8"}],
        "name": "Initialized",
        "type": "event"
    }, {
        "anonymous": false,
        "inputs": [{
            "indexed": true,
            "internalType": "address",
            "name": "previousOwner",
            "type": "address"
        }, {"indexed": true, "internalType": "address", "name": "newOwner", "type": "address"}],
        "name": "OwnershipTransferred",
        "type": "event"
    }, {
        "anonymous": false,
        "inputs": [{"indexed": false, "internalType": "address", "name": "account", "type": "address"}],
        "name": "Paused",
        "type": "event"
    }, {
        "anonymous": false,
        "inputs": [{"indexed": true, "internalType": "address", "name": "owner", "type": "address"}, {
            "indexed": true,
            "internalType": "address",
            "name": "tokenAddress",
            "type": "address"
        }, {
            "indexed": true,
            "internalType": "address",
            "name": "launchpadAddress",
            "type": "address"
        }, {"indexed": false, "internalType": "uint256", "name": "proxyIndex", "type": "uint256"}],
        "name": "TokenLaunchpadCreated",
        "type": "event"
    }, {
        "anonymous": false,
        "inputs": [{"indexed": false, "internalType": "address", "name": "account", "type": "address"}],
        "name": "Unpaused",
        "type": "event"
    }, {
        "anonymous": false,
        "inputs": [{"indexed": true, "internalType": "address", "name": "caller", "type": "address"}, {
            "indexed": true,
            "internalType": "address",
            "name": "_newBeaconAddress",
            "type": "address"
        }],
        "name": "UpdateBeaconAddress",
        "type": "event"
    }, {
        "anonymous": false,
        "inputs": [{"indexed": true, "internalType": "address", "name": "caller", "type": "address"}, {
            "indexed": true,
            "internalType": "address",
            "name": "_feeAddress",
            "type": "address"
        }],
        "name": "UpdateFeeAddress",
        "type": "event"
    }, {
        "anonymous": false,
        "inputs": [{"indexed": true, "internalType": "address", "name": "caller", "type": "address"}, {
            "indexed": true,
            "internalType": "address",
            "name": "_serviceAddress",
            "type": "address"
        }],
        "name": "UpdateServiceAddress",
        "type": "event"
    }, {
        "inputs": [{"internalType": "address", "name": "address_", "type": "address"}],
        "name": "addAdministrator",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }, {
        "inputs": [{
            "components": [{"internalType": "address", "name": "owner", "type": "address"}, {
                "internalType": "address",
                "name": "tokenAddress",
                "type": "address"
            }, {"internalType": "address", "name": "fundsPaymentToken", "type": "address"}, {
                "internalType": "uint256",
                "name": "depositTokenAmount",
                "type": "uint256"
            }, {"internalType": "uint256", "name": "lockingTokenAmount", "type": "uint256"}, {
                "internalType": "uint256",
                "name": "nonce",
                "type": "uint256"
            }, {
                "components": [{
                    "internalType": "uint32",
                    "name": "earlyPhaseStart",
                    "type": "uint32"
                }, {"internalType": "uint32", "name": "earlyPhaseEnd", "type": "uint32"}, {
                    "internalType": "uint32",
                    "name": "vestingStart",
                    "type": "uint32"
                }, {"internalType": "uint32", "name": "vestingDuration", "type": "uint32"}, {
                    "internalType": "uint32",
                    "name": "tokenLockDeadline",
                    "type": "uint32"
                }], "internalType": "struct TokenLaunchpadTimeFrames", "name": "timeFrames", "type": "tuple"
            }, {"internalType": "uint16", "name": "easyFee", "type": "uint16"}, {
                "internalType": "uint8",
                "name": "vestingPercent",
                "type": "uint8"
            }, {"internalType": "uint8", "name": "vestingTGE", "type": "uint8"}, {
                "internalType": "bytes",
                "name": "signature",
                "type": "bytes"
            }], "internalType": "struct CreateTokenLaunchpad", "name": "voucher", "type": "tuple"
        }], "name": "createTokenLaunchpad", "outputs": [], "stateMutability": "nonpayable", "type": "function"
    }, {
        "inputs": [],
        "name": "feeAddress",
        "outputs": [{"internalType": "address", "name": "", "type": "address"}],
        "stateMutability": "view",
        "type": "function"
    }, {
        "inputs": [],
        "name": "getBeacon",
        "outputs": [{"internalType": "address", "name": "", "type": "address"}],
        "stateMutability": "view",
        "type": "function"
    }, {
        "inputs": [],
        "name": "getBeaconImplementation",
        "outputs": [{"internalType": "address", "name": "", "type": "address"}],
        "stateMutability": "view",
        "type": "function"
    }, {
        "inputs": [],
        "name": "getChainId",
        "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
        "stateMutability": "view",
        "type": "function"
    }, {
        "inputs": [{"internalType": "uint256", "name": "_tokenLaunchpadIndex", "type": "uint256"}],
        "name": "getLaunchpadByIndex",
        "outputs": [{"internalType": "address", "name": "", "type": "address"}],
        "stateMutability": "view",
        "type": "function"
    }, {
        "inputs": [{"internalType": "address", "name": "tokenAddress", "type": "address"}],
        "name": "getLaunchpadByTokenAddress",
        "outputs": [{"internalType": "address", "name": "", "type": "address"}],
        "stateMutability": "view",
        "type": "function"
    }, {
        "inputs": [],
        "name": "getLaunchpadsCount",
        "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
        "stateMutability": "view",
        "type": "function"
    }, {
        "inputs": [{"internalType": "address", "name": "beaconAddress_", "type": "address"}, {
            "internalType": "address",
            "name": "feeAddress_",
            "type": "address"
        }, {"internalType": "address", "name": "serviceAddress_", "type": "address"}],
        "name": "initialize",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }, {
        "inputs": [],
        "name": "owner",
        "outputs": [{"internalType": "address", "name": "", "type": "address"}],
        "stateMutability": "view",
        "type": "function"
    }, {
        "inputs": [],
        "name": "pause",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }, {
        "inputs": [],
        "name": "paused",
        "outputs": [{"internalType": "bool", "name": "", "type": "bool"}],
        "stateMutability": "view",
        "type": "function"
    }, {
        "inputs": [],
        "name": "renounceOwnership",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }, {
        "inputs": [],
        "name": "serviceAddress",
        "outputs": [{"internalType": "address", "name": "", "type": "address"}],
        "stateMutability": "view",
        "type": "function"
    }, {
        "inputs": [{"internalType": "address", "name": "newOwner", "type": "address"}],
        "name": "transferOwnership",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }, {
        "inputs": [],
        "name": "unpause",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }, {
        "inputs": [{"internalType": "address", "name": "newBeacon_", "type": "address"}],
        "name": "updateBeaconAddress",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }, {
        "inputs": [{"internalType": "address", "name": "_newFeeAddress", "type": "address"}],
        "name": "updateFeeAddress",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }, {
        "inputs": [{"internalType": "address", "name": "_serviceAddress", "type": "address"}],
        "name": "updateServiceAddress",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }]
