// src/database/migrations/20241109202134_create-jobs.ts
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
export {
  down,
  up
};
//# sourceMappingURL=20241109202134_create-jobs.mjs.map