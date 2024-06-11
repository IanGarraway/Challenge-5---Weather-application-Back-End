import mongoose from "mongoose";
import User from "./User.model.js";
import Favourite from "./Favourite.model.js";

mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.user = User;
db.favourite = Favourite;

export default db;
