import Web3 from "web3";

export {};
declare global {
  export interface Window {
    ethereum: any;
    web3: Web3;
  }
}
