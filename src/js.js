const matrizDeCriptografia = [[1, 0, 1], [1, 1, 1], [0, 2, -1]];

const transformarLetraEmNumero = letra => {
  if (letra === " ") return 0;
  const numeros = {
    A: 1,
    B: 2,
    C: 3,
    D: 4,
    E: 5,
    F: 6,
    G: 7,
    H: 8,
    I: 9,
    J: 10,
    K: 11,
    L: 12,
    M: 13,
    N: 14,
    O: 15,
    P: 16,
    Q: 17,
    R: 18,
    S: 19,
    T: 20,
    U: 21,
    V: 22,
    W: 23,
    X: 24,
    Y: 25,
    Z: 26
  };
  return numeros[letra];
};

const transformarNumeroEmLetra = numero => {
  letras = {
    0: " ",
    1: "A",
    2: "B",
    3: "C",
    4: "D",
    5: "E",
    6: "F",
    7: "G",
    8: "H",
    9: "I",
    10: "J",
    11: "K",
    12: "L",
    13: "M",
    14: "N",
    15: "O",
    16: "P",
    17: "Q",
    18: "R",
    19: "S",
    20: "T",
    21: "U",
    22: "V",
    23: "W",
    24: "X",
    25: "Y",
    26: "Z"
  };
  return letras[numero];
};

const transporMatriz = matriz =>
  matriz[0].map((coluna, index) =>
    matriz.map(matrizInterna => matrizInterna[index])
  );

const somarItensArray = array =>
  array.reduce((valorAcumulado, valorAtual) => valorAcumulado + valorAtual);

const multiplicarArrays = (arrayA, arrayB) =>
  arrayA.map((item, index) => item * arrayB[index]);

const multiplicarESomar = (arrayA, arrayB) =>
  somarItensArray(multiplicarArrays(arrayA, arrayB));

const transformarPalavraEmArray = palavra => palavra.split("");

const transformarArrayLetrasEmArrayNumeros = arrayLetras =>
  arrayLetras.map(letra => transformarLetraEmNumero(letra));

const transformarArrayNumerosEmMatrizNumeros = arrayNumeros => [
  [arrayNumeros[0], arrayNumeros[3]],
  [arrayNumeros[1], arrayNumeros[4]],
  [arrayNumeros[2], arrayNumeros[5]]
];

const multiplicarMatrizes = (matrizA, matrizB) => {
  const matrizBInvertida = transporMatriz(matrizB);
  return matrizA.map(arrayA =>
    matrizB[0].map((matriz, index) =>
      multiplicarESomar(arrayA, matrizBInvertida[index])
    )
  );
};

const calcularDeterminante3x3 = matriz =>
  matriz[0][0] * matriz[1][1] * matriz[2][2] +
  matriz[0][1] * matriz[1][2] * matriz[2][0] +
  matriz[0][2] * matriz[1][0] * matriz[2][1] -
  (matriz[2][0] * matriz[1][1] * matriz[0][2] +
    matriz[2][1] * matriz[1][2] * matriz[0][0] +
    matriz[2][2] * matriz[1][0] * matriz[0][1]);

const calcularDeterminante2x2 = matriz =>
  matriz[0][0] * matriz[1][1] - matriz[0][1] * matriz[1][0];

const removerLinha = (matriz, linha) =>
  matriz.filter((array, index) => index !== linha);

const removerColuna = (matriz, coluna) =>
  matriz.map(array =>
    array.filter((item, indexFilter) => indexFilter !== coluna)
  );

const mantemTrocaSinais = matriz =>
  matriz.map((array, indexArray) =>
    array.map((item, indexItem) => {
      return (indexItem + indexArray) % 2 === 0 ? item : item * -1;
    })
  );

const calcularMatrizCoFatores = matriz => {
  const matrizCoFatores = matriz.map((array, indexMap) =>
    array.map((item, indexArray) =>
      calcularDeterminante2x2(
        removerColuna(removerLinha(matriz, indexMap), indexArray)
      )
    )
  );
  return mantemTrocaSinais(matrizCoFatores);
};

const multiplicarMatrizPorDeterminante = (matriz, determinante) =>
  matriz.map(array => array.map(item => item * determinante));

const calcularMatrizInversa = matriz => {
  const matrizCofatores = calcularMatrizCoFatores(matriz);
  const matrizCoFatoresTransposta = transporMatriz(matrizCofatores);
  const determinante = calcularDeterminante3x3(matriz);
  const matrizInversa = multiplicarMatrizPorDeterminante(
    matrizCoFatoresTransposta,
    determinante
  );
  return matrizInversa;
};

const transformarMatrizNumerosEmMatrizLetras = matriz =>
  matriz.map(array => array.map(item => transformarNumeroEmLetra(item)));

