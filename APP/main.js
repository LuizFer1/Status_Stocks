
const button = document.querySelector('button')

button.addEventListener('click', (event) => {
    console.log(event)

    const inputStock = document.getElementById('pesquisa')
    searchingStocks(inputStock.value);

})


async function searchingStocks(stock) {
    const acaoAPI = await fetch(`https://brapi.dev/api/quote/${stock}%2C%5EBVSP?range=1d&interval=1d&fundamental=true&dividends=true`)
    const acao = await acaoAPI.json()

    const container = document.getElementById('container')

    const containerInput = document.getElementById('container-inputs')

    containerInput.classList.add('border-line')

    container.innerHTML += `<div class="container-card-acao">
                                 <img src="${acao.results[0].logourl}" alt="${acao.results[0].LongName}" class="acao-logo">
                                 <div class="container-card-text">
                                    <h1 class="acao">${acao.results[0].symbol}</h1>
                                    <p class="nome-acao">${acao.results[0].longName }</p>
                                    <div>
                                        <p class="preco-acao">R$ ${acao.results[0].regularMarketPrice}</p>
                                    </div>
                                 </div>
                             </div>` 
    console.log(acao.results[0])
}