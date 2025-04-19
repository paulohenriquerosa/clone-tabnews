import migrationsRunner from "node-pg-migrate";
import { createRouter } from "next-connect";
import { resolve } from "node:path";

import database from "infra/database";
import controller from "infra/controller.js";

const router = createRouter();

router.get(getHandler);
router.post(postHandler);

export default router.handler(controller.errorHandlers);

const defaultMigrationOptions = {
  dryRun: true,
  dir: resolve("infra", "migrations"),
  direction: "up",
  verbose: true,
  migrationsTable: "pg_migrations",
};

async function getHandler(request, response) {
  let dbClient;

  dbClient = await database.getNewClient();

  const pendingmigrations = await migrationsRunner({
    ...defaultMigrationOptions,
    dbClient,
  });

  await dbClient.end();

  return response.status(200).json(pendingmigrations);
}

async function postHandler(request, response) {
  let dbClient;

  dbClient = await database.getNewClient();

  const migratedMigrations = await migrationsRunner({
    ...defaultMigrationOptions,
    dbClient,
    dryRun: false,
  });

  if (migratedMigrations.length > 0) {
    return response.status(201).json(migratedMigrations);
  }

  await dbClient.end();

  return response.status(200).json(migratedMigrations);
}
