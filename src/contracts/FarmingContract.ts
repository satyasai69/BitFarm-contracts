import {
    assert,
    ByteString,
    method,
    prop,
    PubKey,
    Sig,
    SmartContract,
    //  Utils,
} from 'scrypt-ts'

export class FarmingContract extends SmartContract {
    // Growth stage constants
    static readonly EMPTY = 0n
    static readonly SEEDLING = 1n
    static readonly GROWING = 2n
    static readonly MATURE = 3n
    static readonly HARVEST_READY = 4n

    @prop()
    landNFTId: ByteString

    @prop()
    farmer: PubKey

    @prop()
    cropType: bigint

    @prop()
    growthStage: bigint

    @prop()
    lastWatered: bigint

    @prop()
    plantedTime: bigint

    @prop()
    yield: bigint

    constructor(landNFTId: ByteString, farmer: PubKey) {
        super(...arguments)
        this.landNFTId = landNFTId
        this.farmer = farmer
        this.cropType = 0n
        this.growthStage = FarmingContract.EMPTY
        this.lastWatered = 0n
        this.plantedTime = 0n
        this.yield = 0n
    }

    @method()
    public plantCrop(newCropType: bigint, timestamp: bigint, sig: Sig) {
        // Verify farmer's signature
        assert(this.checkSig(sig, this.farmer), 'Invalid signature')

        // Verify plot is empty
        assert(this.growthStage === FarmingContract.EMPTY, 'Plot not empty')

        // Plant new crop
        this.cropType = newCropType
        this.growthStage = FarmingContract.SEEDLING
        this.plantedTime = timestamp
        this.lastWatered = timestamp

        // Final state check
        assert(
            this.cropType == newCropType &&
                this.growthStage == FarmingContract.SEEDLING,
            'Crop not planted correctly'
        )
    }

    @method()
    public waterCrop(timestamp: bigint, sig: Sig) {
        // Verify farmer's signature
        assert(this.checkSig(sig, this.farmer), 'Invalid signature')

        // Verify crop exists
        assert(this.growthStage !== FarmingContract.EMPTY, 'No crop planted')

        // Update watering time
        const oldLastWatered = this.lastWatered
        this.lastWatered = timestamp

        // Progress growth stage if conditions met
        const timeSincePlanted = timestamp - this.plantedTime

        if (timeSincePlanted >= 259200n) {
            // 3 days in seconds
            this.growthStage = FarmingContract.HARVEST_READY
        } else if (timeSincePlanted >= 172800n) {
            // 2 days
            this.growthStage = FarmingContract.MATURE
        } else if (timeSincePlanted >= 86400n) {
            // 1 day
            this.growthStage = FarmingContract.GROWING
        }

        // Final state check
        assert(this.lastWatered > oldLastWatered, 'Watering time not updated')
    }

    @method()
    public harvestCrop(timestamp: bigint, sig: Sig) {
        // Verify farmer's signature
        assert(this.checkSig(sig, this.farmer), 'Invalid signature')

        // Verify crop is ready for harvest
        assert(
            this.growthStage === FarmingContract.HARVEST_READY,
            'Crop not ready for harvest'
        )

        // Calculate yield
        const baseYield = 100n
        const growthTime = timestamp - this.plantedTime
        let wateringBonus: bigint = 0n
        if (this.lastWatered + 86400n > timestamp) {
            wateringBonus = 20n
        }
        this.yield = baseYield + (growthTime / 86400n) * 10n + wateringBonus

        // Reset farming plot
        const oldYield = this.yield
        this.growthStage = FarmingContract.EMPTY
        this.cropType = 0n
        this.plantedTime = 0n
        this.lastWatered = 0n

        // Final state check
        assert(
            this.growthStage == FarmingContract.EMPTY && this.yield == oldYield,
            'Harvest not completed correctly'
        )
    }
}
