const ContactTracingToken = artifacts.require("ContactTracingToken");
const ContactTracing = artifacts.require("ContactTracing");
const DigitalEndorse = artifacts.require("DigitalEndorse");
const EndorsementToken = artifacts.require("EndorsementToken");

module.exports = async function (deployer, network, accounts) {
  let deployAccount1 = accounts[0];
  return deployer.deploy(ContactTracingToken, {from: deployAccount1}).then(function() {
    return deployer.deploy(EndorsementToken, {from: deployAccount1}).then(function() {
      return deployer.deploy(ContactTracing, ContactTracingToken.address, {from: deployAccount1}).then(function() {
        return deployer.deploy(DigitalEndorse, EndorsementToken.address, ContactTracingToken.address, {from: deployAccount1});
      });
    });
  });
};
