var currentPlayer = 1;

var restart = document.querySelector("#refer");
console.log(restart);

var squares = document.querySelectorAll('td');
console.log(squares);

function clearBoard(){
  for (var i=0; i<squares.length; i++){
    squares[i].textContent = '';
    currentPlayer = 1;
  }
}
restart.addEventListener('click', clearBoard)

function check_Winner(a,b,c){
  if(squares[a].textContent === squares[b].textContent && squares[a].textContent === squares[c].textContent && squares[a].textContent !== ''){
    alert("Game Over!!! Restart to Play again");
  }
};

function updateTable(){
  console.log(currentPlayer);
  if(this.textContent === '' && currentPlayer === 1){
    this.textContent = 'X';
    currentPlayer = currentPlayer * -1;
  }else if(this.textContent === '' && currentPlayer == -1){
    this.textContent = 'O';
    currentPlayer = currentPlayer * -1;
  }else{
  }
  //check for win or tie
  // 1. Horizontally
  check_Winner(0,1,2);
  check_Winner(3,4,5);
  check_Winner(6,7,8);

  // 2. Vertically
  check_Winner(0,3,6);
  check_Winner(1,4,7);
  check_Winner(2,5,8);

  // 3. Diagonally
  check_Winner(0,4,8);
  check_Winner(2,4,6);
};


//Add changes to all squares
for (var i =0; i< squares.length; i++){
  squares[i].addEventListener('click', updateTable);
  }
