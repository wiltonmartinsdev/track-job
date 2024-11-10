// src/middlewares/error-handling.ts
import { ZodError } from "zod";

// src/utils/AppError.ts
var AppError = class {
  message;
  statusCode;
  constructor(message, statusCode = 400) {
    this.message = message;
    this.statusCode = statusCode;
  }
};

// src/middlewares/error-handling.ts
function errorHandling(error, request, response, _) {
  if (error instanceof AppError) {
    response.status(error.statusCode).json({ message: error.message });
  } else if (error instanceof ZodError) {
    response.status(400).json({ message: "Validation error", issues: error.format() });
  } else {
    response.status(500).json({ message: error.message });
  }
}
export {
  errorHandling as default
};
//# sourceMappingURL=error-handling.mjs.map