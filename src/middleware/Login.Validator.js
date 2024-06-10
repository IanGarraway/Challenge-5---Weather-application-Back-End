import * as expressValidator from "express-validator"
import jwt from 'jsonwebtoken';
import User from "../models/User.model.js";

export default class LoginValidator{

    static verifyToken = (req, res, next) => {
        let token = req.headers["x-access-token"];

        if (!token) {
            return res.status(403).send({ message: `Unauthorised` });
        }
        jwt.verify(token, process.env.SECRET, (err, decoded) => {
            if (err) {
                return res.status(401).send({ message: 'Unauthorised' });
            }
        })
        req.userId = decoded.id;
        next();
    }
    
}