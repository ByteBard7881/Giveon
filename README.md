# Giveon: ETH Donation Platform

Giveon is a full-stack donation platform that allows users to contribute Ethereum (ETH) and stores donation data in a backend database. This project combines a **Solidity smart contract**, a **Java backend server**, and a **React frontend** for a complete donation experience.

## 📂 Project Structure

```
Giveon/
├── blockchain/
├── server/    
└── web-app/   
```

---

## 1️⃣ Blockchain: Ethereum Smart Contract

The `blockchain/` folder contains the donation smart contract written in Solidity and managed using Hardhat.

### Features

* Accept ETH donations
* Store the last donation amount
* Lightweight and easy to integrate with frontend

### Getting Started

```sh
npm install --global yarn
cd blockchain
yarn install
yarn hardhat compile
yarn hardhat run scripts/deploy.js --network localhost
```

> Optional: Deploy to Sepolia testnet using your wallet and RPC URL.

### Contract Overview

**Donation.sol**

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

### Resources

* [Hardhat Documentation](https://hardhat.org/docs/)
* [Solidity Documentation](https://docs.soliditylang.org/)

---

## 2️⃣ Server: Java Backend

The `server/` folder contains a Java HTTP server that handles donation submissions and stores data in PostgreSQL.

### Features

* Handles `POST /donate` requests
* Stores donation records:

  * First name, Last name
  * Email, Phone
  * Amount in ETH
  * Wallet address
  * Transaction hash
* CORS enabled for frontend requests

### Getting Started

```sh
cd server/Main
javac -cp postgresql-42.7.6.jar Main.java
java -cp .:postgresql-42.7.6.jar Main
```

> Server runs on `http://localhost:8080`.

### Database Schema

| Column            | Type |
| ----------------- | ---- |
| first\_name       | TEXT |
| last\_name        | TEXT |
| email             | TEXT |
| phone             | TEXT |
| amount\_eth       | TEXT |
| wallet\_address   | TEXT |
| transaction\_hash | TEXT |

---

## 3️⃣ Web-App: React Frontend

The `web-app/` folder contains a React application that allows users to view information and submit donations.

### Features

* Home page with navigation and sponsor logos
* Popup donation form integrated with backend
* Interaction with deployed Ethereum donation contract
* Uses FontAwesome for icons and visual elements

### Getting Started

```sh
cd web-app
npm install
npm start
```

> App runs at `http://localhost:3000`.

### Folder Structure

```
web-app/
├── public/
├── src/
│   ├── assets/
│   ├── contractJson/    # Donation.json for smart contract
│   ├── form/            # Form.jsx, Form.css
│   ├── home/            # Home.jsx, Home.css
│   ├── App.jsx
│   └── main.jsx
└── package.json
```

---

## 🔗 How It Works

1. User opens the **React frontend** and fills out the donation form.
2. Donation ETH is sent to the **Ethereum smart contract**.
3. Donation details are submitted to the **Java backend**, which saves them in **PostgreSQL**.
4. Both the frontend and backend maintain real-time interaction for user feedback.

---

## 🛠️ Full Project Commands

| Folder     | Command                                     | Description                     |
| ---------- | ------------------------------------------- | ------------------------------- |
| blockchain | `yarn hardhat compile`                       | Compile smart contracts         |
| blockchain | `yarn hardhat run scripts/deploy.js --network localhost`         | Deploy contract (local/testnet) |
| server     | `javac -cp postgresql-42.7.6.jar Main.java` | Compile Java server             |
| server     | `java -cp .:postgresql-42.7.6.jar Main`     | Run backend server              |
| web-app    | `npm install`                               | Install frontend dependencies   |
| web-app    | `npm run dev`                                 | Run frontend server             |

---

## 🔗 Additional Resources

* [React Documentation](https://reactjs.org/docs/getting-started.html)
* [Ethers.js Documentation](https://docs.ethers.io/v5/)
* [PostgreSQL Documentation](https://www.postgresql.org/docs/)
* [Hardhat Documentation](https://hardhat.org/docs/)