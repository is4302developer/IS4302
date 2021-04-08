const ContactTracingToken = artifacts.require("ContactTracingToken");
const EndorsementToken = artifacts.require("EndorsementToken");
const DigitalEndorse = artifacts.require("DigitalEndorse");
const truffleAssert = require('truffle-assertions');

contract('DigitalEndorse', function(accounts) {
    let contactTracingTokenInstance;
    let endorsementTokenInstance;
    let digitalEndorseInstance;
    before(async () => {
        contactTracingTokenInstance = await ContactTracingToken.deployed();
        endorsementTokenInstance = await EndorsementToken.deployed();
        digitalEndorseInstance = await DigitalEndorse.deployed();
    });

    it('Citizens with the endorsement token can endorse another citizen', async () => {
        await endorsementTokenInstance.createTokens(accounts[1], {
            from: accounts[0],
        });
        await contactTracingTokenInstance.createToken(accounts[2], {
            from: accounts[0],
        })
        await digitalEndorseInstance.endorseTracer(accounts[2], {
            from: accounts[1],
        });
        let result = await contactTracingTokenInstance.getCitizenGuarantors(accounts[2]);
        assert(
            result == 1,
            'Citizens are not able to endorse successfully'
        )
    });

    it('Prevent citizens who do not have the endorsement token from endorsing', async () => {
        let result;
        try {
            result = await digitalEndorseInstance.endorseTracer(accounts[2], {
                from: accounts[3],
            })
        } catch (e) {}
        assert.equal(
            result,
            undefined,
            'Citizens without the token are able to endorse'
        )
    });

    it('Citizens should not be able to endorse more than once', async () => {
        let result;
        try {
            result = await digitalEndorseInstance.endorseTracer(accounts[2], {
                from: accounts[1],
            })
        } catch (e) {}
        assert.equal(
            result,
            undefined,
            'Citizens can endorse more than once'
        )
    });

    it('Citizens should not be able to endorse someone without a citizen token', async () => {
        await endorsementTokenInstance.createTokens(accounts[2], {
            from: accounts[0],
        });
        let result;
        try {
            result = await endorsementTokenInstance.endorseTracer(accounts[4], {
                from: accounts[2],
            })
        } catch (e) {}
        assert.equal(
            result,
            undefined,
            'Citizens are able to endorse someone without a citizen token'
        )
    });

    it('Citizens can unendorse another citizen', async () => {
        await digitalEndorseInstance.unendorseTracer(accounts[2], {
            from: accounts[1],
        });
        let result = await endorsementTokenInstance.balanceOf(accounts[1]);
        assert(
            result == 1,
            'Citizens are not able to unendorse successfully'
        )
    });

    it('Prevent citizens who did not endorse from unendorsing', async () => {
        let result;
        try {
            result = await digitalEndorseInstance.unendorseTracer(accounts[2], {
                from: accounts[1],
            })
        } catch (e) {}
        assert.equal(
            result,
            undefined,
            'Citizens who did not endorse are able to unendorse'
        )
    });

    it('Prevent fraudulent unendorsement (i.e. citizens can only unendorse the tracer that they previously endorsed before)', async () => {
        await digitalEndorseInstance.endorseTracer(accounts[2], {
            from: accounts[1],
        });
        let result;
        try {
            result = await digitalEndorseInstance.unendorseTracer(accounts[3], {
                from: accounts[1],
            })
        } catch (e) {}
        assert.equal(
            result,
            undefined,
            'Citizens are able to unendorse someone whom they have never endorsed before'
        )
    });
})