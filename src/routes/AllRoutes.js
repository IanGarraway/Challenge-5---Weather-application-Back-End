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
         this.#router.get('/example', (req, res) => {
            res.send('Example route');
        });
    };

    getRouter = () => { return this.#router; };
    getRouteStartPoint = () => { return this.#routeStartPoint; };
}