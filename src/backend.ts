import HDWalletProvider from "@truffle/hdwallet-provider";
import Web3 from "web3";
import dotenv from "dotenv";
const OpenZeppelinERC20 = require("../build/contracts/OpenZeppelinERC20.json");

import TransactionOptions from "./interfaces/TransactionOptions";
import {SignedTransaction} from "./interfaces/SignedTransaction";

dotenv.config();

const signTransaction = async (
  web3: Web3,
  transactionOptions: TransactionOptions,
  privateKey: string
): Promise<SignedTransaction> => {
  return web3.eth.accounts.signTransaction(transactionOptions, privateKey);
};

const sendSignedTransaction = async (web3: Web3, rawTransaction: string) => {
  return web3.eth.sendSignedTransaction(rawTransaction);
};

const transferTokens = async () => {
  // provider details
  const infuraURL = `https://rinkeby.infura.io/v3/${process.env.PROJECTID!}`;
  const provider = new HDWalletProvider(process.env.MNEMONIC!, infuraURL);
  const web3 = new Web3(provider);

  // contract details
  const abiAddress = "0xc7647b923c9a98dac46d566364116787933a3e5c";
  const contract = new web3.eth.Contract(OpenZeppelinERC20.abi, abiAddress);

  // transaction details
  const tokenAddress = "0xc7647b923c9a98dac46d566364116787933a3e5c";
  const recipientAddress = "0xD737957a82Eb044c68f8Ea9a3272b29C08656CC3";
  const gas = "1500000";
  const tokenAmount = web3.utils.toWei("100");
  const transactionOptions: TransactionOptions = {
    gas,
    to: tokenAddress,
    data: contract.methods.transfer(recipientAddress, tokenAmount).encodeABI(),
  };

  try {
    const signedTransaction = await signTransaction(
      web3,
      transactionOptions,
      process.env.PRIVATE_KEY!
    );
    const transactionReceipt = await sendSignedTransaction(
      web3,
      signedTransaction.rawTransaction!
    );

    console.log("Transaction receipt", transactionReceipt);
  } catch (error) {
    console.log(error);
    process.exit(0);
  }
};

transferTokens().then(() => {
  console.log("Tokens transferred successfully");
  process.exit(0);
});
