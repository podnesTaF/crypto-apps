
require("@nomiclabs/hardhat-waffle");


/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.0",
  networks: {
    goerli: {
      url: 'https://eth-goerli.g.alchemy.com/v2/DE9tfRGvVxXJnpbH21hdi8bTYaDxMzCh',
      accounts: ['6830871c1db1fdf028fd102819d3d14ff3201b3ff1fab18d5fd2faad3a79302d']
    }
  }
};
