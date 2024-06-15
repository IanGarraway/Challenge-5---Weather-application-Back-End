import { Router } from "express";
import { body, validationResult } from "express-validator";
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
            
            res.header("Access-Control-Allow-Origin", "http://localhost:5173"); 
            res.header("Access-Control-Allow-Methods", "GET, POST");
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-access-token");
            res.header("Access-Control-Allow-Credentials", "true");
            next();
        });

        //Auth routes
        this.#router.post('/newuser', [
            
            body(`email`).exists().normalizeEmail().notEmpty().escape().isEmail(),
            body(`username`).exists().notEmpty().escape(),
            body('password').exists().notEmpty().escape(),
            VerifySignUp.VerifyUser
        ], this.#controller.signup);

        this.#router.post('/login', [
            body(`username`).exists().notEmpty().escape(),
            body('password').exists().notEmpty().escape()
            
        ], this.#controller.login);

        this.#router.post('/changepassword', [
            body(`username`).exists().notEmpty().escape(),
            body('password').exists().notEmpty().escape(),
            body('newpassword').exists().notEmpty().escape(),
            LoginValidator.verifyToken
        ], this.#controller.changePassword);
        

        //User routes
        this.#router.get('/about', this.#controller.getForecast)

        this.#router.get('/favourites', [LoginValidator.verifyToken
        ], this.#controller.getFavourites);
        
        this.#router.post(`/addfavourite`, [
            body('name').exists().notEmpty().withMessage('Name is required').escape(),
            LoginValidator.verifyToken
        ], this.#controller.addFavourite);

        this.#router.post(`/remfav`, [
            body('favID').exists().notEmpty().escape(),
            LoginValidator.verifyToken
        ], this.#controller.remFavourite);      
    };

    getRouter = () => { return this.#router; };
    getRouteStartPoint = () => { return this.#routeStartPoint; };
}