const transformarMatrizLetrasEmPalavra = m =>
  m[0][0] + m[1][0] + m[2][0] + m[0][1] + m[1][1] + m[2][1];

const transformarArrayLetrasEmMatrizLetras = array => [
  [array[0], array[3]],
  [array[1], array[4]],
  [array[2], array[5]]
];

const criptografar = (palavra, matrizDeCriptografia) => {
  const arrayLetras = transformarPalavraEmArray(palavra);
  const matrizLetras = transformarArrayLetrasEmMatrizLetras(arrayLetras);
  const arrayNumeros = transformarArrayLetrasEmArrayNumeros(arrayLetras);
  const matrizNumeros = transformarArrayNumerosEmMatrizNumeros(arrayNumeros);
  const matrizCriptografada = multiplicarMatrizes(
    matrizDeCriptografia,
    matrizNumeros
  );
  return [matrizLetras, matrizNumeros, matrizCriptografada];
};

const descriptografar = (matrizCriptografada, matrizDeCriptografia) => {
  const matrizInversa = calcularMatrizInversa(matrizDeCriptografia);
  const matrizOriginal = multiplicarMatrizes(
    matrizInversa,
    matrizCriptografada
  );
  const matrizPalavraOriginal = transformarMatrizNumerosEmMatrizLetras(
    matrizOriginal
  );
  const palavraOriginal = transformarMatrizLetrasEmPalavra(
    matrizPalavraOriginal
  );
  return [matrizOriginal, matrizPalavraOriginal, palavraOriginal];
};

const criarHTML = (matriz, titulo) => {
  const h3Titulo = document.createElement("h3");
  h3Titulo.innerText = titulo;

  const divTabela = document.createElement("div");
  divTabela.classList.add("tabela");
  divTabela.appendChild(h3Titulo);

  matriz.forEach(array => {
    const divLinha = document.createElement("div");
    divLinha.classList.add("linha");
    array.forEach(item => {
      const divItem = document.createElement("div");
      divItem.classList.add("item");
      divItem.innerText = item;
      divLinha.appendChild(divItem);
    });
    divTabela.appendChild(divLinha);
  });
  return divTabela;
};

const normalizarPalavra = palavra => {
  const diferenca = 6 - palavra.length;
  for (let i = 0; i < diferenca; i++) {
    palavra = palavra + " ";
  }
  return palavra;
};

const iniciarCriptografia = () => {
  const palavra = document.getElementById("entradaPalavra").value.toUpperCase();
  const palavraNormalizada = normalizarPalavra(palavra);
  const matrizes = criptografar(palavraNormalizada, matrizDeCriptografia);

  const divResultado = document.getElementById("cript-resultado");

  const HTMLLetras = criarHTML(matrizes[0], "Matriz Letras");
  const HTMLCodificada = criarHTML(matrizes[1], "Matriz Codificada");
  const HTMLCriptografada = criarHTML(matrizes[2], "Matriz Criptografada");

  divResultado.innerHTML = "";
  divResultado.appendChild(HTMLLetras);
  divResultado.appendChild(HTMLCodificada);
  divResultado.appendChild(HTMLCriptografada);
};

const transformarCamposEmMatriz = array => [
  [parseInt(array[0].value), parseInt(array[1].value)],
  [parseInt(array[2].value), parseInt(array[3].value)],
  [parseInt(array[4].value), parseInt(array[5].value)]
];

const criarHTMLPalavra = palavra => {
  const div = document.createElement("div");
  const h3 = document.createElement("h3");
  const divValor = document.createElement("div");

  h3.innerText = "Palavra";
  divValor.innerText = palavra;
  div.appendChild(h3);
  div.appendChild(divValor);
  div.classList.add("tabela");
  return div;
};

const iniciarDescriptografia = () => {
  const divResultado = document.getElementById("desc-resultado");
  const camposNumeros = document.getElementsByClassName("campoNumero");

  const matrizNumeros = transformarCamposEmMatriz(camposNumeros);
  const matrizes = descriptografar(matrizNumeros, matrizDeCriptografia);

  const HTMLCodificada = criarHTML(matrizes[0], "Matriz Codificada");
  const HTMLLetras = criarHTML(matrizes[1], "Matriz Letras");
  const HTMLPalavra = criarHTMLPalavra(matrizes[2]);

  divResultado.innerHTML = "";
  divResultado.appendChild(HTMLCodificada);
  divResultado.appendChild(HTMLLetras);
  divResultado.appendChild(HTMLPalavra);
};

const botaoEntrada = document.getElementById("botaoPalavra");
const botaoDescriptografar = document.getElementById("botaoDescriptografar");

botaoEntrada.addEventListener("click", iniciarCriptografia);
botaoDescriptografar.addEventListener("click", iniciarDescriptografia);
