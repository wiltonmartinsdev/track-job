declare class AppError {
    message: string;
    statusCode: number;
    constructor(message: string, statusCode?: number);
}

export { AppError as default };
