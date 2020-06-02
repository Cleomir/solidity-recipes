import Web3 from "web3";
import Contract from "web3/eth/contract";
import {Tx} from "web3/eth/types";
const OpenZeppelinERC20 = require("../build/contracts/OpenZeppelinERC20.json");

const loadWeb3FromBrowser = (): Web3 | undefined => {
  if (window.web3) {
    const web3 = new Web3(window.web3.currentProvider);

    window.web3 = web3;
    window.ethereum.enable();

    return window.web3;
  }
};

const transferTokens = async (
  contract: Contract,
  to: string,
  from: string,
  amount: string
): Promise<any> => {
  return await contract.methods.transfer(to, amount).send({from});
};

const deployContract = async (
  contract: Contract,
  initialSupply: string,
  deployOptions: Tx
): Promise<string> => {
  try {
    const deployedContractAddress = await contract
      .deploy({
        data: OpenZeppelinERC20.bytecode,
        arguments: [initialSupply],
      })
      .send(deployOptions);

    return deployedContractAddress.options.address;
  } catch (error) {
    throw error;
  }
};
