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

calcularPercentuais(); // Deve retornar { "SP": "37.53%","RJ": "20.29%","MG": "16.17%","ES": "15.03%","Outros": "10.98%" }