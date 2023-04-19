export interface ITimeFrames {
    earlyPhaseStart: number,
    earlyPhaseEnd: number,
    vestingStart: number,
    vestingDuration: number,
    tokenLockDeadline: number,
}

export interface ILaunchpad {
    owner: string,
    tokenAddress: string,
    fundsPaymentToken: string,
    depositTokenAmount: number,
    lockingTokenAmount: number,
    nonce: number,
    timeFrames: ITimeFrames,
    easyFee: number,
    vestingPercent: number,
    vestingTGE: number,
}

