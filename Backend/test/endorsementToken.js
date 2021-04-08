const EndorsementToken = artifacts.require("EndorsementToken");
const truffleAssert = require('truffle-assertions');

contract('EndorsementToken', function(accounts) {
    let endorsementTokenInstance;
    before(async () => {
        endorsementTokenInstance = await EndorsementToken.deployed();
    });

    it('Can create token for endorsement', async () => {
        await endorsementTokenInstance.createTokens(accounts[1], {
            from: accounts[0],
        });
        let result = await endorsementTokenInstance.balanceOf(accounts[1]);
        assert(
            result == 1,
            'Endorsement token not created successfully'
        );
    });

    it('Only owner can create token for citizens', async () => {
        let result;
        try {
            result = await endorsementTokenInstance.createTokens(accounts[2], {
                from: accounts[1],
            });
        } catch (e) {}
        assert.equal(
            result,
            undefined,
            'Token is created by someone who is not the owner of the contract'
        );
    });

    it('Each citizen can only have 1 endorsement token', async () => {
        let result;
        try {
            result = await endorsementTokenInstance.createTokens(accounts[1], {
                from: accounts[0],
            })
        } catch (e) {}
        assert.equal(
            result,
            undefined,
            'Citizens can have more than 1 endorsement token'
        );
    });

    it('getCurrentTokenOwner() method works correctly', async () => {
        let result = await endorsementTokenInstance.getCurrentTokenOwner(0);
        assert.equal(
            result,
            accounts[1],
            'getCurrentTokenOwner() method did not work correctly'
        );
    });

    it('getTokenId() method works correctly', async () => {
        let result = await endorsementTokenInstance.getTokenId(accounts[1]);
        assert.equal(
            result,
            0,
            'getTokenId() method did not work correctly'
        );
    });

    it('getOwnerOfContract() method works correctly', async () => {
        let result = await endorsementTokenInstance.getOwnerOfContract();
        assert.equal(
            result,
            accounts[0],
            'getOwnerOfContract() method did not work correctly'
        );
    });

    it('getOriginalOwner() method works correctly', async () => {
        let result = await endorsementTokenInstance.getOriginalOwner(0);
        assert.equal(
            result,
            accounts[1],
            'getOriginalOwner() method did not work correctly'
        );
    });
});