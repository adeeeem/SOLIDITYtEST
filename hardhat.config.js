require("@nomicfoundation/hardhat-toolbox");
require("@nomiclabs/hardhat-etherscan");

const API_URL =
  "https://clean-thrilling-surf.bsc-testnet.discover.quiknode.pro/1d2c2098b1ba49383222dcf1eb36ca4e0a968d37/";
const PRIVATE_KEY =
  "9385d7dff6c5c02ce96e010f4b836a02b5839f631e60ba0d991780711660d769";

module.exports = {
  solidity: {
    compilers: [
      {
        version: "0.8.0",
      },
      {
        version: "0.4.11",
      },
      {
        version: "0.8.1",
      },
      {
        version: "0.8.4",
      },
    ],
  },
  networks: {
    bscTestnet: {
      url: API_URL || "https://data-seed-prebsc-1-s1.binance.org:8545",
      accounts: [PRIVATE_KEY],
    },
    bscMainnet: {
      url: API_URL || "https://bsc-dataseed.binance.org",
      accounts: [PRIVATE_KEY || ""],
    },
  },
  etherscan: {
    apiKey: "4Z7BET7ZBKJHJ4AU4NP7H3VMZ3BK3S3B53", // Obtain an API key from the BSCScan website
  },
};
