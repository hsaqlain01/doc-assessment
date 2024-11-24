import { Request, Response } from 'express';

interface HomeController {
  getHome(req: Request, res: Response): void;
}

const homeController: HomeController = {
  getHome: (req: Request, res: Response): void => {
    res.send('Welcome!');
  },
};

export default homeController;
