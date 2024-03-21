# Desafio Alura: Decodificador

Bem-vindo ao Decodificador, um projeto simples que traz uma experiência descomplicada de criptografia. O objetivo é permitir que os usuários insiram texto em uma área de entrada, criptografem ou descriptografem o texto usando um mapa de substituição predefinido e vejam o resultado em uma área de resposta. Além disso, os usuários têm a opção de copiar o resultado para a área de transferência.

## Funcionalidades

### 1. Entrada de Texto

- Os usuários podem digitar seu texto na área designada.
- A entrada é validada para garantir que apenas letras minúsculas sejam aceitas, evitando problemas com maiúsculas e acentuações.

### 2. Criptografia

- Ao clicar no botão `"Criptografar"`, o texto inserido é criptografado usando um mapa predefinido:

    ```js
    const encryptionMap = {
        a: "ai",
        e: "enter",
        i: "imes",
        o: "ober",
        u: "ufat",
    };
    ```

- O mapa de criptografia substitui letras específicas por palavras correspondentes, usando RegExp e replace:

    ```js
    function substituteWords(inputString, wordMap) {
        const keysRegex = new RegExp(`(${Object.keys(wordMap).join("|")})`, "g");

        function replaceKeys(match) {
            return wordMap[match] || match;
        }

        return inputString.replace(keysRegex, replaceKeys);
    }
    ```

### 3. Descriptografia

- Ao clicar no botão `"Descriptografar"`, o texto criptografado é descriptografado usando o mapa inverso, com ajuda da função `invertObject`:

    ```js
    function invertObject(obj) {
        const invertedObj = {};
        for (const key in obj) {
            if (obj.hasOwnProperty(key)) {
                invertedObj[obj[key]] = key;
            }
        }
        return invertedObj;
    }
    ```

### 4. Copiar para Área de Transferência

- Com um clique em `"Copiar"`, o texto na área de resposta é selecionado e pronto para ser colado em qualquer lugar.

### 5. Exibição de Resultados

- O resultado da criptografia ou descriptografia é exibido de maneira clara na área designada.
- Se a entrada estiver vazia, ou se nenhum texto foi fornecido para criptografia ou descriptografia, uma mensagem indicando que a resposta está vazia será exibida.

### 6. Rolagem Suave

- Após a criptografia, a página rola suavemente até a área de resposta, destacando o resultado para uma experiência mais envolvente.
