import bcrypt from 'bcrypt';
import User from "../models/User.model.js";
import jwt from 'jsonwebtoken';

export default class LoginService{
    login = async ({ username, password }) => {        
        
        const user = await User.findOne({ userName: username });
        
        if (!user) {
            
            throw new Error("Invalid login details");
        }

        
        const passwordMatches = await bcrypt.compare(password, user.userPassword);
        
        

        if (passwordMatches) {
            
            const token = jwt.sign({
                id: user._id,
                username: user.userName
            }, process.env.SECRET, {
                expiresIn: 86400,
            });
            user.Token = token;
            
            return user;
        } else {
            throw new Error("Invalid login details");
        }
    };
    
}