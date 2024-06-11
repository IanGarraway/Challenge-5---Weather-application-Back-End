import bcrypt from "bcrypt";
import db from "../models/index.js";
import FavouritesService from "../services/Favourites.service.js"
import LoginService from "../services/Login.service.js"
import ForecastService from "../services/Forecast.service.js"
import User from "../models/User.model.js"
import { validationResult } from "express-validator"
import jwt from "jsonwebtoken";




export default class TravelController{
    #favService
    #forecastService
    #loginService

    #User = db.user;
    #Favourite = db.favourite;

    
    
    constructor(favService = new FavouritesService(), loginService = new LoginService(), forecastService = new ForecastService) {
        this.#favService = favService;
        this.#loginService = loginService;
        this.#forecastService = forecastService;
    }

    getFavourites = async (req, res) => {
        try {
            res.json(await this.#favService.getFavourites());
        } catch (e) {
            res.status(500).json({ message: e.message });
        }
    };

    getForecast = async (req, res) => {
        try {
            let location = req.query.location;                      
            res.json(await this.#forecastService.getForecast(location));
        } catch (e) {
            res.status(500).json({ message: e.message });
        }
    };

    signup = (req, res) => {
        try {
            const errors = validationResult(req);
            console.log(errors);
            if (!errors.isEmpty()) {
                const err = new Error(`Validation failed`);
                err.statusCode = 422;
                err.data = errors.array();
                throw err;
            }
        } catch (err) {
            console.log(err);
            return res.status(err.statusCode ?? 500).send({ message: err.data });
        }
        console.log(`name: ${req.body.name}`);

        
        const user = new User({            
            userName: req.body.username,
            userPassword: bcrypt.hashSync(req.body.password, 8),
            email: req.body.email,            
            name: req.body.name
        });

        user.save()
            .then(user => {
                return res.status(201).send({ message: `User was registered successfully` });
            })
            .catch(err => {
                return res.status(500).send({ message: err.message || "Some error occurred while registering the user" });
            });
        
    }
    
}