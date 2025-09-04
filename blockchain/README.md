# Donation Smart Contract

This repository provides a simple Solidity project that demonstrates a donation smart contract deployment and interaction using Hardhat. It allows users to donate ETH and keeps track of the last donation amount.

## 📌 Prerequisites

Ensure you have the following installed before proceeding:

* **Node.js** (v16 or later) - [Download Here](https://nodejs.org/)
* **Yarn** - Install using:

  ```sh
  npm install --global yarn
  ```
* **Metamask** or another Ethereum wallet
* Local Ethereum node (Hardhat Network or Ganache)

## 🚀 Installation & Setup

1. Clone this repository:

   ```sh
   git clone https://github.com/ByteBard7881/Giveon.git
   cd blockchain
   ```

2. Install dependencies:

   ```sh
   yarn install
   ```

3. (Optional) Create a `.env` file if you plan to deploy to a testnet:

   ```sh
   SEPOLIA_RPC_URL="YOUR_SEPOLIA_RPC_URL"
   PRIVATE_KEY="YOUR_WALLET_PRIVATE_KEY"
   ETHERSCAN_API_KEY="YOUR_ETHERSCAN_API_KEY"
   ```

## 🛠️ Compile the Contract

Before deploying, compile the contract to ensure it is valid:

```sh
yarn hardhat compile
```

## 🔗 Deploy the Contract

Deploy the contract to a local network:

```sh
yarn hardhat run scripts/deploy.js --network localhost
```

> After deployment, you should see an output like:

```
[+] Smart contract successfully deployed at: 0xYourContractAddress
```

## ✅ Verifying the Contract on Etherscan (Optional)

If deploying to a testnet and providing an `ETHERSCAN_API_KEY`:

```sh
yarn hardhat verify --network sepolia 0xYourContractAddress
```

## 🏗 Interacting with the Contract

After deployment, you can interact with the contract using Hardhat console:

```sh
yarn hardhat console --network localhost
```

Then inside the console:

```js
const contract = await ethers.getContractAt("Donation", "0xYourContractAddress");

// Donate 0.01 ETH
await contract.donate({ value: ethers.utils.parseEther("0.01") });

// Check the last donation
const lastDonation = await contract.lastDonation();
console.log(`Last Donation: ${lastDonation.toString()}`);
```

## 📜 Contract Overview

* **Donation.sol**
  A simple donation contract in Solidity 0.8.30 that:

  * Accepts ETH donations through the `donate()` function.
  * Stores the last donation amount in `lastDonation`.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.30;

contract Donation {
    uint256 public lastDonation;

    function donate() external payable {
        require(msg.value > 0, "Must send some ETH");
        lastDonation = msg.value;
    }
}
```

## 🛠️ Hardhat Commands Reference

| Command                                                    | Description                                       |
| ---------------------------------------------------------- | ------------------------------------------------- |
| `yarn hardhat compile`                                     | Compiles the Solidity contract                    |
| `yarn hardhat run scripts/deploy.js --network localhost`   | Deploys the contract to local Hardhat network     |
| `yarn hardhat console --network localhost`                 | Opens Hardhat console for contract interaction    |
| `yarn hardhat verify --network sepolia <contract_address>` | Verifies the contract on Etherscan (testnet only) |

## 🔗 Additional Resources

* [Hardhat Documentation](https://hardhat.org/docs/)
* [Solidity Documentation](https://docs.soliditylang.org/)
* [Ethereum Developer Docs](https://ethereum.org/en/developers/)