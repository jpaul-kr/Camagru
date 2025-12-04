import { registerUser } from "./api/register.js";

export const routes = {
  '/register-user': {
    METHOD: 'POST',
    HANDLER: registerUser
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