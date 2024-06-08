import Config from "./config/Config.js";
import Database from "./db/Database.js";
import Server from "./server/Server.js"
import AllRoutes from "./routes/AllRoutes.js"

Config.load();
const { PORT, HOST, DB_URI } = process.env;

const allRoutes = new AllRoutes();

const server = new Server(PORT, HOST, allRoutes);
const database = new Database(DB_URI)

server.start();
await database.connect();