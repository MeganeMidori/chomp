import {Request, Response} from 'express';

import { removeTokenCookie } from "../../../lib/auth-cookies";

export default (_req: Request, res: Response) => {
  removeTokenCookie(res);
  res.redirect("/");
};
