import { Request, Response } from "express";

export type CtxType = {
  req: Request;
  res: Response;
};
