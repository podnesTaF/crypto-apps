const { ethers, network } = require("hardhat");
const fs = require("fs");

const FRONTEND_ADDRESSES_FILE =
  "../frontend/src/constants/contractAddresses.json";
const FRONTEND_ABI_FILE = "../frontend/src/constants/abi.json";

module.exports = async ({ getNamedAccounts, deployments }) => {
  if (process.env.UPDATE_FRONTEND) {
    updateContractAddresses();
  }
};

const updateContractAddresses = async () => {
  const raffle = await ethers.getContract("Raffle");
  const chainId = network.config.chainId.toString();
  const currentAddresses = JSON.parse(
    fs.readFileSync(FRONTEND_ADDRESSES_FILE, "utf8")
  );

  if (chainId in currentAddresses) {
    if (!currentAddresses[chainId].includes(raffle.address)) {
      currentAddresses[chainId].push(raffle.address);
    }
  } else {
    currentAddresses[chainId] = [raffle.address];
  }

  fs.writeFileSync(FRONTEND_ADDRESSES_FILE, JSON.stringify(currentAddresses));
};

// const updateAbi = async () => {
//   const raffle = await ethers.getContract("Raffle");
//   fs.readFileSync(
//     FRONTEND_ABI_FILE,
//     raffle.interface.format(ethers.utils.FormatTypes.json)
//   );
// };

module.exports.tags = ["all", "frontend"];
