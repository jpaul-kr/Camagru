import http from "http";
import { handleRequest } from "./router.js";

const PORT = 8000;
const server = http.createServer(handleRequest);

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});