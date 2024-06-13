
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
            
            let favourites = await this.#favService.getFavourites(req.userId)            
            res.json(favourites);
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

    signup = async (req, res) => {
        try {
            const errors = validationResult(req);            
            if (!errors.isEmpty()) {
                return res.status(422).json({ message: 'Validation failed', errors: errors.array() });
            } 

            const user = new User({
                userName: req.body.username,
                userPassword: bcrypt.hashSync(req.body.password, 8),
                email: req.body.email,
                name: req.body.name
            });            

            await user.save()

            return res.status(201).send({ message: `User was registered successfully` });
                
                
        } catch (err) {
            console.log(err);
            
            return res.status(500).send({ message: err.message || `Some error occurred while registering` }); 
        }
        
        
    }

    login = async (req, res) => {
        try {            
            const user = await this.#loginService.login(req.body);            
            res.status(200).send({
                message: "User has logged in",
                token: user.Token
            });
        } catch (error) {
            res.status(401).json(error);
        }
                
    }
    
}