# Conversor_Moedas
Trabalho 02 - Programação Funcional - Conversor de Moedas

Um conversor de moedas simples que utiliza a API de câmbio para converter valores entre diferentes moedas. O projeto foi desenvolvido seguindo princípios de programação funcional, respeitando a imutabilidade e utilizando funções puras.

## Membros do Grupo
- [@Rafael Munarin](https://github.com/RafaelMunarin)

## Descrição do Projeto
Esta aplicação permite que o usuário converta valores entre diferentes moedas, utilizando taxas de câmbio atualizadas. A conversão é realizada com base nas seleções de moeda de origem e destino.

## Funcionalidades
- Conversão correta de valores com base na taxa de câmbio fornecida.
- Validação de entradas, garantindo que apenas números positivos sejam aceitos.
- Uso de funções puras para conversão, validação e cálculo da taxa, sem modificar variáveis globais ou o estado do programa.
- Interface amigável e responsiva.

## Estrutura do Código
O código é organizado em funções pequenas e reutilizáveis, facilitando a leitura e manutenção. As funções principais incluem:
- `carregarMoedas()`: Carrega as taxas de câmbio disponíveis.
- `converterMoeda()`: Realiza a conversão de moedas utilizando a taxa atual.
- `validarEntrada(valor)`: Valida se a entrada do usuário é um número positivo.
- `atualizarTaxa()`: Atualiza e exibe a taxa de câmbio na interface.

### Funções Puras
Todas as funções implementadas são puras, ou seja, não possuem efeitos colaterais e não modificam estados externos. Elas retornam novos valores baseados nos parâmetros de entrada. Exemplos:
```javascript
const calcularConversao = (valor, taxa) => (valor * taxa).toFixed(2)
```
```javascript
const validarEntrada = (valor) => !isNaN(valor) && valor > 0
```
## Exemplos de Uso

### Entrada
- **Valor:** `5`
- **Moeda de origem:** `USD`
- **Moeda de destino:** `BRL`

### Saída
- **Resultado:** `5 USD = 28.91 BRL` 

## Como Executar
1. **Clone o repositório:**
   ```bash
   git clone https://github.com/RafaelMunarin/Conversor_Moedas.git
   ```
2. **Navegue até o diretório do projeto:**
   ```bash
   cd Conversor_Moedas
   ```
3. **Abra o arquivo `index.html` em um navegador**

## API

Os dados de câmbio utilizados nesta aplicação são fornecidos pela [API de taxas por taxa de câmbio](https://www.exchangerate-api.com).
