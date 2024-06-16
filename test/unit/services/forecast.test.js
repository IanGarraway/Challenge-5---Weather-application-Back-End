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
        it("Should return an array of length 5 ", async () => {
            //Arrange        

            //Act
            let forecast = await forecastService.getForecast("Leeds, GB");
            //Assert
            
            expect(forecast.city).to.have.property('name', 'Leeds');
            expect(forecast.city).to.have.property('country', 'GB');
            expect(forecast.weather).to.be.an('array').that.has.lengthOf(5);
        });
        
    })


})