import React, { Component } from "react";
import Web3 from "web3";
import "./merged-interfaces/Window";
import "./App.css";

const loadWeb3 = async () => {
  if (window.ethereum) {
    window.web3 = new Web3(window.ethereum);
    await window.ethereum.enable();
  } else if (window.web3) {
    window.web3 = new Web3(window.web3.currentProvider);
  } else {
    window.alert(
      "Non-Ethereum browser detected. You should consider trying MetaMask!"
    );
  }
};

const loadBlockchainData = async () => {
  const web3: Web3 = window.web3;

  const accounts = await web3.eth.getAccounts();

  console.log(accounts);
};

class App extends Component {
  async componentDidMount() {
    await loadWeb3();
    await loadBlockchainData();
  }
  render() {
    return <div className="App"></div>;
  }
}

export default App;
