import { getNumber } from "./getNumber.js";

export const routes = {
  '/get-number': {
    METHOD: 'GET',
    HANDLER: getNumber
  }
}

export function routeHandler(req, res) {
  const {url, method} = req;

  const path = routes[url];

  if (!path || path.METHOD !== method) {
    res.statusCode = 404;
    res.end('Not Found');
    return;
  }
  path.HANDLER(req, res);
}