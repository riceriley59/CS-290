/*
    Riley Rice 5/9/2023
    Course: CS290 Section#: 01
*/

/* 
    This is my global game status object which is used to hold
    all the values that are useful for determining the current
    state of the game such as wins, losses, current operands, goal etc.
*/
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

/*
    This is the code that is run when the dom content
    is first loaded. It adds event listeners to all the buttons
    with the corresponding callback functions and then calls 
    the newgame function to start a new game.
*/
window.addEventListener("DOMContentLoaded", () => {
    //setting up new game button
    const newBtn = document.getElementById('newBtn');
    newBtn.addEventListener('click', () => {
        //start a new game when this button is clicked
        newGame();
    });

    //set up game board buttons
    const buttons = getGameBoardButtons();
    buttons.forEach((button) => {
        button.addEventListener('click', (event) => {
            //if there isn't a first operand then disable the clicked button
            //and then set the value of that button as the first operand.
            //also store the first button as it will be needed later.
            if(gameStatus.operand1 === 0){
                gameStatus.operand1 = parseInt(event.target.innerHTML);
                event.target.setAttribute('disabled', 'true'); 
                gameStatus.firstBtn = event.target;
            
            //if the first operand isn't empty and they have chosen an operator
            //then fill in operand2 with the clicked button's value and then call
            //our calculate function which will handle the game logic.
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
            //if there isn't an operator selected already and the user
            //has choosen a first number then change it's class to be clicked
            //and then change the operator to the button's value.
            if(gameStatus.operator === '' && gameStatus.operand1 !== 0){
                gameStatus.operator = event.target.innerHTML;
                event.target.classList.remove("opbox");
                event.target.classList.add("opbox-chosen");
            }
        })
    })
    
    //start a new game
    newGame();
});

//This function gets all the gameboard buttons and returns
//them in an array
function getGameBoardButtons(){
    return document.querySelectorAll("#box");
}

//This function gets all the operand buttons and returns
//them in an array
function getOperandButtons(){
    return document.querySelectorAll("#opbox");
}

/*
    This function handles all the game logic and is only called once the user
    has selected two operands and an operator. It will calculate the new value 
    and update the buttons value while deleting the first button. It will also
    add the number to the work area table. Finally it will check to see if you won 
    or lost and take the corresponding action.
*/
function calculate(button){
    //calculate the result from the selected operators and operands
    let result = eval(`${gameStatus.operand1} ${gameStatus.operator} ${gameStatus.operand2}`);
    
    //change the last clicked button's value to the new result
    button.innerHTML = result;

    //remove the first button by giving it the box-chosen class and clearing it's value
    gameStatus.firstBtn.classList.remove('box');
    gameStatus.firstBtn.classList.add("box-chosen");
    gameStatus.firstBtn.innerHTML = "";

    //get the table and then create a row and a data cell within that row
    let table = document.getElementById("work-area");
    let row = table.insertRow(-1);
    let data = row.insertCell(0);

    //populate the data cell with the values that the user selected
    data.innerHTML = `${gameStatus.operand1} ${gameStatus.operator} ${gameStatus.operand2} = ${result}`;

    //now we reset all the gamestatus values to get ready for the next iteration
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

    //check to see if the user used all of their turns or if they won
    if(result === gameStatus.goal){
        //call the function that handles the user winning
        handleWin();
    }else if(gameStatus.turns === 3){
        //call the function that handles the user losing
        handleLoss();
    }
}

//This function handles everything that needs to be done if the user wins
function handleWin(){
    //increment the win counter by one
    gameStatus.wins++;

    //update win count
    const wins = document.getElementById('wins');
    wins.innerHTML = gameStatus.wins;

    //disable all the gameboard buttons
    const buttons = getGameBoardButtons();
    buttons.forEach((button) => {
        button.setAttribute('disabled', 'true');
    });

    //disable all the operator buttons by showing that they 
    //are chosen
    const ops = getOperandButtons();
    ops.forEach((op) => {
        op.classList.add('opbox-chosen');
        op.classList.remove('opbox');
    });

    //update the message prompt to display to the user that they won
    const messagePrompt = document.getElementById("messages");
    messagePrompt.innerHTML = "You Won!!!";

    //reset the turns so that we can check if the user starts
    //a new game before winning in which we will give them a loss
    gameStatus.turns = 0;
}

//This function handles everythin that needs to be done if the user loses
function handleLoss(){
    //increment the loss counter by one
    gameStatus.losses++;

    //update losses count
    const losses = document.getElementById('losses');
    losses.innerHTML = gameStatus.losses;

    //disable all the gameboard buttons
    const buttons = getGameBoardButtons();
    buttons.forEach((button) => {
        button.setAttribute('disabled', 'true');
    });

    //disable all the operator buttons by showing that they are chosen
    const ops = getOperandButtons();
    ops.forEach((op) => {
        op.classList.add('opbox-chosen');
        op.classList.remove('opbox');
    });

    //update the message prompt to display to the user that they lost
    const messagePrompt = document.getElementById("messages");
    messagePrompt.innerHTML = "You Lost. Better Luck Next Time!!!";

    //reset the turns so that we can check if the user starts
    //a new game before winning in which we will give them a loss
    gameStatus.turns = 0;
}

//This function is used to calculate a valid goal at the beginning of a game
function calculateGoal(){
    //copy all the button values into a temp array
    let values = gameStatus.values;

    //calculate a random index within the range of length of values
    let index = Math.floor(Math.random() * values.length);

    //store the value of the element at that index and then remove the element
    //at that index
    let value = values[index];
    values = values.slice(0, index).concat(values.slice(index + 1));

    //loop 3 times since that's how many operations we can do with 4 numbers
    for(let i = 0; i < 3; i++){
        //calculate another random index
        index = Math.floor(Math.random() * values.length);

        //update the value to by the old value plus a random operator and then the value at our 
        //random index we calculated then remove the value at that index
        value = eval(`${value} ${gameStatus.op[Math.floor(Math.random() * 3)]} ${values[index]}`);
        values = values.slice(0, index).concat(values.slice(index + 1));
    }

    //then we return the final index
    return value;
}

//This function which creates a new game
function newGame(){
    //if they started a newgame before finishing their
    //current game then give them a lose
    if(gameStatus.turns > 0){
        gameStatus.losses++;
    }

    //reset all the values that need to be reset
    gameStatus.operator = '';
    gameStatus.operand1 = 0;
    gameStatus.operand2 = 0;
    gameStatus.turns = 0;

    //get the table and delete all it's rows
    const workArea = document.getElementById('work-area');
    for(let i = workArea.rows.length - 1; i > - 1; i--){
        workArea.deleteRow(i);
    }

    //update the message prompt to say lets play
    const messagePrompt = document.getElementById("messages");
    messagePrompt.innerHTML = "Lets Play!";

    //create random values
    for(let i = 0; i < 4; i++){
        gameStatus.values[i] = (Math.floor(Math.random() * 8) + 2);
    }

    //calculate goal
    gameStatus.goal = calculateGoal();

    //update buttons to have values and reset them
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