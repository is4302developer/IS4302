const ContactTracingToken = artifacts.require("ContactTracingToken");
const EndorsementToken = artifacts.require("EndorsementToken");
const DigitalEndorse = artifacts.require("DigitalEndorse");
const truffleAssert = require('truffle-assertions');

contract('ContactTracingToken', function(accounts) {
    let contactTracingTokenInstance;
    let endorsementTokenInstance;
    let digitalEndorseInstance;
    before(async () => {
        contactTracingTokenInstance = await ContactTracingToken.deployed();
        endorsementTokenInstance = await EndorsementToken.deployed();
        digitalEndorseInstance = await DigitalEndorse.deployed();
    });

    it('Owner can create citizen token', async () => {
        await contactTracingTokenInstance.createToken(accounts[1], {
            from: accounts[0],
        });
        let result = await contactTracingTokenInstance.balanceOf(accounts[1]);
        assert(
            result == 1,
            'Citizen token not created successfully'
        );
    });

    it('Prevents the creation of citizen token by people who are not admins/owner', async () => {
        let result;
        try {
            result = await contactTracingTokenInstance.createToken(accounts[2], {
                from: accounts[1],
            });
        } catch (e) {}
        assert.equal(
            result,
            undefined,
            'Citizen tokens were created illegally'
        )
    });

    it('Prevents the issuance of more than 1 token to the same citizen', async () => {
        let result;
        try {
            result = await contactTracingTokenInstance.createToken(accounts[1], {
                from: accounts[0],
            });
        } catch (e) {}
        assert.equal(
            result,
            undefined,
            'More than 1 token have been issued to a citizen'
        )
    });

    it('registerAdmin() method works correctly', async () => {
        await contactTracingTokenInstance.registerAdmin(accounts[1], {
            from: accounts[0],
        });
        let result = await contactTracingTokenInstance.isAdminByAddress(accounts[1]);
        assert(
            result == true,
            'registerAdmin() method did not work correctly'
        );
    });

    it('Admin can create citizen token', async () => {
        await contactTracingTokenInstance.createToken(accounts[2], {
            from: accounts[1],
        });
        let result = await contactTracingTokenInstance.balanceOf(accounts[2]);
        assert(
            result == 1,
            'Citizen token not created successfully'
        );
    });

    it('getTokenOwner() method works correctly', async () => {
        let result = await contactTracingTokenInstance.getTokenOwner(0);
        assert.equal(
            result,
            accounts[1],
            'getTokenOwner() method did not work correctly'
        )
    });

    it('getCitizenTokenId() method works correctly', async () => {
        let result = await contactTracingTokenInstance.getCitizenTokenId(accounts[1]);
        assert.equal(
            result,
            0,
            'getCitizenTokenId() method did not work correctly'
        )
    });

    it('Cannot register a citizen without the citizen token as an admin', async () => {
        let result;
        try {
            result = await contactTracingTokenInstance.registerAdmin(accounts[3], {
                from: accounts[1],
            });
        } catch (e) {}
        assert.equal(
            result,
            undefined,
            'Can register a citizen without the citizen token as an admin'
        )
    });

    it('registerTracer() method works correctly', async () => {
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
        let result = await contactTracingTokenInstance.isTracerByAddress(accounts[2]);
        assert(
            result == true,
            'registerTracer() method did not work correctly'
        )
    });

    it('Cannot register a citizen without the citizen token as a tracer', async () => {
        let result;
        try {
            result = await contactTracingTokenInstance.registerTracer(accounts[3], {
                from: accounts[1],
            });
        } catch (e) {}
        assert.equal(
            result,
            undefined,
            'Can register a citizen without the citizen token as a tracer'
        )
    });

    it('Cannot register tracer with less than 3 guarantors', async () => {
        await endorsementTokenInstance.createTokens(accounts[5], {
            from: accounts[0],
        });
        await endorsementTokenInstance.createTokens(accounts[6], {
            from: accounts[0],
        });
        await contactTracingTokenInstance.createToken(accounts[3], {
            from: accounts[1],
        })
        await digitalEndorseInstance.endorseTracer(accounts[3], {
            from: accounts[5],
        });
        await digitalEndorseInstance.endorseTracer(accounts[3], {
            from: accounts[6],
        });
        let result;
        try {
            result = await contactTracingTokenInstance.registerTracer(accounts[3], {
                from: accounts[0],
            });
        } catch (e) {}
        assert.equal(
            result,
            undefined,
            'Can register tracer with less than 3 guarantors'
        )
    });

    it('Admin can register tracer', async () => {
        await endorsementTokenInstance.createTokens(accounts[7], {
            from: accounts[0],
        });
        await digitalEndorseInstance.endorseTracer(accounts[3], {
            from: accounts[7],
        });
        await contactTracingTokenInstance.registerTracer(accounts[3], {
            from: accounts[1],
        });
        let result = await contactTracingTokenInstance.isTracerByAddress(accounts[3]);
        assert(
            result == true,
            'admin cannot register tracer'
        )
    });

    it('getCitizenReview() method works correctly', async () => {
        let result = await contactTracingTokenInstance.getCitizenReview(accounts[2]);
        assert(
            result == 0,
            'getCitizenReview() method did not work correctly'
        );
    });

    it('getCitizenTotalRating() method works correctly', async () => {
        let result = await contactTracingTokenInstance.getCitizenTotalRating(accounts[2]);
        assert(
            result == 0,
            'getCitizenTotalRating() method did not work correctly'
        )
    });

    it('getCitizenRating() method works correctly', async () => {
        let result = await contactTracingTokenInstance.getCitizenRating(accounts[2]);
        assert(
            result == 0,
            'getCitizenRating() method did not work correctly'
        )
    });

    it('getCitizenGuarantors() method works correctly', async () => {
        let result = await contactTracingTokenInstance.getCitizenGuarantors(accounts[2]);
        assert(
            result == 3,
            'getCitizenGuarantors() method did not work correctly'
        )
    });

    it('getContactTracers() method works correctly', async () => {
        let result = await contactTracingTokenInstance.getContactTracers();
        let num = await result.length;
        assert(
            num == 2,
            'getContactTracers() method did not work correctly'
        );
    });

    it('setCitizenReview() method works correctly', async () => {
        await contactTracingTokenInstance.setCitizenReview(1, 1);
        let result = await contactTracingTokenInstance.getCitizenReview(accounts[2]);
        assert(
            result == 1,
            'setCitizenReview() method did not work correctly'
        )
    });

    it('setCitizenTotalRating() method works correctly', async () => {
        await contactTracingTokenInstance.setCitizenTotalRating(1, 5);
        let result = await contactTracingTokenInstance.getCitizenTotalRating(accounts[2]);
        assert(
            result == 5,
            'setCitizenTotalRating() method did not work correctly'
        )
    });

    it('setCitizenRating() method works correctly', async () => {
        await contactTracingTokenInstance.setCitizenRating(1, 4);
        let result = await contactTracingTokenInstance.getCitizenRating(accounts[2]);
        assert(
            result == 4,
            'setCitizenRating() method did not work correctly'
        )
    });

    it('setCitizenGuarantors() method works correctly', async () => {
        await contactTracingTokenInstance.setCitizenGuarantors(accounts[2], 3);
        let result = await contactTracingTokenInstance.getCitizenGuarantors(accounts[2]);
        assert(
            result == 3,
            'setCitizenGuarantors() method did not work correctly'
        )
    });

    it('isTracerByAddress() method works correctly', async () => {
        let result = await contactTracingTokenInstance.isTracerByAddress(accounts[1]);
        assert(
            result == false,
            'isTracerByAddress() method did not work correctly'
        );
        let result1 = await contactTracingTokenInstance.isTracerByAddress(accounts[2]);
        assert(
            result1 == true,
            'isTracerByAddress() method did not work correctly'
        );
    });

    it('isTracerByTokenId() method works correctly', async () => {
        let result = await contactTracingTokenInstance.isTracerByTokenId(0);
        assert(
            result == false,
            'isTracerByTokenId() method did not work correctly'
        );
        let result1 = await contactTracingTokenInstance.isTracerByTokenId(1);
        assert(
            result1 == true,
            'isTracerByTokenId() method did not work correctly'
        );
    });

    it('isAdminByAddress() method works correctly', async () => {
        let result = await contactTracingTokenInstance.isAdminByAddress(accounts[1]);
        assert(
            result == true,
            'isTracerByAddress() method did not work correctly'
        );
        let result1 = await contactTracingTokenInstance.isAdminByAddress(accounts[2]);
        assert(
            result1 == false,
            'isTracerByAddress() method did not work correctly'
        );
    });

    it('isAdminByTokenId() method works correctly', async () => {
        let result = await contactTracingTokenInstance.isAdminByTokenId(0);
        assert(
            result == true,
            'isAdminByTokenId() method did not work correctly'
        );
        let result1 = await contactTracingTokenInstance.isAdminByTokenId(1);
        assert(
            result1 == false,
            'isAdminByTokenId() method did not work correctly'
        );
    });

    it('getOwnerOfContract() method works correctly', async () => {
        let result = await contactTracingTokenInstance.getOwnerOfContract();
        assert(
            result == accounts[0],
            'getOwnerOfContract() method did not work correctly'
        )
    });
    
});