import database from "../../../../infra/database.js"

async function stauts(request, response){
    const result = await database.query("SELECT 1+1 AS SUM;")
    console.log(result.rows)
    return response.status(200).json({chave: "valor"})
}

export default stauts