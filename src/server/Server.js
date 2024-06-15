import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';

export default class Server {
    #app;
    #host;
    #port;
    #router;
    #server;

    constructor(port, host, router) {
        this.#app = express();
        this.#port = port;
        this.#host = host;
        this.#server = null;
        this.#router = router;
    }

    getApp = () => {
        return this.#app;
    }

    start = () => {
        const corsOptions = {
            origin: 'http://localhost:5173', // Allow only the React frontend origin
            credentials: true, // Allow credentials (cookies)
            methods: ['GET', 'POST' ], // Allowed methods
            allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'x-access-token'], // Allowed headers
        };
        
        this.#app.use(cors(corsOptions))
        this.#app.use(express.json());
        this.#app.use(cookieParser())
        this.#app.use(
            this.#router.getRouteStartPoint(),
            this.#router.getRouter()
        );

        this.#server = this.#app.listen(this.#port, this.#host, () => {
            console.log(`Server is listening on http://${this.#host}:${this.#port}`);
        });
    };

    close = () => {
        this.#server.close();
    }
}