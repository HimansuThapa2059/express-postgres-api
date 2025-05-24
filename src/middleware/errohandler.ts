import { ErrorRequestHandler, Request, Response, NextFunction } from "express";

const errorHandler: ErrorRequestHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err.message || err.name) console.log(err.name, err.message);

  res.status(500).json({
    status: req.statusCode,
    message: "Something went wrong",
    error: err.message,
  });

  next();
};

export default errorHandler;
