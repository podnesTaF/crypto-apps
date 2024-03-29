
const hre = require("hardhat");

// import hre from 'hardhat';

const main = async () => {
  const gasLimit = 4000000;
  const Transactions = await hre.ethers.getContractFactory('Transactions');
  const transactions = await Transactions.deploy({gasLimit})

  await transactions.deployed();

  console.log("Transactions deployed to: ", transactions.address);
}

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

runMain()