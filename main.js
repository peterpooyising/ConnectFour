// Initialise grid as an empty array.
let grid = [];

// Flag to indicate if the game is still being played. If the game isn't in play(TRUE), then any attempt to click the circles won't work. The default value is FALSE. Once the game is over, unless the player clicks on the restart button(which will change the value to TRUE again), the player will not be able to play the game again.
let gameInPlay = false;


// Restart function
window.restart = () => {
  // console.log("Call Restart?")
  // grid is 6 rows by 7 columns
  grid =  [
    [{},{},{},{},{},{},{}],
    [{},{},{},{},{},{},{}],
    [{},{},{},{},{},{},{}],
    [{},{},{},{},{},{},{}],
    [{},{},{},{},{},{},{}],
    [{},{},{},{},{},{},{}]
  ];
  gameInPlay = true;
  render(); // IMPORTANT: Must call render() at the end.
}

// Concept: We use a for loop inside of another for loop to cycle through all the values, otherwise to access individual values we can just use grid[i][j].

// Render function for the grid
const render = () => {
  const svg = document.getElementById("svg");
  // when we call render, we'll make a string that's going to represent our board. this string is called "doc".
  let doc = ``; // initialised as an empty string
  // loop through each row
  for (var i = 0; i < grid.length; i++) {
    var row = grid[i];
    // loop through each object/circle in a row
    for (var j = 0; j < row.length; j++ ) {
      // accessing the multi-dimensional array through const "square"
      const circle = grid[i][j];

      const color = circle.color || "#ffffff";

      // Because i and j starting values are 0, so the center of the circle (x & y coordinates) start at (0,0). So, we have to add in an offset of the radius of the circle so that the circles are not cut off. Circles are colored WHITE.
      // Because I am using template literals, I can omit the "" quotes that were neccessary when describing HTML attributes. However, just for practice, I will include them. e.g
      //     doc = doc + `<circle onclick=clickCircle(${i}, ${j}) stroke=#000000 stroke-width=2px fill=${color} r=30px cx=${j * 100 + 100 }px cy=${i * 100 + 110}px></circle>`;
      // will work.
      doc = doc + `<circle onclick="clickCircle(${j},${i})" stroke="#000000" stroke-width="2px" fill="${color}" r="5%" cx="${j * 110 + 65 }px" cy="${i * 140 }px"></circle>`; // IMPORTANT: j represents the x-coordinate, i represents y-coordinate.
      // Rows & columns are different from x & y coordinates.
    };
  };
  // console.log("Testing: Writing inner HTML");
  svg.innerHTML = doc;
};

// Concept: Whenever someone clicks on a circle, we will find the lowest unoccupied circle on that COLUMN and put the appropriate colored disc in there.
let currentColor = 'red';

// x & y are the x & y coordinates.
window.clickCircle = (x,y) => {
  // if the game isn't in play, any attempt to click on the circles won't work.
  if (!gameInPlay) {
    return;
  }
  // console.log("Testing: I clicked on circle", x, y);

  // This is for going from the top to bottom in the COLUMN:    for (var i = 0; i < grid.length; i++) {
  // but we want to make it go from the bottom up instead , so that when we click on a column, the colored disc is the first thing we see instead.
  // So we use:
  for (var i = grid.length - 1; i >= 0; i--) {
    var row = grid[i];            // all the rows in the grid are now assigned as variabel "row".
    var targetPlace = row[x];     // targetPlace is technically the COLUMN of the colored disc(the x element of the row)
      // console.log(y, targetPlace);  // prints out the y-coordinates of the colored disc (and COLUMN because we are looping through a COLUMN). y is also the row number.

      // We will put our colored disc in the first empty circle(note: use !targetPlace.color and not !targetPlace because there's always a targetPlace, it is just empty or not.):
      if (!targetPlace.color) {
        row[x] = {color: currentColor}; // color is a property of the "circle" object we defined earlier in "render" function.
        // changing the color for subsequent click.
        currentColor = (currentColor === "red") ? "yellow" : "red" // assigning currentColor using a condition via ternary operator. if currentColor is red, then change currentColor to yellow, otherwise currentColor is yellow so change it to red.
        render(); // call the render function. IMPORTANT.
        checkForWinner();
        return;
      }
  }
};

// Concept: Since it is ConnectFour, the horizontal and diagonal wins will have to go through the middle column. The only win that doesn't go through the middle column is the vertical win.

// Concept(vertical win): For each circle, if the circle's i value is 0 or 1 or 2 (top 3 rows) && if it has 3 circles below it of the same color, it is a WIN.

