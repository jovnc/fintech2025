import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const FinTechModule = buildModule("FinTechModule", (m) => {
  const vault = m.contract("CentralizedVault");
  const breakfastToken = m.contract("BreakfastCreditsToken", [vault]);
  const dinnerToken = m.contract("DinnerCreditsToken", [vault]);

  return { vault, breakfastToken, dinnerToken };
});

export default FinTechModule;
