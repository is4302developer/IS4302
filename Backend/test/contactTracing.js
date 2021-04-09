const ContactTracingToken = artifacts.require("ContactTracingToken");
const EndorsementToken = artifacts.require("EndorsementToken");
const DigitalEndorse = artifacts.require("DigitalEndorse");
const ContactTracing = artifacts.require("ContactTracing");
const truffleAssert = require('truffle-assertions');

contract('ContactTracing', function(accounts) {
    let contactTracingTokenInstance;
    let endorsementTokenInstance;
    let digitalEndorseInstance;
    let contactTracingInstance;
    before(async () => {
        contactTracingTokenInstance = await ContactTracingToken.deployed();
        endorsementTokenInstance = await EndorsementToken.deployed();
        digitalEndorseInstance = await DigitalEndorse.deployed();
        contactTracingInstance = await ContactTracing.deployed();
    });

    it('Citizens should be able to check in with their contact tracing token', async () => {
        await contactTracingTokenInstance.createToken(accounts[1], {
            from: accounts[0],
        });
        let result = await contactTracingInstance.checkIn(0, {
            from: accounts[1],
        });
        assert(
            result == true,
            'Citizens are not able to check in with their contact tracing token'
        )
    });

    it('Should reject check in for invalid address and tokenId pairs', async () => {
        let result = await contactTracingInstance.checkIn(0, {
            from: accounts[2],
        });
        assert(
            result == false,
            'Citizens are able to check in with invalid address and tokenId pairs'
        )
    });

    it('Citizens should be able to check out with their contact tracing token', async () => {
        let result = await contactTracingInstance.checkOut(0, {
            from: accounts[1],
        });
        assert(
            result == true,
            'Citizens are not able to check out with their contact tracing token'
        )
    });

    it('Should reject check out for invalid address and tokenId pairs', async () => {
        let result = await contactTracingInstance.checkOut(0, {
            from: accounts[2],
        });
        assert(
            result == false,
            'Citizens are able to check out with invalid address and tokenId pairs'
        )
    });

    it('viewAvailableContactTracers() method works correctly', async () => {
        await contactTracingTokenInstance.createToken(accounts[2], {
            from: accounts[0],
        });
        await endorsementTokenInstance.createTokens(accounts[1], {
            from: accounts[0],
        });
        await endorsementTokenInstance.createTokens(accounts[3], {
            from: accounts[0],
        });
        await endorsementTokenInstance.createTokens(accounts[4], {
            from: accounts[0],
        });
        await digitalEndorseInstance.endorseTracer(accounts[2], {
            from: accounts[1],
        });
        await digitalEndorseInstance.endorseTracer(accounts[2], {
            from: accounts[3],
        });
        await digitalEndorseInstance.endorseTracer(accounts[2], {
            from: accounts[4],
        });
        await contactTracingTokenInstance.registerTracer(accounts[2], {
            from: accounts[0],
        });
        let result = await contactTracingInstance.viewAvailableContactTracers();
        let len = result.length;
        assert(
            len == 1,
            'viewAvailableContactTracers() method did not work correctly'
        );
    });

    it('Citizens can appoint their preferred contact tracer', async () => {
        let result = await contactTracingInstance.appointTracer(1, {
            from: accounts[1],
        });
        assert.notEqual(
            result,
            undefined,
            'Citizens are not able to appoint their preferred contact tracer'
        )
    });

    it('Prevent citizens from appointing unregistered contact tracer', async () => {
        let result;
        try {
            result = await contactTracingInstance.appointTracer(0, {
                from: accounts[3],
            })
        } catch (e) {}
        assert.equal(
            result,
            undefined,
            'Citizens are able to appoint unregistered contact tracer'
        )
    });

    it('Admin can appoint contact tracing duties to contact tracers', async () => {
        await contactTracingTokenInstance.createToken(accounts[3], {
            from: accounts[0],
        });
        await contactTracingTokenInstance.registerAdmin(accounts[3], {
            from: accounts[0],
        });
        let result = await contactTracingInstance.appointTracingDuties.call(0, {
            from: accounts[3],
        });
        assert.equal(
            result,
            true,
            'Admin was not able to appoint contact tracing duties'
        )
    });

    it('Admin should not be able to appoint duties to an overloaded contact tracer', async () => {
        await contactTracingTokenInstance.createToken(accounts[4], {
            from: accounts[0],
        });
        await contactTracingTokenInstance.createToken(accounts[5], {
            from: accounts[0],
        });
        await contactTracingTokenInstance.createToken(accounts[6], {
            from: accounts[0],
        });
        await contactTracingTokenInstance.createToken(accounts[7], {
            from: accounts[0],
        });
        await contactTracingTokenInstance.createToken(accounts[8], {
            from: accounts[0],
        });
        await contactTracingInstance.appointTracer(1, {
            from: accounts[4],
        });
        await contactTracingInstance.appointTracer(1, {
            from: accounts[5],
        });
        await contactTracingInstance.appointTracer(1, {
            from: accounts[6],
        });
        await contactTracingInstance.appointTracer(1, {
            from: accounts[7],
        });
        await contactTracingInstance.appointTracer(1, {
            from: accounts[8],
        });
        await contactTracingInstance.appointTracingDuties(0, {
            from: accounts[3],
        });
        await contactTracingInstance.appointTracingDuties(3, {
            from: accounts[3],
        });
        await contactTracingInstance.appointTracingDuties(4, {
            from: accounts[3],
        });
        await contactTracingInstance.appointTracingDuties(5, {
            from: accounts[3],
        });
        await contactTracingInstance.appointTracingDuties(6, {
            from: accounts[3],
        });
        let result = await contactTracingInstance.appointTracingDuties.call(7, {
            from: accounts[3],
        });
        assert.equal(
            result,
            false,
            'Admin is able to appoint duties to an overloaded contact tracer'
        )
    });

    it('Only admin can appoint duties to contact tracers', async() => {
        await contactTracingInstance.approveRetrieval(web3.utils.asciiToHex("9/4/2021"), web3.utils.asciiToHex("CT"), 0, {
            from: accounts[2],
        });
        let result = await contactTracingInstance.appointTracingDuties.call(0, {
            from: accounts[3],
        });
        // To show that the contact tracer is yet to be overloaded
        assert.equal(
            result,
            true,
        )
        let result1 
        try {
            result1 = await contactTracingInstance.appointTracingDuties.call(0, {
                from: accounts[2]
            });
        } catch (e) {}
        assert.equal(
            result1,
            undefined,
            'Non admins can appoint duties to contact tracers'
        )
    });

    it('Contact tracers can carry out their appointed contact tracing duties', async () => {
        await contactTracingInstance.approveRetrieval(web3.utils.asciiToHex("9/4/2021"), web3.utils.asciiToHex("CT"), 3, {
            from: accounts[2],
        });
        let address = await contactTracingTokenInstance.getTokenOwner(3);
        assert(
            address == accounts[4],
        )
        let result = await contactTracingInstance.getAccessRecords(accounts[4]);
        assert(
            result[0].tracer == accounts[2],
            'Contact tracers cannot carry out their appointed duties'
        )
        let time = web3.utils.toAscii(result[0].timeStamp).replace(/\u0000/g, '');
        assert.equal(
            time,
            "9/4/2021",
            'Contact tracers cannot carry out their appointed duties'
        )
        let purpose = web3.utils.toAscii(result[0].purpose).replace(/\u0000/g, '');
        assert.equal(
            purpose,
            "CT",
            'Contact tracers cannot carry out their appointed duties'
        )
    });

    it('Contact tracer should not be able to trace suspects that is not within their duties', async () => {
        let result;
        try {
            result = await contactTracingInstance.approveRetrieval(web3.utils.asciiToHex("9/4/2021"), web3.utils.asciiToHex("CT"), 7, {
                from: accounts[2],
            });
        } catch (e) {}
        assert.equal(
            result,
            undefined,
            'contact tracers are able to trace suspects that is not within their duties'
        )
    });

    it('getTracingDuties() method works correctly', async () => {
        let result = await contactTracingInstance.getTracingDuties(accounts[2]);
        assert(
            result[0].tokenIdSuspect == 0 && result[0].caseExists == false,
            'getTracingDuties() method did not work correctly'
        );
        assert(
            result[1].tokenIdSuspect == 3 && result[1].caseExists == false,
            'getTracingDuties() method did not work correctly'
        );
        assert(
            result[2].tokenIdSuspect == 4 && result[2].caseExists == true,
            'getTracingDuties() method did not work correctly'
        );
        assert(
            result[3].tokenIdSuspect == 5 && result[3].caseExists == true,
            'getTracingDuties() method did not work correctly'
        );
        assert(
            result[4].tokenIdSuspect == 6 && result[4].caseExists == true,
            'getTracingDuties() method did not work correctly'
        );
    });

    it('Citizens can rate their contact tracer', async () => {
        await contactTracingInstance.rateTracer(1, 5, {
            from: accounts[1],
        });
        let result = await contactTracingTokenInstance.getCitizenReview(accounts[2]);
        assert(
            result == 1,
            'Citizens cannot rate their contact tracer'
        );
        let result1 = await contactTracingTokenInstance.getCitizenTotalRating(accounts[2]);
        assert(
            result1 == 5,
            'Citizens cannot rate their contact tracer'
        );
        let result2 = await contactTracingTokenInstance.getCitizenRating(accounts[2]);
        assert(
            result2 == 5,
            'Citizens cannot rate their contact tracer'
        );
    });

    it('Citizens should not be able to rate contact tracers that they did not appoint', async () => {
        let result;
        try {
            result = await contactTracingInstance.rateTracer(2, 5, {
                from: accounts[1],
            })
        } catch (e) {}
        assert.equal(
            result,
            undefined,
            'Citizens can rate the contact tracers that they did not appoint'
        );
    });

    it('Citizens can only give a rating between 0 and 5', async () => {
        let result;
        try {
            result = await contactTracingInstance.rateTracer(1, 7, {
                from: accounts[1],
            })
        } catch (e) {}
        assert.equal(
            result,
            undefined,
            'Citizens can give a rating that is not between 0 and 5'
        )
    });

});