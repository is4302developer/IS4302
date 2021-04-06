const ContactTracingToken = artifacts.require("ContactTracingToken");
const ContactTracing = artifacts.require("ContactTracing");

module.exports = async function (deployer, network, accounts) {
  let deployAccount1 = accounts[0];

  let tracingToken;

  return deployer
    .then(() => {
      return deployer.deploy(ContactTracingToken, {
        from: deployAccount1,
      });
    })
    .then((instance) => {
      tracingToken = instance;
      return deployer.deploy(ContactTracing, tracingToken.address, {
        from: deployAccount1,
      });
    });
};
