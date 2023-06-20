const mnemonic='milk list settle aisle cricket divide swing sudden music car assault region'
const HDWalletProvider = require('@truffle/hdwallet-provider');

module.exports = {

  contracts_build_directory: "../Frontend/src/contracts",

  networks: {
    development: {
      host: "127.0.0.1",     // Localhost (default: none)
      port: 7545,            // Standard Ethereum port (default: none)
      network_id: "*"     // Any network (default: none)
    },

  // polygon mumbai test network
    matic : {
      provider: () => new HDWalletProvider(mnemonic, `https://polygon-mumbai.g.alchemy.com/v2/LI3N54O-mGnneETEa8KiT1IkpWryj2EL`),
      network_id: 80001,       // mumbai's id
      confirmations: 2,    // # of confs to wait between deployments. (default: 0)
      timeoutBlocks: 200,  // # of blocks before a deployment times out  (minimum/default: 50)
      skipDryRun: true     // Skip dry run before migrations? (default: false for public nets )
    },

    // sepolia testnet
    sepolia : {
      provider: () => new HDWalletProvider(mnemonic, `https://eth-sepolia.g.alchemy.com/v2/chj3O5banYrH2sx-bQtFd2ABCHZRZQWt`),
      network_id: "11155111",       // sepolia's id
      confirmations: 2,    // # of confs to wait between deployments. (default: 0)
      timeoutBlocks: 200,  // # of blocks before a deployment times out  (minimum/default: 50)
      skipDryRun: true     // Skip dry run before migrations? (default: false for public nets )
    }

  },

  // Configure your compilers
  compilers: {
    solc: {
      version: "0.8.10",      // Fetch exact version from solc-bin (default: truffle's version)
    }
  },
};
