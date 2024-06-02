import { config } from "dotenv";

export default class Config {
    static #env = process.env.NODE_ENV;

    static load = () => {
        config({
            path: `.env${Config.#env !== `prod` ? `.${Config.#env}` : ``}`,
        });
    };
}
