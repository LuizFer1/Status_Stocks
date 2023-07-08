
async function acaoEspecifica(stock){
    const conexaoAPI = await fetch(`https://brapi.dev/api/quote/${stock}%2C%5EBVSP?range=1d&interval=1d&fundamental=true&dividends=true`)
    const conexaoJson = await conexaoAPI.json()

    console.log(conexaoJson.results[0].error)

    return conexaoJson
}

async function listaAcao(){
    const conexaoAPI = await fetch(`https://brapi.dev/api/quote/list?sortBy=name&sortOrder=desc&limit=12`)
    const conexaoJson = await conexaoAPI.json()

    return conexaoJson
}

export const conectaApi = {
    acaoEspecifica,
    listaAcao
}