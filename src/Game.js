import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Piece  from "./Piece.js";

const Board = require("./Board.js");
 

export default class Game extends Component{

	constructor(){
		super();
		this.state = {
			players : {
				'player1' : '',
				'player2' : ''
			},
			game : {
				board_position : new Board(),
				moves : []
			},
			activePiece : {
				'color' : '',
				'piece' : '',
				'start' : ''
				//'end'   : ''
			}
		};

		this.activateOrMovePiece = this.activateOrMovePiece.bind(this);
		//this.moveactivateOrMovePiece = this.moveactivateOrMovePiece.bind(this);
	}

	make_move(color = null, piece ,start, end){
		let move;
		let gm = this.state.game.moves;
		let valid = false;

		if(color == 'W'){
			valid = true;
			if(valid){
				move = {
					'W' : 	[piece, start, end]
				}
				gm.push(move);

				this.update_board_position(color, piece, start, end, gm);
			}
		}
		if(color == 'B'){
			valid = true;
			if(valid){
				move = [piece, start, end];
				gm.sort();
				gm[gm.length-1]["B"] = move;

				this.update_board_position(color, piece, start, end, gm);
			}
		}

		//console.log(move);
	}

	update_board_position(color, piece, start, end, gm) {

		let bpObj = this.state.game.board_position;
		console.log("bpObj : " , bpObj)

		if(color == 'W' || color == 'B'){
			let side = bpObj.board_position[color];
			
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
				let op_side = bpObj.board_position['B'];
				
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
				let op_side = bpObj.board_position['W'];

				for(var j = 0; j < pieces.length; j++){
					let op_side_pieces = op_side[pieces[j]];

					for(var i = 0; i < op_side_pieces.length; i++){
						if(op_side_pieces[i] == end){
							op_side_pieces[i] = null;
						}
					}
				}
			}

			console.log(this.state.game.board_position);
			console.log(bpObj);
		}

		this.setState({
	      activePiece: {
	      	'color' : '',
			'piece' : '',
			'start' : ''
			//'end'   : ''
	      },
	      game : {
	      	board_position : bpObj,
	      	moves : gm
	      }
	    });

