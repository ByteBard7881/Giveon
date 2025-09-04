import React, { useState } from "react";
import "./Form.css";
import { ethers } from "ethers";
import abi from "../contractJson/Donation.json";
import axios from "axios";

const CONTRACT_ADDRESS = "0xe7B0AC97f9Ff8f47122Ab0AfF39448Fd31f0Ae19";
const CONTRACT_ABI = abi.abi;

function Form({ onClose }) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    amount: "0.001",
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      if (!window.ethereum) {
        alert("MetaMask not detected! Please install MetaMask.");
        return;
      }

      const provider = new ethers.BrowserProvider(window.ethereum);
      let accounts = await provider.send("eth_accounts", []);

      if (accounts.length === 0) {
        accounts = await provider.send("eth_requestAccounts", []);
        if (accounts.length === 0) {
          alert("Please connect your MetaMask wallet to proceed.");
          return;
        }
      }

      const signer = await provider.getSigner();
      const contract = new ethers.Contract(
        CONTRACT_ADDRESS,
        CONTRACT_ABI,
        signer
      );

      const tx = await contract.donate({
        value: ethers.parseEther(formData.amount),
      });

      // const walletAddress = "0xTESTWALLETADDRESS";
      // const transactionHash = "0xTESTTXHASH";

      console.log("Donation Details:");
      console.log("First Name:", formData.firstName);
      console.log("Last Name:", formData.lastName);
      console.log("Email:", formData.email);
      console.log("Phone:", formData.phone);
      console.log("Amount (ETH):", formData.amount);
      console.log("Wallet Address:", await signer.getAddress());
      console.log("Transaction Hash:", tx.hash);

      await axios.post(
        "http://localhost:8080/donate",
        {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          amount: formData.amount,
          // walletAddress: walletAddress,
          walletAddress: await signer.getAddress(),
          // transactionHash: transactionHash,
          transactionHash: tx.hash,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      onClose();
    } catch (err) {
      console.error("Donation submission failed:", err);
    }
  }

  return (
    <div className="form-overlay" onClick={onClose}>
      <div className="form-container" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>
          ✕
        </button>
        <h2 className="form-title">Charity Donation Form</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group-row">
            <div className="form-group">
              <label>First Name</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Last Name</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label>E-mail</label>
            <input
              type="email"
              name="email"
              placeholder="ex: myname@example.com"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Phone Number</label>
            <input
              type="tel"
              name="phone"
              placeholder="+91 00000 00000"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Amount</label>
            <div className="amount-input">
              <input
                type="number"
                name="amount"
                value={formData.amount}
                onChange={handleChange}
                required
                min="0.001"
                step="0.001"
              />
              <span className="currency">ETH</span>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "20px",
            }}
          >
            <button type="submit" className="form-donate-btn">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Form;
