const API_BASE_URL = 'https://open.er-api.com/v6/latest/'
let taxas = {} 

const fetchData = async (url) => {
    const response = await fetch(url)
    return response.json()
}

async function carregarMoedas() {
    const moedaBase = 'USD'
    await carregarTaxas(moedaBase) 
}

async function carregarTaxas(moeda) {
    try {
        const data = await fetchData(API_BASE_URL + moeda)
        if (data && data.result === "success" && data.rates) {
            taxas = data.rates
            preencherOpcoesMoedas(Object.keys(taxas))
        } else
            exibirMensagemErro("Erro ao carregar as moedas. Tente novamente.")
    } catch (error) {
        exibirMensagemErro("Erro ao conectar com a API.")
    }
}

const preencherOpcoesMoedas = (moedas) => {
    const moedaOrigem = document.getElementById('moedaOrigem')
    const moedaDestino = document.getElementById('moedaDestino')

    moedaOrigem.appendChild(criarOpcaoMoeda('', 'Selecione uma moeda'))
    moedaDestino.appendChild(criarOpcaoMoeda('', 'Selecione uma moeda'))

    moedas.forEach(moeda => {
        moedaOrigem.appendChild(criarOpcaoMoeda(moeda))
        moedaDestino.appendChild(criarOpcaoMoeda(moeda))
    })
}

const criarOpcaoMoeda = (moeda, texto = moeda) => {
    const option = document.createElement('option')
    option.value = moeda
    option.textContent = texto
    return option
}

const exibirMensagemErro = (mensagem) => {
    const resultado = document.getElementById('resultado')
    resultado.textContent = mensagem
    resultado.style.color = 'red'
}

const validarValorEntrada = (valor) => {
    return !isNaN(valor) && valor > 0
}

async function atualizarTaxa() {
    const moedaOrigem = document.getElementById('moedaOrigem').value
    const moedaDestino = document.getElementById('moedaDestino').value
    const taxaInfo = document.getElementById('taxaInfo')

    if (moedaOrigem && moedaDestino) {
        if (moedaOrigem !== 'USD')
            await carregarTaxas(moedaOrigem)

        const taxa = taxas[moedaDestino] / taxas[moedaOrigem]
        if (taxa)
            taxaInfo.textContent = `Taxa de câmbio: 1 ${moedaOrigem} = ${taxa.toFixed(2)} ${moedaDestino}`
        else
            exibirMensagemErro("Taxa de câmbio não disponível.")
    }
}

const calcularConversaoMoeda = (valor, taxa) => (valor * taxa).toFixed(2) 

async function converterMoeda() {
    const valor = parseFloat(document.getElementById('valor').value)
    const moedaOrigem = document.getElementById('moedaOrigem').value
    const moedaDestino = document.getElementById('moedaDestino').value
    const resultado = document.getElementById('resultado')

    if (!validarValorEntrada(valor)) {
        exibirMensagemErro("Por favor, insira um valor válido.")
        return
    }

    if (moedaOrigem !== 'USD')
        await carregarTaxas(moedaOrigem)

    const taxa = taxas[moedaDestino] / taxas[moedaOrigem]
    if (taxa) {
        const valorConvertido = calcularConversaoMoeda(valor, taxa)
        resultado.textContent = `${valor} ${moedaOrigem} = ${valorConvertido} ${moedaDestino}`
        resultado.style.color = 'black'
    } else {
        if (!moedaOrigem)
            return exibirMensagemErro("Por favor, selecione uma moeda de origem.")
        if (!moedaDestino)
            return exibirMensagemErro("Por favor, selecione uma moeda de destino.")

        exibirMensagemErro("Conversão não disponível.")
    }
}

carregarMoedas()