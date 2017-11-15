const Board = require("./Board.js");

class Game{

	constructor(){
		this.game = {
			'player1' : '',
			'player2' : '',
			board_position : new Board(),
			moves : []
		};
	}

	make_move(color = null, piece ,start, end){
		let move;
		let gm = this.game.moves;
		let valid = false;

		if(color == 'W'){
			valid = true;
			if(valid){
				move = {
					'W' : 	[piece, start, end]
				}
				gm.push(move);

				this.update_board_position(color, piece, start, end);
			}
		}
		if(color == 'B'){
			valid = true;
			if(valid){
				move = [piece, start, end];
				gm.sort();
				gm[gm.length-1]["B"] = move;

				this.update_board_position(color, piece, start, end);
			}
		}

		//console.log(move);
	}

	update_board_position(color, piece, start, end) {

		if(color == 'W' || color == 'B'){
			let side = this.game.board_position.board_position[color];
			
			let side_pieces = side[piece];
			//console.log(side_pieces);


			for(var i = 0; i < side_pieces.length; i++){
				if(side_pieces[i] == start){
					side_pieces[i] = end;
				}
			}

			// Takes Functionality
			var pieces = ['R', 'N', 'B', 'Q', 'P'];

			if(color == 'W'){
				let op_side = this.game.board_position.board_position['B'];
				
				for(var j = 0; j < pieces.length; j++){
					let op_side_pieces = op_side[pieces[j]];

					for(var i = 0; i < op_side_pieces.length; i++){
						if(op_side_pieces[i] == end){
							op_side_pieces[i] = null;
						}
					}
				}
				
			}

			if(color == 'B'){
				let op_side = this.game.board_position.board_position['W'];

				for(var j = 0; j < pieces.length; j++){
					let op_side_pieces = op_side[pieces[j]];

					for(var i = 0; i < op_side_pieces.length; i++){
						if(op_side_pieces[i] == end){
							op_side_pieces[i] = null;
						}
					}
				}
			}

			//console.log(this.game.board_position.toString());
			//console.log(side);
		}
	}

}

module.exports = Game;