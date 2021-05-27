import {Request, Response} from 'express';

import { getLoginSession } from '../../lib/auth'

export default async function user(req: Request, res: Response) {
  try {
    const session = await getLoginSession(req)
    let user;
    if (session) {
        user = {
            id: session.id,
            display_name: session.display_name
        }
    }

    res.status(200).json({ user })
  } catch (error) {
    console.error(error)
    res.status(500).end('Authentication token is invalid, please log in')
  }
}
