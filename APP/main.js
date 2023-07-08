import { conectaApi } from "./Api.js"


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

function criarCard(nome,img,papel,price){
    return (
        `<div class="container-card">
            <img src="${img}" alt="${nome}" class="acao-logo">
            
            <div class="card-text">
                <p class="acao-stock">
                    ${papel}
                </p>
                <p class="acao-name">
                    ${nome}
                </p>
                <p class="preco-acao">
                R$ ${parseFloat(price).toFixed(2)}
                </p>
            </div>
        </div>` 
    )
}

async function searchingStocks(stock) {
    const acao = await conectaApi.acaoEspecifica(stock)

    if(acao.results[0].error){

        const container = document.getElementById('container-stock')
        container.classList.add('display-none')
        container.innerHTML = ""
        
        const errorImage = document.getElementById("image-not-found")
        
        errorImage.classList.remove('display-none')

    }else{

        const container = document.getElementById('container-stock')
        container.classList.remove('display-none')
        container.classList.add('container-stocks')

        container.innerHTML = ""

        container.innerHTML += criarCard()

    }
    
    console.table(await acao.results)
}

async function listStocks(){
    const errorImage = document.getElementById("image-not-found")
        
    errorImage.classList.add('display-none')

    const acao = await conectaApi.listaAcao()

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