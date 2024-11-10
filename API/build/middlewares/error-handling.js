"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/middlewares/error-handling.ts
var error_handling_exports = {};
__export(error_handling_exports, {
  default: () => errorHandling
});
module.exports = __toCommonJS(error_handling_exports);
var import_zod = require("zod");

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
  } else if (error instanceof import_zod.ZodError) {
    response.status(400).json({ message: "Validation error", issues: error.format() });
  } else {
    response.status(500).json({ message: error.message });
  }
}
//# sourceMappingURL=error-handling.js.map