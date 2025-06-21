import { ethers } from "hardhat";

async function main() {
  console.log("Deploying EducationNFT contract...");

  const EducationNFT = await ethers.getContractFactory("EducationNFT");
  const educationNFT = await EducationNFT.deploy();

  console.log("Contract deployed to:", await educationNFT.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
