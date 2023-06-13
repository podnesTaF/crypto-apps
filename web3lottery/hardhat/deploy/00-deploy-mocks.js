const { network, ethers } = require("hardhat");
const { developmentChains } = require("../helper-hardhat-config");

const BASE_FEE = ethers.utils.parseEther("0.25");
const GAS_PRICE_LINK = 1e9;

module.exports = async ({ getNamedAccounts, deployments }) => {
  const { deploy, log } = deployments;
  const { deployer } = await getNamedAccounts();
  const args = [BASE_FEE, GAS_PRICE_LINK];
  const chainId = network.config.chainId;

  if (chainId == 31337) {
    log("Skipping deploy of Raffle contract on a development network");
    await deploy("VRFCoordinatorV2Mock", {
      from: deployer,
      log: true,
      args,
    });
    log("Mock deployed to:", "VRFCoordinatorV2Mock");
    log("----------------------------------------------------");
  }
};

module.exports.tags = ["all", "mocks"];
