import { LandNFTToken, GameRewardToken } from './tokens'

async function main() {
    try {
        // Deploy Land NFT token
        const landNFT = await LandNFTToken.create({
            name: 'Bitcoin Farm Land',
            symbol: 'BFLAND',
            decimals: 0,
            totalSupply: 1000,
            baseTokenURI: 'https://api.bitcoinfarm.game/land/',
        })
        console.log('Land NFT deployed:', landNFT.tokenId)

        // Deploy Reward token
        const rewardToken = await GameRewardToken.create({
            name: 'Bitcoin Farm Token',
            symbol: 'BFT',
            decimals: 18,
            totalSupply: 1000000000,
        })
        console.log('Reward token deployed:', rewardToken.tokenId)

        // Log token details
        console.log('\nLand NFT Details:')
        console.log('Name:', landNFT.name)
        console.log('Symbol:', landNFT.symbol)
        console.log('Token URI:', landNFT.tokenURI)

        console.log('\nReward Token Details:')
        console.log('Name:', rewardToken.name)
        console.log('Symbol:', rewardToken.symbol)
        console.log('Decimals:', rewardToken.decimals)
        console.log('Total Supply:', rewardToken.totalSupply)
    } catch (error) {
        console.error('Deployment failed:', error)
    }
}

main()
