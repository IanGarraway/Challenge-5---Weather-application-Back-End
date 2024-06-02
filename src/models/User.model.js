import { Schema, model } from "mongoose";

const userSchema = new Schema({
    userName: { type: String, required: true },
    userPassword: { type: String, required: true },
});

const User = model("User", userSchema);

export default User;