// ========================== https://mattschmoyer.com/connect-four-ai/ =========================
// ========================= http://connect4.ist.tugraz.at:8080/ ================================
// ======================== http://www.ollie-odonnell.com/ConnectFour ===========================
// ======================== https://codepen.io/lonekorean/project/editor/ZGpqVX =================
// ======================== http://codersblock.com/blog/align-4-retrospective-writing-a-multi-threaded-game-in-javascript/ =======
// ======================== http://kenrick95.github.io/c4/ ======================================
// ======================== https://rmarcus.info/blog/2014/12/23/connect4.html ==================
// ======================== https://www.gimu.org/connect-four-js/plain/minimax/index.html =======

var computer = (function() {

  function checkWinner(state) {
    // return true if a player has won on the given state
    // and the ID of the winning player
  }

  function legalMoves(state) {
    // return array of legal columns that can be played
  }

  function getNextState(column, currState) {
    // given the column to be played and the current state of the game
    //  return the next map state with the column being filled
  }

  function getPlay(map, timelimit) {
    var startTime = new Date().getTime();
    var legal = legalMoves(map);
    // If there is only one legal move just return it window
    if (legal.length === 1) {
      return legal[0];
    }
    var gamesPlayed = 0;
    while (new Date().getTime() - startTime < timeLimit) {
      gamesPlayed++;
      runSimulation(map);
    }
    // TODO: Analyze the results and return a play
  }

  var plays = {};
  var wins = {};

  function runSimulation(state) {
    var visitedStates = [];
    var player = 2; // Let's assume the AI is player 2
    var expand = true;
    var winnerId = 0;
    // Games are short enough that we don't have to put limit on number of moves
    while (true) {
      legal = legalMoves(state);
      if (legal.length === 0) {
        break;
      }

      play = legal[Math.floor(Math.random() * legal.length)]; // Math.floor runs a number downward(more negative) to the nearest integer.
      state =  getN
    }
  }

  return {
    getPlay: getPlay
  };

})();
