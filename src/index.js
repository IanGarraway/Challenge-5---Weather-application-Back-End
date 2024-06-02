import Config from "./config/Config.js";
import Server from "./server/Server.js"
import AllRoutes from "./routes/AllRoutes.js"

Config.load();
const { PORT, HOST, DB_URI } = process.env;

const allRoutes = new AllRoutes();

const server = new Server(PORT, HOST, allRoutes);

server.start();