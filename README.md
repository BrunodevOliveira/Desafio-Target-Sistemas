<p align="center">
  <img  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRpRgc3jQ_M8ZZs5nfMaDNdS9yZcxSWTS7B0g&s" width="250"/>
</p>

<h1 align="center">Desafio técnico</h1>


## 1) Observe o trecho de código abaixo:

int INDICE = 13, SOMA = 0, K = 0;

Enquanto K < INDICE faça {
  K = K + 1; SOMA = SOMA + K; 
}

Imprimir(SOMA);

**Ao final do processamento, qual será o valor da variável SOMA?**


🔗[Link para arquivo](./src/questoes/questao1.somaResultado.js)

``` JS
function calcularSoma() {
  let indice = 13;
  let soma = 0;
  let k = 0;
  
  while (k < indice) {
      k = k + 1;
      soma = soma + k;
  }
  
  return soma;
}

console.log(calcularSoma()); // Resultado: 91

```
## 2) Dado a sequência de Fibonacci, onde se inicia por 0 e 1 e o próximo valor sempre será a soma dos 2 valores anteriores (exemplo: 0, 1, 1, 2, 3, 5, 8, 13, 21, 34...), escreva um programa na linguagem que desejar onde, informado um número, ele calcule a sequência de Fibonacci e retorne uma mensagem avisando se o número informado pertence ou não a sequência.


🔗[Link para arquivo](./src/questoes/questao2.fibonacci.js)

``` JS
  function verificaFibonacci(numero) {
    let a = 0;
    let b = 1;
    
    while (b <= numero) {
        if (b === numero) return true;
        let temp = b;
        b = a + b;
        a = temp;
    }
    
    return false;
  }

  function exibirResultado(numero) {
      const pertence = verificaFibonacci(numero);
      console.log(`O número ${numero} ${pertence ? 'pertence' : 'não pertence'} à sequência de Fibonacci`);
  }

  exibirResultado(34); // O número 34 pertence à sequência de Fibonacci
  exibirResultado(33); // O número 33 não pertence à sequência de Fibonacci
```

## 3) Dado um vetor que guarda o valor de faturamento diário de uma distribuidora, faça um programa, na linguagem que desejar, que calcule e retorne:
- O menor valor de faturamento ocorrido em um dia do mês;
- O maior valor de faturamento ocorrido em um dia do mês;
- Número de dias no mês em que o valor de faturamento diário foi superior à média mensal.

a) Usar o json ou xml disponível como fonte dos dados do faturamento mensal;

b) Podem existir dias sem faturamento, como nos finais de semana e feriados. Estes dias devem ser ignorados no cálculo da média.


🔗[Link para arquivo](./src/questoes/questao3.faturamentoDiario.js)

🔗[Link para fonte de dados](./src/mock/dados.json)

``` JS
const formatarValorParaBRL = (valor) => {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(
    valor,
  )
}

async function obterDados()  {
  try {
    const response = await fetch('../mock/dados.json');
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Erro ao obter dados:', error);
    throw error;
  }
};

async function analisarFaturamento() {
  try {
    const dados = await obterDados();
    
    const faturamentoValido = dados.filter(d => d.valor > 0);
    
    const menorValor = Math.min(...faturamentoValido.map(d => d.valor));
    
    const maiorValor = Math.max(...faturamentoValido.map(d => d.valor));
    
    const media = faturamentoValido.reduce((acc, curr) => acc + curr.valor, 0) / faturamentoValido.length;
    
    const diasAcimaDaMedia = faturamentoValido.filter(d => d.valor > media).length;
    
    return {
      menorValor,
      maiorValor,
      diasAcimaDaMedia,
      media
    };
  } catch (error) {
    console.error('Erro na análise de faturamento:', error);
    throw error;
  }
};

async function exibirResultados() {
  try {
    const { menorValor, maiorValor, diasAcimaDaMedia, media } = await analisarFaturamento();
    
    console.log(`O menor valor de faturamento ocorrido em um dia do mês: ${formatarValorParaBRL(menorValor)}`);
    console.log(`O maior valor de faturamento ocorrido em um dia do mês: ${formatarValorParaBRL(maiorValor)}`);
    console.log(`Média de faturamento: ${formatarValorParaBRL(media)}`);
    console.log(`Dias acima da média: ${diasAcimaDaMedia}`);
  } catch (error) {
    console.error('Erro ao exibir resultados:', error);
  }
}

exibirResultados()
```

## 4) Dado o valor de faturamento mensal de uma distribuidora, detalhado por estado:
- SP – R$67.836,43
- RJ – R$36.678,66
- MG – R$29.229,88
- ES – R$27.165,48
- Outros – R$19.849,53

Escreva um programa na linguagem que desejar onde calcule o percentual de representação que cada estado teve dentro do valor total mensal da distribuidora. 


🔗[Link para arquivo](./src/questoes/questao4.percentual.js)

``` JS
function calcularPercentuais() {
  const faturamento = {
      SP: 67836.43,
      RJ: 36678.66,
      MG: 29229.88,
      ES: 27165.48,
      Outros: 19849.53
  };
  
  const total = Object.values(faturamento).reduce((a, b) => a + b);
  
  const percentuais = Object.entries(faturamento).reduce((acc, [estado, valor]) => {
      acc[estado] = (valor / total * 100).toFixed(2) + '%';
      return acc;
  }, {});

  return percentuais;
}

calcularPercentuais(); // { "SP": "37.53%","RJ": "20.29%","MG": "16.17%","ES": "15.03%","Outros": "10.98%" }

```

## 5) Escreva um programa que inverta os caracteres de um string.

a) Essa string pode ser informada através de qualquer entrada de sua preferência ou pode ser previamente definida no código;
<br/>
b) Evite usar funções prontas, como, por exemplo, reverse;

🔗[Link para arquivo](./src/questoes/questao5.inverterString.js)

``` JS
function inverterString(str) {
  let invertida = '';
  for (let i = str.length - 1; i >= 0; i--) {
      invertida += str[i];
  }
  return invertida;
}

console.log(inverterString('Aprovação')); // "oãçavorpA"

```
