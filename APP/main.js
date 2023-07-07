
const button = document.querySelector('i')
    
button.addEventListener('click', (event) => {
    console.log(event)

    const inputStock = document.getElementById('pesquisa')

    console.log(inputStock.value)

    if(inputStock.value === ''){
        listStocks()
    }else{
        searchingStocks(inputStock.value);
    }
})


async function searchingStocks(stock) {
    const acaoAPI = await fetch(`https://brapi.dev/api/quote/${stock}%2C%5EBVSP?range=1d&interval=1d&fundamental=true&dividends=true`)
    const acao = await acaoAPI.json()

    console.log(toString(acao.status))

    
            
    const errorImage = document.getElementById("image-not-found")

    errorImage.classList.add('display-none')

    const container = document.getElementById('container-stock')

    container.classList.add('container-stocks')

    container.innerHTML = ""

    container.innerHTML += `<div class="container-card">
                                <img src="${acao.results[0].logourl}" alt="${acao.results[0].longName}" class="acao-logo">
                                
                                <div class="card-text">
                                    <p class="acao-stock">
                                        ${acao.results[0].symbol}
                                    </p>
                                    <p class="acao-name">
                                        ${acao.results[0].longName}
                                    </p>
                                    <p class="preco-acao">
                                    R$ ${parseFloat(acao.results[0].regularMarketPrice).toFixed(2)}
                                    </p>
                                </div>
                            </div>` 
    
    console.log(acao.results[0])
}

async function listStocks(){
    const acaoAPI = await fetch(`https://brapi.dev/api/quote/list?sortBy=volume&sortOrder=asc&limit=12`)
    const acao = await acaoAPI.json()
    const container = document.getElementById('container-stock')
    container.innerHTML = ""

    container.classList.add('container-stocks')

    console.table(acao.stocks)


    acao.stocks.forEach(element => {
        

        container.innerHTML += `
        <div class="container-card">
            
            <img src="${element.logo}" alt="${element.name}" class="acao-logo">
            
            <div class="card-text">
                <p class="acao-stock">
                    ${element.stock}
                </p>
                <p class="acao-name">
                    ${element.name}
                </p>
                <p class="preco-acao">
                   R$ ${parseFloat(element.close).toFixed(2)}
                </p>
            </div>
        </div>` 
    });
}

listStocks()