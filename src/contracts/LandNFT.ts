import {
    assert,
    ByteString,
    // hash256,
    method,
    prop,
    PubKey,
    Sig,
    SmartContract,
    // Utils,
} from 'scrypt-ts'

export class LandNFT extends SmartContract {
    @prop()
    owner: PubKey

    @prop()
    landId: ByteString

    @prop()
    coordinateX: bigint

    @prop()
    coordinateY: bigint

    @prop()
    size: bigint

    @prop()
    soilQuality: bigint

    @prop()
    waterAccess: bigint

    @prop()
    climateZone: bigint

    constructor(
        owner: PubKey,
        landId: ByteString,
        coordinateX: bigint,
        coordinateY: bigint,
        size: bigint,
        soilQuality: bigint,
        waterAccess: bigint,
        climateZone: bigint
    ) {
        super(...arguments)
        this.owner = owner
        this.landId = landId
        this.coordinateX = coordinateX
        this.coordinateY = coordinateY
        this.size = size
        this.soilQuality = soilQuality
        this.waterAccess = waterAccess
        this.climateZone = climateZone
    }

    @method()
    public transfer(newOwner: PubKey, sig: Sig) {
        // Verify current owner's signature
        assert(this.checkSig(sig, this.owner), 'Invalid signature')

        // Update owner
        this.owner = newOwner

        // Final state check
        assert(this.owner == newOwner, 'Owner not updated')
    }

    @method()
    public upgradeLand(
        newSoilQuality: bigint,
        newWaterAccess: bigint,
        sig: Sig
    ) {
        // Verify owner's signature
        assert(this.checkSig(sig, this.owner), 'Invalid signature')

        // Validate new properties
        assert(newSoilQuality <= 100n, 'Invalid soil quality')
        assert(newWaterAccess <= 100n, 'Invalid water access')

        // Update properties
        this.soilQuality = newSoilQuality
        this.waterAccess = newWaterAccess

        // Final state check
        assert(
            this.soilQuality == newSoilQuality &&
                this.waterAccess == newWaterAccess,
            'Properties not updated'
        )
    }

    @method()
    public checkLandStatus() {
        // Verify land exists and is valid
        assert(this.size > 0n, 'Invalid land size')
        assert(this.soilQuality <= 100n, 'Invalid soil quality')
        assert(this.waterAccess <= 100n, 'Invalid water access')
    }
}
