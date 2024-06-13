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
    afterEach(async () => {
        try {
            await User.deleteMany();
            console.log("User Database Cleared");
        } catch (e) {
            console.log(e.message);
            console.log("Error Clearing Users");
            throw new Error();
        }

        // try {
        //     await Favourite.deleteMany();
        //     console.log("Favourites Database Cleared");
        // } catch (e) {
        //     console.log(e.message);
        //     console.log("Error Clearing Favourites");
        //     throw new Error();
        // }
    });
    describe("Authentification tests", () => {
        
    
        describe("New User tests", () => {

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
                
                });
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
                
                });
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
                
                });
            });
            describe("Post request to /newuser when data not attached", () => {
                it("Should respond with invalid data 400", async () => {
                    //Arrange            
                    const newUser = {
                        "username": "testGuy",
                        "password": "test",
                        "email": "testguy@test.com",
                        "name": "Test Guy"
                    };
                    await request.post("/newuser").send(newUser);
                    //Act
                    const response = await request.post("/newuser").send(newUser);

                
                    //Assert
                    expect(response.status).to.equal(400);
                
                });
            });
            describe("Attempting to register the same user twice", () => {
                it("Should respond with invalid data 422", async () => {
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
                
                });
            });
        });

        describe("Login tests", () => {
            describe("correctly entering username and password logs you in and sends a token", () => {
                it("will respond with 200 and the users username and token.", async () => {
                    //Arrange
                    const newuser = {
                        "username": "testGuy",
                        "password": "test",
                        "email": "testguy@test.com",
                        "name": "Test Guy"
                    };
                    await request.post("/newuser").send(newuser);

                    const newLogin = {
                        "username": "testGuy",
                        "password": "test"
                    };

                    //Act
                    const response = await request.post("/login").send(newLogin);
                    
                    //Assert
                    expect(response.status).to.equal(200);
                    expect(response.body).to.have.property('token')


                });
            });
            describe("incorrectly entering username and password doesn't log you in", () => {
                it("will respond with 200 and the users username and token.", async () => {
                    //Arrange
                    const newuser = {
                        "username": "testGuy",
                        "password": "test",
                        "email": "testguy@test.com",
                        "name": "Test Guy"
                    };
                    await request.post("/newuser").send(newuser);

                    const newLogin = {
                        "username": "testGuy",
                        "password": "testbad"
                    };

                    //Act
                    const response = await request.post("/login").send(newLogin);
                    
                    //Assert
                    expect(response.status).to.equal(401);
                    expect(response.body).to.not.have.property('token')


                });
            });
            describe("incorrectly entering username and password doesn't log you in", () => {
                it("will respond with 200 and the users username and token.", async () => {
                    //Arrange
                    const newuser = {
                        "username": "testGuy",
                        "password": "test",
                        "email": "testguy@test.com",
                        "name": "Test Guy"
                    };
                    await request.post("/newuser").send(newuser);

                    const newLogin = {
                        "username": "testGal",
                        "password": "testbad"
                    };

                    //Act
                    const response = await request.post("/login").send(newLogin);
                    
                    //Assert
                    expect(response.status).to.equal(401);
                    expect(response.body).to.not.have.property('token')


                });
            });        
        });
    });

    describe("Test of forecast route", () => {
        describe("making a request to /about returns an array of 5 elements",  () => {
            it("should return 200 and an array of 5 elements", async () => {
                //arrange
            
                //act
                const response = await request.get("/about/?location=Leeds,%20GB");
            
                //assert
                console.log(`code: ${response.body}`);
                expect(response.status).to.equal(200);
                expect(response.body).to.be.an('array').that.has.lengthOf(5);
            });
        });
    }); 
    
    describe("Tests of favourites routes", () => {
        let token;
        let userIDnum;

        beforeEach(async () => {
            
            const newuser = {
                "username": "testGuy",
                "password": "test",
                "email": "testguy@test.com",
                "name": "Test Guy"
            };
            await request.post("/newuser").send(newuser);

            const newLogin = {
                "username": "testGuy",
                "password": "test"
            };
            const response = await request.post("/login").send(newLogin);
            token = response.body.token;  
            
            const user = await User.findOne({ userName: "testGuy" });
            userIDnum = user._id;
        });

        afterEach(() => {
            token = null;
        })
        describe("Get Favourites returns a list of favourites", () => {
            it("Should return an array in the body of the response", async () => {
                //Arrange
                const fav1 = new Favourite({ name: "Leeds, GB", userID: userIDnum })
                fav1.save();
                const fav2 = new Favourite({ name: "London, GB", userID: userIDnum })
                fav2.save();
                
                //Act
                const response = await request.get("/favourites").set("token", token)

                //Assert
                expect(response.status).to.equal(200);
                expect(response.body).to.be.an('array').that.has.lengthOf(2);

            }); 
        });

        describe("Get Favourites refuses connections when bad token passed", () => {
            it("Should return an 401 status error", async () => {
                //Arrange
                const fav1 = new Favourite({ name: "Leeds, GB", userID: userIDnum })
                fav1.save();
                const fav2 = new Favourite({ name: "London, GB", userID: userIDnum })
                fav2.save();
                
                //Act
                const response = await request.get("/favourites").set("token", "badtoken")

                //Assert
                expect(response.status).to.equal(401);
                

            }); 
        });

        describe("Get Favourites refuses connections when no token passed", () => {
            it("Should return an 403 status error", async () => {
                //Arrange
                const fav1 = new Favourite({ name: "Leeds, GB", userID: userIDnum })
                fav1.save();
                const fav2 = new Favourite({ name: "London, GB", userID: userIDnum })
                fav2.save();
                
                //Act
                const response = await request.get("/favourites")

                //Assert
                expect(response.status).to.equal(403);
                

            }); 
        });
        
    });
});