		this.forceUpdate();
	};

	activateOrMovePiece (e, color, piece) {
		//console.log(color);
		//console.log(piece);
		console.log(e.target.parentNode.id);
		console.log(e.target.id);
		//console.log(e.target.getAttribute('datapiece'));

		if(!e.target.id){

			this.setState({
		      activePiece: {
		      	'color' : e.target.getAttribute('datacolor'),
				'piece' : e.target.getAttribute('datapiece'),
				'start' : e.target.parentNode.id
				//'end'   : ''
		      }
		    });

		} else if( e.target.id ) { alert("no child - make move");
			this.make_move(this.state.activePiece.color, this.state.activePiece.piece, this.state.activePiece.start, e.target.id)
		}

		

		

	    console.log(this.state);
	};

	
	

	render(){
		//const cl = ['block', 'white-block'];

		return(
			<div className="chess-board">

				<div className="block white-block" id="a8" onClick={(e) => this.activateOrMovePiece(e) }>
					<Piece {...this.state.game.board_position} cl_id = {"a8"}  />
				</div>
				
				<div className="block black-block" id="b8"><span className="piece">&#9822;</span></div>
				<div className="block white-block" id="c8"><span className="piece">&#9821;</span></div>
				<div className="block black-block" id="d8"><span className="piece">&#9819;</span></div>
				<div className="block white-block" id="e8"><span className="piece">&#9818;</span></div>
				<div className="block black-block" id="f8"><span className="piece">&#9821;</span></div>
				<div className="block white-block" id="g8"><span className="piece">&#9822;</span></div>
				<div className="block black-block" id="h8"><span className="piece">&#9820;</span></div>

				<div className="block white-block" id="a7" onClick={(e) => this.activateOrMovePiece(e) }>
					<Piece {...this.state.game.board_position} cl_id = {"a7"}  />
				</div>
				
				<div className="block white-block" id="b7"><span className="piece">&#9823;</span></div>
				<div className="block black-block" id="c7"><span className="piece">&#9823;</span></div>
				<div className="block white-block" id="d7"><span className="piece">&#9823;</span></div>
				<div className="block black-block" id="e7"><span className="piece">&#9823;</span></div>
				<div className="block white-block" id="f7"><span className="piece">&#9823;</span></div>
				<div className="block black-block" id="g7"><span className="piece">&#9823;</span></div>
				<div className="block white-block" id="h1"><span className="piece">&#9823;</span></div>


				<div className="block white-block" id="a6"></div>
				<div className="block black-block" id="b6"></div>
				<div className="block white-block" id="c6"></div>
				<div className="block black-block" id="d6"></div>
				<div className="block white-block" id="e6"></div>
				<div className="block black-block" id="f6"></div>
				<div className="block white-block" id="g6"></div>
				<div className="block black-block" id="h6"></div>

				<div className="block black-block" id="a5"></div>
				<div className="block white-block" id="b5"></div>
				<div className="block black-block" id="c5"></div>
				<div className="block white-block" id="d5"></div>
				<div className="block black-block" id="e5"></div>
				<div className="block white-block" id="f5"></div>
				<div className="block black-block" id="g5"></div>
				<div className="block white-block" id="h5"></div>

				<div className="block white-block" id="a4" onClick={(e) => this.moveactivateOrMovePiece(e) }></div>
				<div className="block black-block" id="b4"></div>
				<div className="block white-block" id="c4"></div>
				<div className="block black-block" id="d4"></div>
				<div className="block white-block" id="e4"></div>
				<div className="block black-block" id="f4"></div>
				<div className="block white-block" id="g4"></div>
				<div className="block black-block" id="h4"></div>

				<div className="block black-block" id="a3" onClick={(e) => this.activateOrMovePiece(e)}>
					<Piece ref = {this.state.game.board_position} cl_id = {"a3"}  />
				</div>
				<div className="block white-block" id="b3"></div>
				<div className="block black-block" id="c3"></div>
				<div className="block white-block" id="d3"></div>
				<div className="block black-block" id="e3"></div>
				<div className="block white-block" id="f3"></div>
				<div className="block black-block" id="g3"></div>
				<div className="block white-block" id="h3"></div>

				<div className="block white-block" id="a2" onClick={(e) => this.activateOrMovePiece(e) }>
					<Piece {...this.state.game.board_position} cl_id = {"a2"}  />
				</div>
				
				<div className="block black-block" id="b2"><span className="piece">&#9817;</span></div>
				<div className="block white-block" id="c2"><span className="piece">&#9817;</span></div>
				<div className="block black-block" id="d2"><span className="piece">&#9817;</span></div>
				<div className="block white-block" id="e2"><span className="piece">&#9817;</span></div>
				<div className="block black-block" id="f2"><span className="piece">&#9817;</span></div>
				<div className="block white-block" id="g2"><span className="piece">&#9817;</span></div>
				<div className="block black-block" id="h2"><span className="piece">&#9817;</span></div>

				<div className="block black-block" id="a1" onClick={(e) => this.activateOrMovePiece(e) }>
					<Piece {...this.state.game.board_position} cl_id = {"a1"}  />
				</div>
				
				<div className="block white-block" id="b1"><span className="piece">&#9816;</span></div>
				<div className="block black-block" id="c1"><span className="piece">&#9815;</span></div>
				<div className="block white-block" id="d1"><span className="piece">&#9813;</span></div>
				<div className="block black-block" id="e1"><span className="piece">&#9812;</span></div>
				<div className="block white-block" id="f1"><span className="piece">&#9815;</span></div>
				<div className="block black-block" id="g1"><span className="piece">&#9816;</span></div>
				<div className="block white-block" id="h1"><span className="piece">&#9814;</span></div>
			</div>
		)
		
		
	}


}

module.exports = Game;