// hardhat.config.ts
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.resolve(__dirname, './.env') });

require('hardhat-deploy-ethers');
require('hardhat-deploy');
require('hardhat-gas-reporter');

const chainIds = {
  ganache: 1337,
  goerli: 5,
  hardhat: 31337,
  kovan: 42,
  mainnet: 1,
  rinkeby: 4,
  ropsten: 3,
  sepolia: 11155111,
};

const MNEMONIC = process.env.MNEMONIC || '';
const INFURA_KEY = process.env.INFURA || '';

const getInfuraURL = (network) => {
  return `https://${network}.infura.io/v3/${INFURA_KEY}`;
};

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  defaultNetwork: 'hardhat',
  networks: {
    hardhat: {
      accounts: {
        mnemonic: MNEMONIC,
      },
      chainId: chainIds.hardhat,
    },
    ropsten: {
      url: getInfuraURL('ropsten'),
      accounts: {
        mnemonic: MNEMONIC,
      },
      chainId: chainIds.ropsten,
    },
    rinkeby: {
      url: getInfuraURL('rinkeby'),
      accounts: {
        mnemonic: MNEMONIC,
      },
      chainId: chainIds.rinkeby,
    },
    sepolia: {
      url: getInfuraURL('sepolia'),
      accounts: {
        mnemonic: MNEMONIC
      },
      chainId: chainIds.sepolia,
    },
    bsctest: {
      url: 'https://data-seed-prebsc-1-s1.binance.org:8545',
      chainId: 97,
      gasPrice: 20000000000,
      accounts: { mnemonic: MNEMONIC },
    },
    bscmain: {
      url: 'https://bsc-dataseed.binance.org/',
      chainId: 56,
      gasPrice: 20000000000,
      accounts: { mnemonic: MNEMONIC },
    },
  },
  solidity: {
    compilers: [
      {
        version: '0.7.4',
        settings: { optimizer: { enabled: true, runs: 200 } },
      },
    ],
  },
  gasReporter: {
    currency: 'EUR',
    coinmarketcap: process.env.COINMARKETCAP_API_KEY,
    enabled: process.env.GAS_REPORT ? true : false,
    gasPrice: 1,
    showTimeSpent: true,
  },
  typechain: {
    outDir: 'src/typechain',
  },
  namedAccounts: {
    deployer: {
      default: 0, // here this will by default take the first account as deployer
    },
  },
  paths: {
    deployments: 'src/deployments',
  }
};
