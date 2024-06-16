
import bcrypt from "bcrypt";
//import ChangePasswordService from "../services/ChangePassword.service.js"; doesn't throw errors properly.
import db from "../models/index.js";
import FavouritesService from "../services/Favourites.service.js"
import LoginService from "../services/Login.service.js"
import ForecastService from "../services/Forecast.service.js"
import User from "../models/User.model.js"
import {  validationResult } from "express-validator"
import jwt from "jsonwebtoken";




export default class TravelController{
    #favService
    #forecastService
    #loginService
    //#changePasswordService

    #User = db.user;
    #Favourite = db.favourite;

    
    
    constructor(favService = new FavouritesService(), loginService = new LoginService(), forecastService = new ForecastService ) {
        this.#favService = favService;
        this.#loginService = loginService;
        this.#forecastService = forecastService;
        //this.#changePasswordService = changePasswordService;
    }
    //User options

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

    addFavourite = async (req, res) => {
        try {
            const errors = validationResult(req); 
            if (!errors.isEmpty()) {
                return res.status(422).json({ message: 'Validation failed', errors: errors.array() });
            } 
            
            let favourite = await this.#favService.addFavourite(req.body.name, req.userId) 

            if (!(favourite instanceof Error)) {
                                const payload = await this.#favService.getFavourites(req.userId)
                
                return res.status(200).json({ message: "Favourite added", favourites: payload })
            } else {
                
                if (favourite.message === "Data already exists") {                    
                    return res.status(400).json({ message: favourite.message });
                }
                throw new Error();
            }
        } catch (e) {
            return res.status(500).json({ message: e.message });
        }
    
    };

    remFavourite = async (req, res) => {
        try {               
            const errors = validationResult(req); 
            if (!errors.isEmpty()) {
                return res.status(422).json({ message: 'Validation failed', errors: errors.array() });
            } 
            let favourite = await this.#favService.remFavourite(req.body.favID, req.userId) 

            if (!(favourite instanceof Error)) {
                                const payload = await this.#favService.getFavourites(req.userId)
                
                return res.status(200).json({ message: "Favourite removed", favourites: payload })
            } else {
                
                if (favourite.message === "Favourite doesn't exist") {                    
                    return res.status(400).json({ message: favourite.message });
                }
                throw new Error();
            }
        } catch (e) {
            return res.status(500).json({ message: e.message });
        }
        
    }

    //Account Functions

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
            res.status(200)
                .cookie('token', user.Token, {
                    httpOnly: true,
                    secure: false,
                    sameSite: 'Strict',
                    maxAge: 86400000
                })
                .send({ message: "User has logged in", username: user.userName }
            );
        } catch (error) {
            res.status(401).json(error);
        }
                
    }

    changePassword = async (req, res) => {
        try {       
            const { username, password, newpassword } = req.body;

            const user = await User.findOne({ userName: username });

            if (!user) { throw new Error("Invalid login details"); }
        
            const passwordMatches = await bcrypt.compare(password, user.userPassword);       

            if (!passwordMatches && user._id === idNum) { throw new Error("Invalid login details"); }            
        
            user.userPassword = bcrypt.hashSync(newpassword, 8);

            await user.save();
            
            res.status(200).send({ message: "Password updated" });
        } catch (error) {
            res.status(401).json(error);
        }
    }
    
}