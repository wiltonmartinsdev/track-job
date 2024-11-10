// src/utils/AppError.ts
var AppError = class {
  message;
  statusCode;
  constructor(message, statusCode = 400) {
    this.message = message;
    this.statusCode = statusCode;
  }
};
export {
  AppError as default
};
//# sourceMappingURL=AppError.mjs.map