// src/database/knex.ts
import { knex as knexConfig } from "knex";

// knexfile.ts
var knexfile_default = {
  client: "sqlite3",
  connection: {
    filename: "./src/database/database.db"
  },
  useNullAsDefault: true,
  migrations: {
    extension: "ts",
    directory: "./src/database/migrations"
  }
};

// src/database/knex.ts
var knex = knexConfig(knexfile_default);
export {
  knex
};
//# sourceMappingURL=knex.mjs.map