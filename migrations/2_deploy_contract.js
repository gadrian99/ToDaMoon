const ToDaMoonV3 = artifacts.require("ToDaMoonV3");

module.exports = function (deployer) {
  deployer.deploy(ToDaMoonV3, "ToDaMoonV3", "TDM3", "https://to-damoon.herokuapp.com/");
};
