import { Router, Request, Response } from "express";

const router: Router = Router();

router.get(["/", "/api"], (req: Request, res: Response): void => {
  res.send("Welcome!");
});

export default router;
