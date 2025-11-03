import http, { get } from "http";
//import {getNumber} from "./getNumber.js";
import { routeHandler } from "./routes.js";

const PORT = 3000;
const server = http.createServer(routeHandler);

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});