import { checkUserData, registerUser } from "./api/register.js";
import { sendConfirmationEmail } from "./api/sendEmail.js";

export const routes = {
  '/check-user-data': {
    METHOD: 'POST',
    HANDLER: checkUserData
  },
  '/send-confirmation-email': {
    METHOD: 'POST',
    HANDLER: sendConfirmationEmail
  },
  '/register-user': {
    METHOD: 'GET',
    HANDLER: registerUser
  }
}

export function routeHandler(req, res) {
  const {url, method} = req;
  const urlPath = new URL(req.url, `http://${req.headers.host}`).pathname;
  console.log(`Received ${method} request for ${urlPath}`);
  const path = routes[urlPath];

  if (!path || path.METHOD !== method) {
    res.statusCode = 404;
    res.end('Not Found');
    return;
  }
  path.HANDLER(req, res);
}