const gameStatus = {
    wins: 0,
    losses: 0,
    goal: 0,
    operand1: 0,
    operand2: 0,
    operator: '',
    turns: 0,
    firstBtn: null,
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
        button.addEventListener('click', (event) => {
            if(gameStatus.operand1 === 0){
                gameStatus.operand1 = parseInt(event.target.innerHTML);
                event.target.setAttribute('disabled', 'true'); 
                gameStatus.firstBtn = event.target;
            }else if(gameStatus.operand1 !== 0 && gameStatus.operator !== ''){
                gameStatus.operand2 = parseInt(event.target.innerHTML);
                calculate(event.target);
            }
        });
    })

    //set up operand buttons
    const operands = getOperandButtons();
    operands.forEach((op) => {
        op.addEventListener('click', (event) => {
            if(gameStatus.operator === ''){
                gameStatus.operator = event.target.innerHTML;
                event.target.classList.remove("opbox");
                event.target.classList.add("opbox-chosen");
            }
        })
    })
    
    //start a new game
    newGame();
});

function getGameBoardButtons(){
    return document.querySelectorAll("#box");
}

function getOperandButtons(){
    return document.querySelectorAll("#opbox");
}

function calculate(button){
    let result = eval(`${gameStatus.operand1} ${gameStatus.operator} ${gameStatus.operand2}`);
    button.innerHTML = result;

    gameStatus.firstBtn.classList.remove('box');
    gameStatus.firstBtn.classList.add("box-chosen");
    gameStatus.firstBtn.innerHTML = "";

    let table = document.getElementById("work-area");
    let row = table.insertRow(-1);
    let data = row.insertCell(0);

    data.innerHTML = `${gameStatus.operand1} ${gameStatus.operator} ${gameStatus.operand2} = ${result}`;

    gameStatus.operand1 = 0;
    gameStatus.operand2 = 0;
    gameStatus.operator = '';
    gameStatus.firstBtn = null;
    gameStatus.turns++;

    //reset operator buttons
    const ops = getOperandButtons();
    ops.forEach((op) => {
        op.classList.remove('opbox-chosen');
        op.classList.add('opbox');
    });

    if(result === gameStatus.goal){
        handleWin();
    }else if(gameStatus.turns === 3){
        handleLoss();
    }
}

function handleWin(){
    gameStatus.wins++;

    //update win count
    const wins = document.getElementById('wins');
    wins.innerHTML = gameStatus.wins;

    //reset operator buttons
    const buttons = getGameBoardButtons();
    buttons.forEach((button) => {
        button.setAttribute('disabled', 'true');
    });

    //reset operator buttons
    const ops = getOperandButtons();
    ops.forEach((op) => {
        op.classList.add('opbox-chosen');
        op.classList.remove('opbox');
    });

    const messagePrompt = document.getElementById("messages");
    messagePrompt.innerHTML = "You Won!!!";
}

function handleLoss(){
    gameStatus.losses++;

    //update losses count
    const losses = document.getElementById('losses');
    losses.innerHTML = gameStatus.losses;

    //reset operator buttons
    const buttons = getGameBoardButtons();
    buttons.forEach((button) => {
        button.setAttribute('disabled', 'true');
    });

    //reset operator buttons
    const ops = getOperandButtons();
    ops.forEach((op) => {
        op.classList.add('opbox-chosen');
        op.classList.remove('opbox');
    });

    const messagePrompt = document.getElementById("messages");
    messagePrompt.innerHTML = "You Lost. Better Luck Next Time!!!";
}

function calculateGoal(){
    let values = gameStatus.values;

    let index = Math.floor(Math.random() * values.length);
    let value = values[index];
    values = values.slice(0, index).concat(values.slice(index + 1));

    for(let i = 0; i < 3; i++){
        index = Math.floor(Math.random() * values.length);

        value = eval(`${value} ${gameStatus.op[Math.floor(Math.random() * 3)]} ${values[index]}`);
        values = values.slice(0, index).concat(values.slice(index + 1));
    }

    return value;
}

function newGame(){
    gameStatus.operator = '';
    gameStatus.operand1 = 0;
    gameStatus.operand2 = 0;
    gameStatus.turns = 0;

    const workArea = document.getElementById('work-area');
    
    for(let i = workArea.rows.length - 1; i > - 1; i--){
        workArea.deleteRow(i);
    }

    //create random values
    for(let i = 0; i < 4; i++){
        gameStatus.values[i] = (Math.floor(Math.random() * 8) + 2);
    }

    //calculate goal
    gameStatus.goal = calculateGoal();

    //update buttons to have values
    const buttons = getGameBoardButtons();
    for(let i = 0; i < 4; i++){
        buttons[i].innerHTML = gameStatus.values[i];
        buttons[i].removeAttribute('disabled');
        buttons[i].classList.remove('box-chosen');
        buttons[i].classList.add('box');
    }

     //reset operator buttons
     const ops = getOperandButtons();
     ops.forEach((op) => {
         op.classList.remove('opbox-chosen');
         op.classList.add('opbox');
         op.removeAttribute('disabled');
     });

    //update goal
    const goal = document.getElementById('goal');
    goal.innerHTML = gameStatus.goal;

    //update win count
    const wins = document.getElementById('wins');
    wins.innerHTML = gameStatus.wins;

    //update losses count
    const losses = document.getElementById('losses');
    losses.innerHTML = gameStatus.losses;
}