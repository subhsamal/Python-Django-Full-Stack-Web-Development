
var player1 = prompt ("Player1: Enter Your Name:");
alert("You are Red..");

var player2 = prompt("Player2: Enter Your Name:");
alert("You are Green..");

var color1 = 'rgb(239, 54, 21)';
var color2 = 'rgb(4, 219, 76)';

//var game_on = true;
var table = $('table tr');   // table tr is to fetch tr elements inside a table

//start changing color of the circle starting with player1
function changeColor(rowIndex, colIndex, color) {
  console.log(table.eq(rowIndex).find('td').eq(colIndex).find('button').css('background-color', color));
  return table.eq(rowIndex).find('td').eq(colIndex).find('button').css('backgroud-color', color);
}

//return the color of the available row where column = col i:e clicked by any player
function returnColor(rowIndex, colIndex){
  return table.eq(rowIndex).find('td').eq(colIndex).find('button').css('background-color');
}

// This verifies the bottom of a column and returns the row number which is gray, Hence the color will change for that row of the col
function checkBottom(colIndex){
  var colorReport = returnColor(5, colIndex);  //Initially it will store the color of bottom row and col = value of var col i:e Gray
   for (var row = 5; row > -1; row--){        // index numbering is from top to bottom, left to right in DOM
    colorReport = returnColor(row, colIndex);
    if (colorReport === 'rgb(142, 145, 150)'){
      return row;                         // we need the row number of the first gray circle from bottom
    }

  }
}

//Check for win conditions: 1.Horizontally 2.Vertically 3.Diagonally   Also check for tie condition
// check if all four circles have same color
function colorMatchCheck(one, two, three, four){
  return (one===two && one===three && one===four && one !== 'rgb(142, 145, 150)' && one !== undefined);
}

//1. Horizontal win check
function winCheck_Horizontal(){
  for(var row = 0; row < 6; row++){       //it will check for each row top to bottom
    for(var col = 0; col < 4; col++) { // it will take one col value and add upto 3 to check if colors are matching
     if(colorMatchCheck(returnColor(row, col), returnColor(row, col+1), returnColor(row, col+2), returnColor(row, col+3))){
       return true;
     }else{
       continue;
     }
   }
  }
}

//2. vertical win check
function winCheck_Vertical(){
  for (var col = 0; col < 7; col++){
    for (var row = 0; row <3; row++){
      if(colorMatchCheck(returnColor(row, col), returnColor(row+1, col), returnColor(row+2, col), returnColor(row+3, col)) ){
        return true;
      }else{
        continue;
      }
    }

  }
}
// 3. Check for Diagonal win. It can be 2 types of diagonal-- Left top to right bottom or left bottom to Right top
function winCheck_Diagonal(){
  for(col=0; col< 5; col++){
    for(row=0; row < 7; row++){
      if(colorMatchCheck(returnColor(row, col), returnColor(row+1, col+1), returnColor(row+2, col+2), returnColor(row+3, col+3))){
        return true;
      }else if(colorMatchCheck(returnColor(row, col), returnColor(row-1, col+1), returnColor(row-2, col+2), returnColor(row-3, col+3))){
        return true;
      }else{
        continue;
      }
    }
  }
}

function gameEnd(player_won){
      $('h3').fadeOut('fast');
      $('h2').fadeOut('fast');
      $('h1').text(player_won+" has won! Refresh your browser to play again!").css("fontSize", "50px");
      table.fadeOut('slow').fadedelay(50000);
}


// This is the logic part of the game //
//start with player1
var currentPlayer = 1;
var currentName = player1;
var currentColor = color1;

$('h3').text("player1- " + currentName + ": it is your turn, please pick a column to drop your Green chip.");

$('.game button').on('click', function(){
// get the column number, closest() method returns the first ancestor in the DOM Tree
  var col = $(this).closest("td").index();
  // check bottom-gray-row number for the given column
  var bottom_avail_row = checkBottom(col);

  // Change the color of that circle  where column = col and row = bottom_avail_row
  changeColor(bottom_avail_row, col, currentColor);
  //console.log(currentColor);
  //Check for win or tie before moving to the next player
  if (winCheck_Horizontal() || winCheck_Vertical() || winCheck_Diagonal()){
    //console.log('Yes');
    gameEnd(currentName);
 }
  // switch between the players. currentPlayer = 1 for player1 and -1 for player2
  currentPlayer = currentPlayer * -1;

  //check who is the player and generate a prompt
  if(currentPlayer === 1){
    $('h3').text("Hello "+player1+": it is your turn, click on a circle...");
    currentColor = color1;
    currentName = player1;
  }else{
    $('h3').text("Hello "+player2+": it is your turn, click on a circle...");
    currentColor = color2;
    currentName = player2;
  }
})
