import http, { get } from "http";
import { routeHandler } from "./routes.js";

const PORT = 3000;
const server = http.createServer((req, res) => {
  res.setHeader("Access-Control-Allow-Origin", `http://localhost:8443`);
  //res.setHeader("Access-Control-Allow-Origin", `*`)
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") {
    res.writeHead(204);
    return res.end();
  }
  routeHandler(req, res);
});


server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});