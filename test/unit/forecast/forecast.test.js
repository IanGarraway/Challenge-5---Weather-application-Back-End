import { expect } from "chai";
import Sinon from "sinon";

import ForecastService from "../../../src/services/Forecast.service.js";

import Config from "../../../src/config/config.js";


describe("Forecast service", () => {
    let forecastService;
    beforeEach(() => {
        Config.load();
        forecastService = new ForecastService();
        
    });

    afterEach(() => {
        forecastService = null;
    });

    describe("get forecast",  () => {
        it("Should return an array of length 5 ",async () => {
           //Arrange
        console.log("test");

        //Act
        let forecast = await forecastService.getForecast("Leeds, GB");
        

        
        console.log(`-->{forecast}`);
        //Assert

        expect(forecast).to.be.an('array').that.has.lengthOf(5); 
        });
        
    })


})