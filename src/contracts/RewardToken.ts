import {
    assert,
    // ByteString,
    method,
    prop,
    PubKey,
    Sig,
    SmartContract,
    // Utils,
    // hash256,
} from 'scrypt-ts'

export class RewardToken extends SmartContract {
    @prop()
    owner: PubKey

    @prop()
    totalSupply: bigint

    @prop()
    tokenBalance: bigint

    @prop()
    stakingBalance: bigint

    @prop()
    stakingTimestamp: bigint

    // Staking rewards configuration
    static readonly MIN_STAKE_TIME = 604800n // 7 days in seconds
    static readonly STAKE_REWARD_RATE = 5n // 5% annual reward rate

    constructor(owner: PubKey, initialSupply: bigint) {
        super(...arguments)
        this.owner = owner
        this.totalSupply = initialSupply
        this.tokenBalance = initialSupply
        this.stakingBalance = 0n
        this.stakingTimestamp = 0n
    }

    @method()
    public transfer(to: PubKey, amount: bigint, sig: Sig) {
        // Verify sender's signature
        assert(this.checkSig(sig, this.owner), 'Invalid signature')

        // Check balance
        assert(this.tokenBalance >= amount, 'Insufficient balance')
        assert(to !== this.owner, 'Cannot transfer to self')

        // Update balances
        const oldBalance = this.tokenBalance
        this.tokenBalance -= amount

        // Final state check
        assert(
            this.tokenBalance == oldBalance - amount,
            'Balance not updated correctly'
        )
    }

    @method()
    public mintRewards(amount: bigint, sig: Sig) {
        // Only owner can mint rewards
        assert(this.checkSig(sig, this.owner), 'Not authorized to mint')

        // Update total supply and balance
        const oldSupply = this.totalSupply
        const oldBalance = this.tokenBalance

        this.totalSupply += amount
        this.tokenBalance += amount

        // Final state check
        assert(
            this.totalSupply == oldSupply + amount &&
                this.tokenBalance == oldBalance + amount,
            'Minting failed'
        )
    }

    @method()
    public stake(amount: bigint, timestamp: bigint, sig: Sig) {
        // Verify staker's signature
        assert(this.checkSig(sig, this.owner), 'Invalid signature')

        // Check balance
        assert(this.tokenBalance >= amount, 'Insufficient balance for staking')

        // Update balances
        const oldBalance = this.tokenBalance
        const oldStakingBalance = this.stakingBalance

        this.tokenBalance -= amount
        this.stakingBalance += amount
        this.stakingTimestamp = timestamp

        // Final state check
        assert(
            this.tokenBalance == oldBalance - amount &&
                this.stakingBalance == oldStakingBalance + amount,
            'Staking failed'
        )
    }

    @method()
    public unstake(timestamp: bigint, sig: Sig) {
        // Verify staker's signature
        assert(this.checkSig(sig, this.owner), 'Invalid signature')

        // Check staking conditions
        assert(this.stakingBalance > 0n, 'No tokens staked')
        assert(
            timestamp - this.stakingTimestamp >= RewardToken.MIN_STAKE_TIME,
            'Minimum stake time not met'
        )

        // Calculate rewards
        const stakingDuration = timestamp - this.stakingTimestamp
        const annualReward =
            (this.stakingBalance * RewardToken.STAKE_REWARD_RATE) / 100n
        const rewards = (annualReward * stakingDuration) / 31536000n

        // Update balances
        const oldBalance = this.tokenBalance
        const stakedAmount = this.stakingBalance

        this.tokenBalance += stakedAmount + rewards
        this.stakingBalance = 0n
        this.stakingTimestamp = 0n
        this.totalSupply += rewards

        // Final state check
        assert(
            this.tokenBalance == oldBalance + stakedAmount + rewards &&
                this.stakingBalance == 0n,
            'Unstaking failed'
        )
    }
}
