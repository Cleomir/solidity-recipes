const HDWalletProvider = require("@truffle/hdwallet-provider");
const dotenv = require("dotenv");

dotenv.config();

module.exports = {
  networks: {
    development: {
      protocol: "http",
      host: "localhost",
      port: 8545,
      gas: 5000000,
      gasPrice: 5e9,
      networkId: "*",
    },
    rinkeby: {
      provider: () =>
        new HDWalletProvider(
          process.env.MNEMONIC,
          `https://rinkeby.infura.io/v3/${process.env.PROJECTID}`
        ),
      networkId: 4,
      gasPrice: 10e9,
    },
  },
};
