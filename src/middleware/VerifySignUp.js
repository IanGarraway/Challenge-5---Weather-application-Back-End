import db from "../models/index.js";

export default class VerifySignUp{

    

    static VerifyUser = async (req, res, next) => {
        try{
        const User = db.user;

        const usernameUser = await User.findOne({ userName: req.body.username });
        
        if (usernameUser) {
            return res.status(400).send({ message: `Failed! Username is already in use!` });
        }

        const emailUser = await User.findOne({ email: req.body.email });

        if (emailUser) {
            return res.status(400).send({ message: `Failed! Email already in use` });
        }

        next();

        }catch(err) {
                res.status(500).send({ message: err.message || "Some error occurred while verifying user." });
        }
    };
}