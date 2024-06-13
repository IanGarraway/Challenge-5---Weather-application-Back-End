// can't catch errors outside of method call? 

// import bcrypt from "bcrypt";
// import User from "../models/User.model.js";

// export default class ChangePasswordService{
//     ChangePassword = async ({ username, password, newpassword }, idNum, res) => {
//         try {
            
        
//             const user = await User.findOne({ userName: username });

//             if (!user) { throw new Error("Invalid login details"); }
        
//             const passwordMatches = await bcrypt.compare(password, user.userPassword);
       

//             if (!passwordMatches && user._id === idNum) { throw new Error("Invalid login details"); }
            
        
//             user.userPassword = bcrypt.hashSync(newpassword, 8);

//             await user.save();
//             return user;
//         } catch (error) {
//             res.st
//         }
//     }
// }