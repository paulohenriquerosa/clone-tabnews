import { createRouter } from "next-connect";

import database from "infra/database.js";
import controller from "infra/controller.js";

const router = createRouter();

router.get(getHandler);

export default router.handler(controller.errorHandlers);

async function getHandler(request, response) {
  const updatedAt = new Date().toISOString();

  const databaseName = process.env.POSTGRES_DB;

  const databaseVersion = await database.query("SHOW server_version;");
  const databaseMaxConnection = await database.query("SHOW max_connections;");
  const databaseOpenedConnection = await database.query({
    text: "SELECT COUNT(*)::int FROM pg_stat_activity WHERE datname=$1;",
    values: [databaseName],
  });

  return response.status(200).json({
    updated_at: updatedAt,
    dependecies: {
      database: {
        version: databaseVersion.rows[0].server_version,
        max_connections: parseInt(
          databaseMaxConnection.rows[0].max_connections,
        ),
        opened_connections: databaseOpenedConnection.rows[0].count,
      },
    },
  });
}
