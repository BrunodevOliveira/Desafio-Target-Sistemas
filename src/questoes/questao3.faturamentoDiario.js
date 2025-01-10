
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