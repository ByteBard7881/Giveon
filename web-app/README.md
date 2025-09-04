# Donation Web Application

This repository contains the React frontend for the donation platform. It integrates with the Ethereum smart contract and the Java backend to provide a seamless donation experience.

## 📌 Prerequisites

Ensure you have the following installed before proceeding:

* **Node.js** (v16 or later) - [Download Here](https://nodejs.org/)
* **npm** (comes with Node.js)
* Optional: **IDE** (VS Code, WebStorm, etc.)

## 🚀 Installation & Setup

1. Clone this repository:

```sh
git clone https://github.com/ByteBard7881/Giveon.git
cd web-app
```

2. Install dependencies:

```sh
npm install
```

3. Start the development server:

```sh
npm start
```

> The app will run at `http://localhost:3000` by default.

## 🏗 Project Structure

```
web-app/
├── public/              
├── src/
│   ├── assets/          
│   ├── contractJson/    
│   │   └── Donation.json
│   ├── form/
│   │   ├── Form.jsx
│   │   └── Form.css
│   ├── home/       
│   │   ├── Home.jsx
│   │   └── Home.css
│   ├── App.jsx
│   └── main.jsx
└── package.json
```

## 📜 Features

* **Home Page**
  Displays navigation, donation button, and sponsors/partners section.

* **Donation Form**
  Popup form for users to submit donation information, integrated with the backend API.

* **Smart Contract Integration**
  Uses `Donation.json` for interacting with the deployed Ethereum donation contract.

* **Sponsors & Partners**
  Displays sponsor logos using FontAwesome icons.

* **CORS Support**
  Compatible with backend API running on `http://localhost:8080`.

## 🔗 Backend Integration

* Ensure the backend server is running at `http://localhost:8080`.
* Donation form sends `POST` requests to `/donate` endpoint with the following JSON payload:

```json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "phone": "1234567890",
  "amount": "0.05",
  "walletAddress": "0x123abc...",
  "transactionHash": "0xabc123..."
}
```

## 🛠️ npm Commands Reference

| Command         | Description                    |
| --------------- | ------------------------------ |
| `npm install`   | Install project dependencies   |
| `npm start`     | Start the development server   |
| `npm run build` | Build the production-ready app |
| `npm test`      | Run tests (if implemented)     |

## 🔗 Additional Resources

* [React Documentation](https://reactjs.org/docs/getting-started.html)
* [React Router Documentation](https://reactrouter.com/)
* [FontAwesome React Documentation](https://fontawesome.com/v5/docs/web/use-with/react)
* [Ethers.js Documentation](https://docs.ethers.io/v5/)
