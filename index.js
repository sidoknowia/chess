const Board = require("./Board.js");
const Game = require('./Game.js');

let chess_gm = new Game();

console.log(chess_gm);

chess_gm.make_move('W', 'P', 'e2', 'e4');
chess_gm.make_move('B', 'P', 'e7', 'e5');

chess_gm.make_move('W', 'N', 'g1', 'f3');
chess_gm.make_move('B', 'P', 'd7', 'd5');

chess_gm.make_move('W', 'P', 'e4', 'd5');
chess_gm.make_move('B', 'Q', 'd8', 'd5');


console.log(chess_gm);
console.log(chess_gm.game.moves);
console.log(chess_gm.game.board_position.board_position);