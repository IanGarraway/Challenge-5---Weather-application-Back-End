import { expect } from "chai";
import mongoose from "mongoose";
import Database from "../../../src/db/Database.js";
import sinon from "sinon";

describe(`Database class tests`, () => {
    let db;
    let mongooseConnectStub;
    let consoleLogSpy;
    let clock;

    beforeEach(() => {
        db = new Database('mongodb://fake-uri');

        mongooseConnectStub = sinon.stub(mongoose, 'connect');

        consoleLogSpy = sinon.spy(console, 'log');

        clock = sinon.useFakeTimers();
    });

    afterEach(() => {
        mongooseConnectStub.restore();
        consoleLogSpy.restore();

        //Restore the clock
        clock.restore();
    });

    it(`should log an error when mongoose.connect fails`, async () => {
        
        //Arrange
        mongooseConnectStub.rejects(new Error('Connection failed'));

        //Act
        await db.connect();
        
        //Assert
        expect(consoleLogSpy.calledWith('Database connection error', sinon.match.instanceOf(Error))).to.be.true;
    });

    it('should retry the connection on failure', async () => {
        //arrange
        mongooseConnectStub.onFirstCall().rejects(new Error('connection failed'));
        mongooseConnectStub.onSecondCall().resolves();        

        //Act
        db.connect();

        await clock.tickAsync(1000);

        //Assert
        expect(mongooseConnectStub.callCount).to.equal(2);

        
    });

    it('should report the failure after 10 attempts', async () => {
        //arrange
        mongooseConnectStub.rejects(new Error('connection failed'));   

        //Act
        db.connect();

        for (let i = 0; i < 10; i++) {
            await clock.tickAsync(1000);
        }

        //Assert
        expect(mongooseConnectStub.callCount).to.equal(11);

        expect(consoleLogSpy.calledWith('Database unavailable')).to.be.true;
    })
})
