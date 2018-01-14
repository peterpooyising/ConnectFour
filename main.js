// Connect Four Board (6 Rows X 7 Columns)
const grid = [
  [{},{},{},{},{},{},{}],
  [{},{},{},{},{},{},{}],
  [{},{},{},{},{},{},{}],
  [{},{},{},{},{},{},{}],
  [{},{},{},{},{},{},{}],
  [{},{},{},{color: "red"},{color: "yellow"},{},{}],
];

// We use a for loop inside of another for loop to cycle through all the values, otherwise to access individual values we can just use grid[i][j].

// Render function
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
      doc = doc + `<circle onclick="clickCircle(${j},${i})" stroke="#000000" stroke-width="2px" fill="${color}" r="30px" cx="${j * 100 + 100 }px" cy="${i * 100 + 110}px"></circle>`; // IMPORTANT: j represents the x-coordinate, i represents y-coordinate.
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
        currentColor = currentColor === "red" ? "yellow" : "red"
        render(); // call the render function. IMPORTANT.
        return;
      }
  }
}

render();
