import Web3 from "web3";

declare global {
  export interface Window {
    web3: Web3;
    ethereum: any;
  }
}
