
import migrationsRunner from "node-pg-migrate";
import database from "infra/database";
import { resolve } from "node:path";

const defaultMigrationOptions = {
  dryRun: true,
  dir: resolve("infra", "migrations"),
  direction: "up",
  verbose: true,
  migrationsTable: "pg_migrations",
};


async function listPendingMigrations() {
  let dbClient;

  try {
    dbClient = await database.getNewClient();

    const pendingmigrations = await migrationsRunner({
      ...defaultMigrationOptions,
      dbClient,
    });

    return pendingmigrations
  } finally {
    await dbClient?.end();
  }
}


async function runPendingMigrations() {
  let dbClient;

  try {
    dbClient = await database.getNewClient();

    const migratedMigrations = await migrationsRunner({
      ...defaultMigrationOptions,
      dbClient,
      dryRun: false,
    });

    return migratedMigrations

  } finally {
    await dbClient?.end();
  }
}

const migrator = {
  listPendingMigrations,
  runPendingMigrations
}

export default migrator
