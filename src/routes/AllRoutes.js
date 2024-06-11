import { Router } from "express";
import { body } from "express-validator";
import TravelController from "../controllers/Travel.Controller.js";

import FavouriteValidator from "../middleware/Favourite.validator.js";
import LoginValidator from "../middleware/Login.Validator.js";
import VerifySignUp from "../middleware/VerifySignUp.js";


export default class AllRoutes{

    #controller;
    #router;
    #routeStartPoint;

    constructor(controller = new TravelController(), routeStartPoint = "/") {
        this.#controller = controller;
        this.#routeStartPoint = routeStartPoint;
        this.#router = Router();
        this.#initialiseRoutes();
    }

    #initialiseRoutes = () => {  
                // CORS middleware to set headers
        this.#router.use((req, res, next) => {
            res.header(
                "Access-Control-Allow-Headers",
                "x-access-token, Origin, Content-Type, Accept"
            );
            next();
        });

        //Auth routes
        this.#router.post('/newuser', [
            body(`email`).exists().normalizeEmail().escape().isEmail(),
            body(`username`).exists().escape(),
            body('password').exists().escape(),
            VerifySignUp.VerifyUser
        ], this.#controller.signup);
        

        //User routes
        this.#router.get('/about', this.#controller.getForecast)

        this.#router.get('/favourites', [LoginValidator.verifyToken             
         ], this.#controller.getFavourites);
    };

    getRouter = () => { return this.#router; };
    getRouteStartPoint = () => { return this.#routeStartPoint; };
}