import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
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

export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable("jobs");
}
