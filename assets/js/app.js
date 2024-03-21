// Elementos do DOM
const inputTextArea = document.querySelector("#encrypt-decrypt textarea");
const emptyResponseElement = document.querySelector(
  "#encrypt-decrypt-response .empty-response"
);
const contentResponseElement = document.querySelector(
  "#encrypt-decrypt-response .content-response"
);
const responseTextArea = contentResponseElement.querySelector("textarea");

// Mapeamento de substituição para criptografia
const encryptionMap = {
  a: "ai",
  e: "enter",
  i: "imes",
  o: "ober",
  u: "ufat",
};

// Função para substituir palavras com base no mapa fornecido
function substituteWords(inputString, wordMap) {
  const keysRegex = new RegExp(`(${Object.keys(wordMap).join("|")})`, "g");

  function replaceKeys(match) {
    return wordMap[match] || match;
  }

  return inputString.replace(keysRegex, replaceKeys);
}

// Função para inverter um objeto
function invertObject(obj) {
  const invertedObj = {};
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      invertedObj[obj[key]] = key;
    }
  }
  return invertedObj;
}

// Função para ocultar ou exibir resposta vazia
function toggleResponseDisplay(isEmpty) {
  emptyResponseElement.style.display = isEmpty ? "flex" : "none";
  contentResponseElement.style.display = isEmpty ? "none" : "flex";

  if (!isEmpty) {
    responseTextArea.scrollIntoView({ behavior: "smooth" });
  }
}

// Manipulador de clique nos botões
function handleButtonClick(event) {
  try {
    const inputValue = inputTextArea.value;

    if (inputValue.replace(/\s/g, "").length < 1) {
      toggleResponseDisplay(true);
      return;
    }

    toggleResponseDisplay(false);

    switch (event.target.id) {
      case "encrypt":
        responseTextArea.value = substituteWords(inputValue, encryptionMap);
        break;
      case "decrypt":
        responseTextArea.value = substituteWords(
          inputValue,
          invertObject(encryptionMap)
        );
        break;
      case "copy":
        responseTextArea.select();
        navigator.clipboard.writeText(responseTextArea.value);
        break;
    }
  } catch (error) {
    // Captura e exibe qualquer erro ocorrido durante o processamento
    console.error(error);
  }
}

// Validar input para remover caracteres não desejados
function validateInput(event) {
  const inputValue = event.target.value;
  const sanitizedValue = inputValue.replace(/[^a-z]/g, "");
  if (inputValue !== sanitizedValue) {
    alert("Use apenas letras minúsculas, sem acento, pontuação ou caracteres especiais.");
  }
  inputTextArea.value = sanitizedValue;
}

// Função para exibir a mensagem "Resultado"
function showResultMessage() {
  const resultMessageElement = document.querySelector("#result-message");
  resultMessageElement.style.display = "block";
}

// Função para ocultar a mensagem "Resultado"
function hideResultMessage() {
  const resultMessageElement = document.querySelector("#result-message");
  resultMessageElement.style.display = "none";
}

// Adicione esta linha no início da função handleButtonClick, antes do switch:
hideResultMessage();

// Adicione esta linha após a linha responseTextArea.value = substituteWords(...):
showResultMessage();
// Ouvinte de eventos de entrada para validação de entrada
inputTextArea.addEventListener("input", validateInput);

// Ouvinte de eventos de input para verificar se o texto foi apagado
inputTextArea.addEventListener("input", () => {
  if (inputTextArea.value.trim().length === 0) {
    toggleResponseDisplay(true);
  }
});

// Ouvintes de eventos de clique para os botões
document.querySelectorAll("input").forEach((element) => {
  element.addEventListener("click", handleButtonClick);
});
