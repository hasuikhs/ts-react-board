import { Request, Response, Router } from 'express';
import jwt from 'jsonwebtoken';
import verifyToken from '../utils/verifyToken';
import DataManager from '../service/impl/dataManager';
require('dotenv').config();

const jwtRouter: Router = Router();

jwtRouter.post('/', async (req: Request, res: Response) => {
  try {
    const id: string = req.body.id;
    const name: string = req.body.password;

    const userDataManager = new DataManager('user');

    let ret = await userDataManager.login(id, name);

    if (ret === 'fail') {
      return res.status(401).json({
        code: 401,
        message: 'Unauthorized'
      });
    }

    const token =  jwt.sign({
      id, name
    }, process.env.JWT_SECRET as string, {
      expiresIn: '3m',
      issuer: 'issuer'
    });

    return res.status(200).json({
      code: 200,
      message: 'Issue token.',
      token
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      code: 500,
      message: 'Server error.'
    });
  }
});

jwtRouter.get('/test', verifyToken, (req: Request, res: Response) => {
  res.json(req.body.decoded);
});

export default jwtRouter;