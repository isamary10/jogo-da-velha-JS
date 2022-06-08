//Selecionando todos os elementos data-cell
const cellElements = document.querySelectorAll("[data-cell]");
//Selecionando o elemento data-board
const board = document.querySelector("[data-board]");
//Selecionando o elemento data-winning-message-text
const winningMessageTextElement = document.querySelector("[data-winning-message-text]");
//Selecionando o elemento winning-message
const winningMessage = document.querySelector("[data-winning-message]");
//Selecionando o elemento data-winning-message-button
const restartButton = document.querySelector("[data-restart-button]")

//Guarda a informação se é a vez do círculo jogar
let isCircleTurn;

//Guarda as combinações de vitórias dentro de uma lista
const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [1, 4, 8],
    [2, 4, 6],
];


//Função que verifica por uma vitória
const checkForWin = (currentPlayer) => {
    //Função para verificar alguma combinação esta preenchida pelo currentPlayer
    return winningCombinations.some((combination) => {
        return combination.every((index) => {
            //Verifica se em cada index do cellElements contém o currentPlayer
            return cellElements[index].classList.contains(currentPlayer);
        });
    });
};

//Função para verificar se todas as células estão preenchidas para dar o empate
const checkForDraw = () => {
    return [...cellElements].every((cell) => {
        return cell.classList.contains("x") || cell.classList.contains("circle");
    });
};

//Função para incluir na board uma classe x ou circle quando o jogo começar
const startGame = () => {
    //Como o isCircleTurn é false, define que o x sempre começa a jogar
    isCircleTurn = false;

    //Seleciona somente uma vez a célula de escolha
    for(const cell of cellElements) {
        //Remove o preenchimento dos cellElements
        cell.classList.remove("circle");
        cell.classList.remove("x");
        //Reseta 100% a aplicação
        cell.removeEventListener("click", handleClick);
        cell.addEventListener("click", handleClick, { once: true});
    }

    //Usando a função setBoardHoverClass
    setBoardHoverClass();
    //Remove a tela do final do jogo quando clicado no botão reiniciar
    winningMessage.classList.remove("show-winning-message");
}

//Função para encerrar o jogo e mostrar o vencedor
const endGame = (isDraw) => {
    if (isDraw) {
        winningMessageTextElement.innerText = "Empate!"
    }else {
        winningMessageTextElement.innerText = isCircleTurn ? "O Venceu" : "X Venceu!";
    }

    //Usado a class show-winning-message criada no CSS para adicionar na div class winnning-message
    winningMessage.classList.add("show-winning-message");
}

const placeMark = (cell, classToAdd) => {
    //Acessa a lista de classe e adiciona o classToAdd
    cell.classList.add(classToAdd);
}

//Função para o hover funcionar após a inicialização do jogo
const setBoardHoverClass = () => {
    // Remove tanto a classe circle tanto a classe x antes de fazer a mudança da vez
    board.classList.remove("circle");
    board.classList.remove("x")

    //Verifica se a vez de jogar é do círculo e adiciona o circulo, se não, adiciona o x na board
    if(isCircleTurn) {
        board.classList.add("circle")
    }else {
        board.classList.add("x")
    }
}

//Função para mudar o símbolo. Troca o isCircleTurn para verdadeiro
const swapTurns = () => {
    isCircleTurn = !isCircleTurn

    //Usando a função setBoardHoverClass
    setBoardHoverClass();
}

// O (e) é o elemento da célula
const handleClick = (e) =>{
    //COLOCAR A MARCA (X OU CÍRCOLO)
    //Verifica se for a vez do círculo, adiciona o círculo, se não, adiciona o x
    const cell = e.target;
    const classToAdd = isCircleTurn ? 'circle' : 'x';

    //Usando a função placeMark
    placeMark(cell, classToAdd);

    //Verificar por vitória
    const isWin = checkForWin(classToAdd);

    //Verificar por empate
    const isDraw = checkForDraw();
    if (isWin) {
        endGame(false);
    }else if (isDraw) {
        endGame(true)
    }else {
        //Usando a função swapTunrs (mudando o jogador)
        swapTurns();
    }
}

//Chamando a função startGame para o jogo poder começar
startGame();

//Reinicia o jogo
restartButton.addEventListener("click", startGame);