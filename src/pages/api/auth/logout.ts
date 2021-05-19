import { removeTokenCookie } from "../../../lib/auth-cookies";

export default (req, res) => {
  removeTokenCookie(res);
  res.redirect("/");
};
