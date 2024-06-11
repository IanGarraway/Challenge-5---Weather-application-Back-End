import { expect } from "chai";
import Sinon from "sinon";
import supertest from "supertest";

import Config from "../../src/config/config.js"
import Database from "../../src/db/Database.js"
import Server from "../../src/server/Server.js"
import User from "../../src/models/User.model.js";
import Favourite from "../../src/models/Favourite.model.js";
import TravelController from "../../src/controllers/Travel.Controller.js";
import AllRoutes from "../../src/routes/AllRoutes.js";
import LoginService from "../../src/services/Login.service.js";
import ForecastService from "../../src/services/Forecast.service.js";
import FavouritesService from "../../src/services/Favourites.service.js";

import FavouriteTestData from "../data/Favourite.testData.js";
import UserTestData from "../data/Login.testData.js";

describe("Integration Tests", () => {
    let travelServer;
    let loginService;
    let forecastService;
    let favouritesService;
    let database;
    let request;

    
    // create the server and the connection to the Database
    before(async () => {
        Config.load();
        const { PORT, HOST, DB_URI } = process.env;
        loginService = new LoginService();
        forecastService = new ForecastService();
        favouritesService = new FavouritesService();
        const travelController = new TravelController(favouritesService, loginService, forecastService);
        const allRoutes = new AllRoutes(travelController);
        database = new Database(DB_URI);
        await database.connect();
        travelServer = new Server(PORT, HOST, allRoutes);
        travelServer.start();
        request = supertest(travelServer.getApp());
        
        
    });

    after(async () => {
        await travelServer.close();
        await database.close();
    });

    // database reset
    beforeEach(async () => {
        try {
            await User.deleteMany();
            console.log("User Database Cleared");
        } catch (e) {
            console.log(e.message);;
            console.log("Error Clearing Users");
            throw new Error();
        }

        try {
            await Favourite.deleteMany();
            console.log("Favourites Database Cleared");
        } catch (e) {
            console.log(e.message);;
            console.log("Error Clearing Favourites");
            throw new Error();
        }
    });

    describe("Post request to /newuser when the user doesn't exist in the database", () => {
        it("Should respond with User was registered successfully", async () => {
            //Arrange
            const newuser = {
                "username": "testGuy",
                "password": "test",
                "email": "testguy@test.com",
                "name": "Test Guy"
            };
            //Act
            const response = await request.post("/newuser").send(newuser);
            //Assert
            expect(response.status).to.equal(201);
                
        })
    });

    describe("Post request to /newuser when a user of that name already exists in the database", () => {
        it("Should respond with User already exists", async () => {
            //Arrange
            const aUser = {
                "username": "testGuy",
                "password": "test",
                "email": "testguy@test.com",
                "name": "Test Guy"
            };
            await request.post("/newuser").send(aUser);
            const newUser = {
                "username": "testGuy",
                "password": "test2",
                "email": "testguy2@test.com",
                "name": "Test Guy"
            };
            //Act
            const response = await request.post("/newuser").send(newUser);
            //Assert
            expect(response.status).to.equal(400);
                
        })
    });
    describe("Post request to /newuser when a email of that name already exists in the database", () => {
        it("Should respond with User already exists", async () => {
            //Arrange
            const aUser = {
                "username": "testGuy",
                "password": "test",
                "email": "testguy@test.com",
                "name": "Test Guy"
            };
            await request.post("/newuser").send(aUser);
            const newUser = {
                "username": "testGuy2",
                "password": "test2",
                "email": "testguy@test.com",
                "name": "Test Guy"
            };
            //Act
            const response = await request.post("/newuser").send(newUser);
            //Assert
            expect(response.status).to.equal(400);
                
        })
    });
    describe("Post request to /newuser when data not attached", () => {
        it("Should respond with User already exists", async () => {
            //Arrange            
            const newUser = {
                "username": "",
                "password": "",
                "email": "",
                "name": ""
            };
            //Act
            const response = await request.post("/newuser").send(newUser);
            //Assert
            expect(response.status).to.equal(422);
                
        })
    });
        

    

})