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

// src/database/migrations/20241109202134_create-jobs.ts
var create_jobs_exports = {};
__export(create_jobs_exports, {
  down: () => down,
  up: () => up
});
module.exports = __toCommonJS(create_jobs_exports);
async function up(knex) {
  await knex.schema.createTable("jobs", (table) => {
    table.increments("id").primary();
    table.text("company_name").notNullable();
    table.text("position").notNullable();
    table.text("seniority_level").notNullable();
    table.text("vacancy_modality").notNullable();
    table.text("work_regime").notNullable();
    table.text("place").notNullable();
    table.text("status").notNullable();
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at").defaultTo(knex.fn.now());
    table.integer("total_application").defaultTo(0);
  });
}
async function down(knex) {
  await knex.schema.dropTable("jobs");
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  down,
  up
});
//# sourceMappingURL=20241109202134_create-jobs.js.map