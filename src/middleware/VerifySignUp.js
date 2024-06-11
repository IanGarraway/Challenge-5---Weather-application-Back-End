import db from "../models/index.js";

export default class VerifySignUp{

    

    static VerifyUser = (req, res, next) => {
        const User = db.user;
        User.findOne({
            userName: req.body.username
        }).exec()
            .then(usernameUser => {
                if (usernameUser) {
                    res.status(400).send({ message: `Failed! Username is already in use!` });
                    return;
                }
                return User.findOne({ email: req.body.email }).exec();
            })
            .then(emailUser => {
                if (emailUser) {
                    return res.status(400).send({ message: `Failed! Email already in use` });
                }
                next();
            })
            .catch(err => {
                res.status(500).send({ message: err.message || "Some error occurred while verifying user." });
            });
        
    };

}