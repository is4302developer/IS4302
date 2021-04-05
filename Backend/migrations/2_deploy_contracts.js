const DigitalToken = artifacts.require("ContactTracing_Token");
const DigitalTrace = artifacts.require("Trace");

module.exports = async function (deployer, network, accounts) {
  let deployAccount1 = accounts[0];

  return deployer
    .then(() => {
      return deployer.deploy(DigitalToken, {
        from: deployAccount1,
      });
    })
    .then(() => {
      return deployer.deploy(DigitalTrace, {
        from: deployAccount1,
      });
    });
};
