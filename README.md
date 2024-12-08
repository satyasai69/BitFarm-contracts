# Bitcoin Farm Metaverse

A decentralized farming metaverse game built on Bitcoin using Fractal Bitcoin (FBT) technology.

## Overview

Bitcoin Farm Metaverse is an immersive farming simulation game where players can own land, farm crops, and earn rewards in a decentralized virtual world. The game combines NFT land ownership with play-to-earn mechanics, all powered by Bitcoin's blockchain.

## Key Features

- 🌎 Virtual Land Ownership (CAT-721 NFTs)
- 🌾 Farming Mechanics
- 💰 Play-to-Earn Rewards (CAT-20 Tokens)
- 🏪 Marketplace Integration
- 👥 Multiplayer Interactions

## Technology Stack

### Blockchain

- Bitcoin Network
- Fractal Bitcoin (FBT) for recursive inscriptions
- CAT-721 for Land NFTs
- CAT-20 for Reward Tokens
- Unisat Marketplace Integration

### Game Development

- Phaser.js 3 for game engine
- Tiled Map Editor for level design
- Texture Packer for sprite management
- WebGL renderer

### Frontend

- React.js for UI components
- TypeScript
- Tailwind CSS for styling
- Web3.js for blockchain interactions

### Backend

- Node.js
- Express.js
- MongoDB for game state
- WebSocket for real-time updates
- Socket.io for multiplayer features

### Smart Contracts

- Bitcoin Script
- sCrypt for smart contract development
- cat-sdk for CAT Protocol

## Getting Started

### Prerequisites

```bash
# Install Node.js (v16 or higher)
# Install MongoDB
# Install Tiled Map Editor (for level design)
```

### Installation

```bash
# Clone the repository
git clone [repository-url] or npx scrypt-cli project helloworld

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env

# Start development server
npm run dev
```

## Game Development

### Game Features

- Tile-based world map
- Character animations
- Crop planting and harvesting mechanics
- Day/night cycle
- Weather system
- Inventory management
- Player interactions

### Asset Structure

```
assets/
├── maps/          # Tiled map files
├── sprites/       # Character and item sprites
├── tilesets/      # Game world tilesets
└── audio/         # Sound effects and music
```

## Farming Mechanics

### Land System

- Each land NFT (CAT-721) has unique properties:
  - Soil Quality (affects crop growth speed)
  - Water Access (determines irrigation needs)
  - Climate Zone (influences suitable crops)
  - Size (determines planting capacity)

### Crop Management

1. Planting

   - Different seed types for various crops
   - Seasonal planting restrictions
   - Soil preparation requirements

2. Growing

   - Growth stages (seedling, mature, harvest-ready)
   - Weather effects on growth
   - Disease and pest management
   - Watering and fertilizing mechanics

3. Harvesting
   - Optimal harvest timing
   - Crop quality factors
   - Harvest tool requirements
   - Yield calculations

### Resource Management

- Tools and Equipment

  - Basic tools (hoe, watering can, etc.)
  - Advanced machinery (tractors, harvesters)
  - Tool durability and maintenance

- Resources
  - Seeds
  - Water
  - Fertilizers
  - Energy points

### Reward System

- Daily farming tasks rewards
- Harvest quality bonuses
- Special event multipliers
- Community farming benefits

## Smart Contract System

### Land NFT Contract (CAT-721)

```typescript
// Core functionalities
- mintLand(): Create new land parcels
- transferLand(): Transfer ownership
- upgradeLand(): Improve land properties
- checkLandStatus(): View land attributes

// Land Properties
- coordinates: Position in game world
- size: Plot dimensions
- attributes: Soil, water, climate data
- improvements: Added features
```

### Farming Contract

```typescript
// Farming Operations
- plantCrop(): Start growing process
- waterCrop(): Maintain growth
- harvestCrop(): Collect yields
- calculateRewards(): Determine earnings

// State Management
- growthStages: Track crop progress
- weatherEffects: Environmental impacts
- yieldCalculations: Harvest amounts
```

### Reward Token Contract (CAT-20)

```typescript
// Token Economics
- mintRewards(): Generate farming rewards
- distributeTokens(): Send to farmers
- stakeTokens(): Lock for benefits
- tradeTokens(): Exchange in marketplace

// Reward Mechanics
- baseRewards: Standard earnings
- bonusMultipliers: Extra incentives
- stakingBenefits: Holding rewards
```

## Smart Contract Development

### Compile Contracts

```bash
npx scrypt-cli compile
```

### generate a Bitcoin key

```bash
npm run genprivkey
```

### Deploy Contracts

```bash
npx ts-node deploy.ts
```

## Game Architecture

### Land NFTs (CAT-721)

- Unique land parcels with properties
- Coordinates system
- Terrain types
- Farming capacity

### Reward Tokens (CAT-20)

- In-game currency
- Farming rewards
- Trading capabilities

### Farming Mechanics

- Crop planting
- Growth cycles
- Harvesting
- Resource management

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Contact

- Website: []
- Twitter: []
- Discord: []

## Acknowledgments

- Bitcoin Community
- Fractal Bitcoin Team
- sCrypt Team
- Unisat Marketplace
- Phaser.js Community
