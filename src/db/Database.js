import mongoose from "mongoose";

export default class Database{
    #uri;

    constructor(uri) {
        this.#uri = uri;        
    }

    connect = async (attempt = 0) => {
        try {
            await mongoose.connect(this.#uri);
            return console.log(`Database connection ${this.#uri} was successful`);

        } catch (e) {
            console.log("Database connection error", e);
            
            if (attempt < 10) setTimeout(() => this.connect(attempt + 1))
            else console.log(`Database unavailable`);
        }
    }

    close = async () => {
        await mongoose.disconnect();
    };
}