// Concept(horizontal win): For each circle, if the circle's j value is 0 or 1 or 2 or 3 (the first 4 columns for the left) && if it has 3 circles to the right of it of the same color, it is a WIN.

// Concept(diagonal win):
// -  DIAGONALLY RIGHT means "\"; downward sloping.
// -  DIAGONALLY LEFT means "/"; upward sloping.
//  1)  For each circle, if the circle's i value is 0 or 1 or 2 (top 3 rows) && it is in the first 4 LEFTMOST circles in the row
//      -   then if it has 3 circles DIAGONALLY RIGHT to it of the same color, it is a WIN.
//  2)  For each circle, if the circle's i value is 0 or 1 or 2 (top 3 rows) && it is in the first 4 RIGHTMOST circles in the row
//      -   then if  it has 3 circles DIAGONALLY LEFT to it of the same color, it is a win.

// ============= Check for Winner ============
function checkForWinner() {
  console.log("Is there a winner?");
  // Getting the circle.
  for (var i = 0; i < grid.length; i++) {
    var row = grid[i];
    for (var j = 0; j < row.length; j++) {
      var circle = grid[i][j];
      if (circle.color) { // technically, I only need: if (circle.color) {
        // ============= Check for VERTICAL WIN =================
        // for the top 3 rows(i) (change the value of i accordingly if the grid is bigger/smaller)

        // IMPORTANT: using a for loop, e.g
        //    for (i == 0; i <= 2; i++) {
        // instead of a if loop
        //    if (i === 0 || i === 1 || i === 2) {
        // will not work because we're counting all the rows/columns together instead of a single row/column. This means that even if there's no real ConnectFour, as long as there's a ConnectFour within those rows/columns(i.e even if it is seperated), there will be a win(due to the overlapping of the rows/columns), which is not something we want.
        if (i === 0 || i === 1 || i === 2) {
          if (grid[i + 1][j].color === circle.color &&
              grid[i + 2][j].color === circle.color &&
              grid[i + 3][j].color === circle.color) {
                // alert(circle.color + " wins!");
                winningMessage(circle.color);
                return;
              }
        }
        // ============== Check for HORIZONTAL WIN ==============
        // for the leftmost 4 columns(j) (change the value of j accordingly if the grid is bigger/smaller)
        if (j === 0 || j === 1 || j === 2 || j === 3) {
          if (grid[i][j + 1].color === circle.color &&
              grid[i][j + 2].color === circle.color &&
              grid[i][j + 3].color === circle.color) {
                // alert(circle.color + " wins!");
                winningMessage(circle.color);
                return;
              }
        }
        // ============== Check for DIAGONAL WIN (Diagonally Right) =============
        // for the top 3 rows(i) && DIAGONALLY RIGHT(downward sloping)
        if (i === 0 || i === 1 || i === 2) {
          // if the circle is one of the first 4 LEFTMOST circles in the row
          if (j === 0 || j === 1 || j === 2 || j === 3) {
            if (grid[i + 1][j + 1].color === circle.color &&
                grid[i + 2][j + 2].color === circle.color &&
                grid[i + 3][j + 3].color === circle.color) {
                  // alert(circle.color + " wins!");
                  winningMessage(circle.color);
                  return;
            }
          }
        }
        // ============== Check for DIAGONAL WIN (Diagonally Left) =============
        // for the top 3 rows(i) && DIAGONALLY LEFT(upward sloping)
        if (i === 0 || i === 1 || i === 2) {
          // if the circle is one of the first 4 RIGHTMOST circles in the row
          if (j === 3 || j === 4 || j === 5 || j === 6 ) {
            if (grid[i + 1][j - 1].color === circle.color &&
                grid[i + 2][j - 2].color === circle.color &&
                grid[i + 3][j - 3].color === circle.color) {
              // alert(circle.color + " wins!");
              winningMessage(circle.color);
              return;
            }
          }
        }
      }
    }
  }
};

// ========== Winner Message ===============
// const winner = checkForWinner(row, col) {
//   if (winner) {
//     alert(`Game over! Player ${that.player} has won!`);
//     return;
//   }
// }


function winningMessage(color) {
  // console.log("module fired!")
  gameInPlay = false; // change the gameInPlay value to false so the player cannot click on any more circles.
  document.getElementById("winner").innerHTML = `${color} wins!`;
  $('#winningmessage').modal('show')
}

restart(); // Initialise the starting grid at the start

// render(); // for the starting empty grid. (Don't need this as it is already part of function restart().)
