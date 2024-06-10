import { Router } from "express";
import TravelController from "../controllers/Travel.Controller.js";

import FavouriteValidator from "../middleware/Favourite.validator.js";
import LoginValidator from "../middleware/Login.Validator.js";


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
        this.#router.get('/about', this.#controller.getForecast)

        //User routes
        this.#router.get('/favourites', [LoginValidator.verifyToken             
         ], this.#controller.getFavourites);
    };

    getRouter = () => { return this.#router; };
    getRouteStartPoint = () => { return this.#routeStartPoint; };
}