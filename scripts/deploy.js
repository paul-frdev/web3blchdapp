const hre = require("hardhat");
const ethers = hre.ethers;
const fs = require("fs");
const path = require("path");

const main = async () => {
  const [deployer] = await ethers.getSigners();

  console.log('Deploying with', await deployer.getAddress());

  const Transactions = await ethers.getContractFactory("Transactions", deployer);
  const transactions = await Transactions.deploy();

  await transactions.deployed();

  saveFrontendFiles({
    Transactions: transactions
  })
}

function saveFrontendFiles(contracts) {
  const contractsDir = path.join(__dirname, '/..', 'front/src/contracts')

  if (!fs.existsSync(contractsDir)) {
    fs.mkdirSync(contractsDir)
  }

  Object.entries(contracts).forEach((contractItem) => {
    const [name, contract] = contractItem;

    if (contract) {
      fs.writeFileSync(
        path.join(contractsDir, '/', name + '-contract-address.json'),
        JSON.stringify({ [name]: contract.address }, undefined, 2)
      )
    }

    const contractArtifact = hre.artifacts.readArtifactSync(name)

    fs.writeFileSync(
      path.join(contractsDir, '/', name + '.json'),
      JSON.stringify(contractArtifact, null, 2)
    )
  })
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
