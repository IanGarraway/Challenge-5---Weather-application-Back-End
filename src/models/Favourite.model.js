import { Schema, model } from "mongoose";

const favouriteSchema = new Schema({
    name: { type: String, required: true },
    userID: { type: String, required: true },
});

const Favourite = model("Favourite", favouriteSchema);

export default Favourite;