const gameStatus = {
    wins: 0,
    losses: 0,
    goal: 0,
    operand1: 0,
    operand2: 0,
    op: {
        0: '+',
        1: '*',
        2: '-',
    },
    values: []
};

window.addEventListener("DOMContentLoaded", () => {
    //setting up new game button
    const newBtn = document.getElementById('newBtn');
    newBtn.addEventListener('click', () => {
        newGame();
    });

    //set up game board buttons
    const buttons = getGameBoardButtons();
    buttons.forEach((button) => {
        button.addEventListener('click', () => {
            console.log('button clicked');
        });
    })

    //set up operand buttons
    const operands = getOperandButtons();
    operands.forEach((op) => {
        op.addEventListener('click', () => {
            console.log('op clicked');
        })
    })
    
    //start a new game
    newGame();
});

function getGameBoardButtons(){
    return document.querySelectorAll(".box");
}

function getOperandButtons(){
    return document.querySelectorAll(".opbox");
}

function calculateGoal(){
    let values = gameStatus.values;

    let index = Math.floor(Math.random() * values.length);
    let value = values[index];
    values = values.slice(0, index).concat(values.slice(index + 1));

    for(let i = 0; i < 3; i++){
        index = Math.floor(Math.random() * values.length);

        let evalString = `${value} ${gameStatus.op[Math.floor(Math.random() * 3)]} ${values[index]}`;
        value = eval(evalString);
        console.log(evalString);

        values = values.slice(0, index).concat(values.slice(index + 1));
    }

    return value;
}

function newGame(){
    for(let i = 0; i < 4; i++){
        gameStatus.values[i] = (Math.floor(Math.random() * 9) + 1);
    }

    gameStatus.goal = calculateGoal();

    const buttons = getGameBoardButtons();
    for(let i = 0; i < 4; i++){
        buttons[i].innerHTML = gameStatus.values[i];
    }

    const goal = document.getElementById('goal');
    goal.innerHTML = gameStatus.goal;

    const wins = document.getElementById('wins');
    wins.innerHTML = gameStatus.wins;

    const losses = document.getElementById('losses');
    losses.innerHTML = gameStatus.losses;
}