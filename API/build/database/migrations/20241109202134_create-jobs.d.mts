import { Knex } from 'knex';

declare function up(knex: Knex): Promise<void>;
declare function down(knex: Knex): Promise<void>;

export { down, up };
