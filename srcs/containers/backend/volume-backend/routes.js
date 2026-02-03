import { checkUserData, registerUser } from "./api/register.js";
import { sendConfirmationEmail, sendForgotPasswordEmail } from "./api/sendEmail.js";
import { checkEmail } from "./api/chackData.js";
import { resetPassword } from "./api/resetPassword.js";


export const routes = {
  '/check-user-data': {
    METHOD: 'POST',
    HANDLER: checkUserData
  },
  '/send-confirmation-email': {
    METHOD: 'POST',
    HANDLER: sendConfirmationEmail
  },
  '/send-forgot-password-email': {
    METHOD: 'POST',
    HANDLER: sendForgotPasswordEmail
  },
  '/register-user': {
    METHOD: 'GET',
    HANDLER: registerUser
  },
  '/check-email-exists': {
    METHOD: 'POST',
    HANDLER: checkEmail
  },
  '/reset-password': {
    METHOD: 'POST',
    HANDLER: resetPassword
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