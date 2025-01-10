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