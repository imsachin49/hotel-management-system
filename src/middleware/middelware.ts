import express from "express";

export function middleWare(
  error: Error,
  _req: express.Request,
  res: express.Response,
  _next: express.NextFunction
) {
  res.status(500).send(error.message);
}
