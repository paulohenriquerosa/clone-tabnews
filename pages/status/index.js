import useSWR from "swr";

async function fetchAPI(key) {
  const response = await fetch("http://localhost:3000" + key);
  const responseBody = await response.json();

  return responseBody;
}


export default function StatusPage() {

  const response = useSWR("/api/v1/status", fetchAPI, {
    refreshInterval: 1000,
  });

  return (
    <>
      <h1>Status</h1>
      <UpdatedAt />
      <DatabaseStatus />
    </>
  )
}

function UpdatedAt() {
  const { isLoading, data } = useSWR("/api/v1/status", fetchAPI, {
    refreshInterval: 1000,
  });

  let updatedAtText = "Carregando..."

  if (!isLoading && data) {
    updatedAtText = new Date(data.updated_at).toLocaleString("pt-BR");
  }

  return (
    <div>
      Última atualização: {updatedAtText}
    </div>
  )
}

function DatabaseStatus() {

  const { isLoading, data } = useSWR("/api/v1/status", fetchAPI, {
    refreshInterval: 1000,
  });

  if (isLoading && !data) {
    return <div>Carregando...</div>
  }

  return (
    <div>
      Database:
      <ul>
        <li>Version: {data.dependecies.database.version}</li>
        <li>Max connections: {data.dependecies.database.max_connections}</li>
        <li>Opened connections: {data.dependecies.database.opened_connections}</li>
      </ul>
    </div>
  )

}
