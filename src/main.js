const Web3 = require("web3");
import OpenZeppelinERC20 from "../build/contracts/OpenZeppelinERC20.json";

const main = async () => {
  if (window.web3) {
    const web3 = new Web3(window.web3.currentProvider);
    window.web3 = web3;
    window.ethereum.enable();

    const contract = new web3.eth.Contract(
      OpenZeppelinERC20.abi,
      "0xc7647b923c9a98dac46d566364116787933a3e5c"
    );

    // DEPLOY

    // try {
    //   const deployedContractAddress = await contract
    //     .deploy({
    //       data: OpenZeppelinERC20.bytecode,
    //       arguments: [web3.utils.toWei("10000")],
    //     })
    //     .send({
    //       from: "0xfeBf6AD2dEbd67f9c0aeB7d88340eF84b044c69f",
    //       gas: 1500000,
    //       price: "30000000000000",
    //     });

    //   console.log(
    //     "Deployed address: ",
    //     deployedContractAddress.options.address
    //   );
    // } catch (error) {
    //   console.log(error);
    // }

    // SEND TOKENS

    // const transaction = await contract.methods
    //   .transfer(
    //     "0xB5dc4847bCE62f2873ce681ffc13fC3D5E6E8d74",
    //     web3.utils.toWei("500")
    //   )
    //   .send({from: "0xfeBf6AD2dEbd67f9c0aeB7d88340eF84b044c69f"});

    // console.log("Transaction success", transaction);
  } else {
    console.log("Web3 not found");
  }
};

main().then(() => "Transferred funds successfully");
