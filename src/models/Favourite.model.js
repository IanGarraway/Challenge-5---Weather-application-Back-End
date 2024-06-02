import { Schema, model } from "mongoose";

const favouriteSchema = new Schema({
    name: { type: String, required: true },
    userID: { type: String, required: true },
});

const User = model("User", userSchema);

export default User;