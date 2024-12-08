import { ByteString } from 'scrypt-ts'

// Base token interface from CAT Protocol
interface TokenBase {
    readonly tokenId: ByteString
    readonly owner: ByteString
    readonly symbol: string
    readonly name: string
}

// CAT20 base interface
export interface CAT20Token extends TokenBase {
    readonly decimals: number
    readonly totalSupply: number
    balance: number
    transfer(to: ByteString, amount: number): Promise<void>
}

// CAT721 base interface
export interface CAT721Token extends TokenBase {
    readonly tokenURI: string
    transferFrom(
        from: ByteString,
        to: ByteString,
        tokenId: ByteString
    ): Promise<void>
}

// Our custom token interfaces extending CAT Protocol base interfaces
export interface ILandNFTToken extends CAT721Token {
    soilQuality: number
    waterAccess: number
    location: ByteString
    size: number
}

export interface IRewardToken extends CAT20Token {
    stakingBalance: number
    stakingTimestamp: number
}

export interface ITokenMetadata {
    name: string
    symbol: string
    decimals: number
    totalSupply: number
    baseTokenURI?: string
}
