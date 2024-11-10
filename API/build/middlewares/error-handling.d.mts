import { Request, Response, NextFunction } from 'express';

declare function errorHandling(error: any, request: Request, response: Response, _: NextFunction): void;

export { errorHandling as default };
