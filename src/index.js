const Web3 = require("web3");
const {setupLoader} = require("@openzeppelin/contract-loader");

async function main() {
  const web3 = new Web3("http://localhost:8545");
  const loader = setupLoader({provider: web3}).web3;
  const address = "0xe78A0F7E598Cc8b0Bb87894B0F60dD2a88d6a8Ab";
  const box = loader.fromArtifact("Box", address);
  const accounts = await web3.eth.getAccounts();

  await box.methods
    .store(20)
    .send({from: accounts[0], gas: 50000, gasPrice: 1e6});

  const value = await box.methods.retrieve().call();
  console.log("Box value is ", value);
}

main();
