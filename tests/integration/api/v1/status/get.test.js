
import orchaestrator from "tests/orchestrator"


beforeAll(async () => {
  await orchaestrator.waitForAllServices()
})


test("GET to /api/v1/status should return 200", async () => {
  const response = await fetch("http://localhost:3000/api/v1/status")

  expect(response.status).toBe(200)

  const responseBody = await response.json()
  expect(responseBody.updated_at).toBeDefined()

  const parsedUpdatedAt = new Date(responseBody.updated_at).toISOString()
  expect(responseBody.updated_at).toEqual(parsedUpdatedAt)

  const { database } = responseBody.dependecies

  expect(database.version).toBeDefined()
  expect(database.version).toEqual('16.0')

  expect(database.max_connections).toBeDefined()
  expect(database.max_connections).toEqual(100)

  expect(database.opened_connections).toBeDefined()
  expect(database.opened_connections).toEqual(1)

})
