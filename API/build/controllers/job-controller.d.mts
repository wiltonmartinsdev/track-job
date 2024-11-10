import { Request, Response, NextFunction } from 'express';

declare class JobController {
    index(request: Request, response: Response, next: NextFunction): Promise<void>;
    create(request: Request, response: Response, next: NextFunction): Promise<void>;
    update(request: Request, response: Response, next: NextFunction): Promise<void>;
    delete(request: Request, response: Response, next: NextFunction): Promise<void>;
}

export { JobController as default };
