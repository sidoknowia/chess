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
			},
			pieceNotations : {
				'B' : {
					'R' : '9820', //'\U265C', //'\u03A9' //'&#9820;',
					'N' : "9822",
					'B' : "9821",
					'Q' : "9819",
					'K' : "9818",
					'P' : "9823"
				},

				'W' : {
					'R' : "9814",
					'N' : "9816",
					'B' : "9815",
					'Q' : "9813",
					'K' : "9812",
					'P' : "9817"
				}
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

		console.log(move);
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

	getPieceNotiation(id){

		let bp = this.state.game.board_position;
		console.log(bp);

		for (const color in bp){
			let clr = color;	
			//console.log(clr);
			var clrObj = bp[clr];
			//console.log(clrObj);


			for(const pcs in clrObj){
				let pc = pcs;
				
				var pcsObj = clrObj[pc];
				// console.log(pcs);
				// console.log(pcsObj);
				for(var i = 0; i < pcsObj.length; i++){
					if(pcsObj[i] == id){

						// this.cl_pclr = clr;
						// this.cl_pc = pc;
						// this.cl_pcn = String.fromCharCode( this.state.pieceNotations[clr][pc] );

						// this.setState({
						// 	pClr : clr,
						// 	pc 	 : pc,
						// 	pcN  : String.fromCharCode( this.state.pieceNotations[clr][pc] )
						// });

						console.log(pcsObj[i]);
						console.log(clr);
						console.log(pcs);
						console.log(String.fromCharCode( this.state.pieceNotations[clr][pc] ));

						return String.fromCharCode( this.state.pieceNotations[clr][pc] );
					}
				}
			}

		}

		return "";
	}
	

	render(){
		//const cl = ['block', 'white-block'];

		return(
			<div className="chess-board">

				<div className="block white-block" id="a8" onClick={(e) => this.activateOrMovePiece(e) }>
					<Piece {...this.state.game.board_position} cl_id = {"a8"}  cl_pc = {""} cl_pclr = {""} cl_pcn = {this.getPieceNotiation("a8")}/>
				</div>
				<div className="block black-block" id="b8" onClick={(e) => this.activateOrMovePiece(e) }>
					<Piece {...this.state.game.board_position} cl_id = {"b8"}  cl_pc = {""} cl_pclr = {""} cl_pcn = {this.getPieceNotiation("a8")}/>
				</div>
				<div className="block white-block" id="c8" onClick={(e) => this.activateOrMovePiece(e) }>
					<Piece {...this.state.game.board_position} cl_id = {"c8"}  cl_pc = {""} cl_pclr = {""} cl_pcn = {this.getPieceNotiation("a8")}/>
				</div>
				<div className="block black-block" id="d8" onClick={(e) => this.activateOrMovePiece(e) }>
					<Piece {...this.state.game.board_position} cl_id = {"d8"}  cl_pc = {""} cl_pclr = {""} cl_pcn = {this.getPieceNotiation("a8")}/>
				</div>
				<div className="block white-block" id="e8" onClick={(e) => this.activateOrMovePiece(e) }>
					<Piece {...this.state.game.board_position} cl_id = {"e8"}  cl_pc = {""} cl_pclr = {""} cl_pcn = {this.getPieceNotiation("a8")}/>
				</div>
				<div className="block black-block" id="f8" onClick={(e) => this.activateOrMovePiece(e) }>
					<Piece {...this.state.game.board_position} cl_id = {"f8"}  cl_pc = {""} cl_pclr = {""} cl_pcn = {this.getPieceNotiation("a8")}/>
				</div>
				<div className="block white-block" id="g8" onClick={(e) => this.activateOrMovePiece(e) }>
					<Piece {...this.state.game.board_position} cl_id = {"g8"}  cl_pc = {""} cl_pclr = {""} cl_pcn = {this.getPieceNotiation("a8")}/>
				</div>
				<div className="block black-block" id="h8" onClick={(e) => this.activateOrMovePiece(e) }>
					<Piece {...this.state.game.board_position} cl_id = {"h8"}  cl_pc = {""} cl_pclr = {""} cl_pcn = {this.getPieceNotiation("a8")}/>
				</div>

				
				<div className="block black-block" id="a7" onClick={(e) => this.activateOrMovePiece(e) }>
					<Piece {...this.state.game.board_position} cl_id = {"a7"}  />
				</div>
				<div className="block white-block" id="b7" onClick={(e) => this.activateOrMovePiece(e)}>
					<Piece {...this.state.game.board_position} cl_id = {"b7"}  />
				</div>
				<div className="block black-block" id="c7" onClick={(e) => this.activateOrMovePiece(e)}>
					<Piece {...this.state.game.board_position} cl_id = {"c7"}  />
				</div>
				<div className="block white-block" id="d7" onClick={(e) => this.activateOrMovePiece(e)}>
					<Piece {...this.state.game.board_position} cl_id = {"d7"}  />
				</div>
				<div className="block black-block" id="e7" onClick={(e) => this.activateOrMovePiece(e)}>
					<Piece {...this.state.game.board_position} cl_id = {"e7"}  />
				</div>
				<div className="block white-block" id="f7" onClick={(e) => this.activateOrMovePiece(e)}>
					<Piece {...this.state.game.board_position} cl_id = {"f7"}  />
				</div>
				<div className="block black-block" id="g7" onClick={(e) => this.activateOrMovePiece(e)}>
					<Piece {...this.state.game.board_position} cl_id = {"g7"}  />
				</div>
				<div className="block white-block" id="h7" onClick={(e) => this.activateOrMovePiece(e)}>
					<Piece {...this.state.game.board_position} cl_id = {"h7"}  />
				</div>
			

				<div className="block white-block" id="a6" onClick={(e) => this.activateOrMovePiece(e)}>
					<Piece {...this.state.game.board_position} cl_id = {"a6"}  />
				</div>
				<div className="block black-block" id="b6" onClick={(e) => this.activateOrMovePiece(e)}>
					<Piece {...this.state.game.board_position} cl_id = {"b6"}  />
				</div>
				<div className="block white-block" id="c6" onClick={(e) => this.activateOrMovePiece(e)}>
					<Piece {...this.state.game.board_position} cl_id = {"c6"}  />
				</div>
				<div className="block black-block" id="d6" onClick={(e) => this.activateOrMovePiece(e)}>
					<Piece {...this.state.game.board_position} cl_id = {"d6"}  />
				</div>
				<div className="block white-block" id="e6" onClick={(e) => this.activateOrMovePiece(e)}>
					<Piece {...this.state.game.board_position} cl_id = {"e6"}  />
				</div>
				<div className="block black-block" id="f6" onClick={(e) => this.activateOrMovePiece(e)}>
					<Piece {...this.state.game.board_position} cl_id = {"f6"}  />
				</div>
				<div className="block white-block" id="g6" onClick={(e) => this.activateOrMovePiece(e)}>
					<Piece {...this.state.game.board_position} cl_id = {"g6"}  />
				</div>
				<div className="block black-block" id="h6" onClick={(e) => this.activateOrMovePiece(e)}>
					<Piece {...this.state.game.board_position} cl_id = {"h6"}  />
				</div>
				

				<div className="block black-block" id="a5" onClick={(e) => this.activateOrMovePiece(e)}>
					<Piece {...this.state.game.board_position} cl_id = {"a5"}  />
				</div>
				<div className="block white-block" id="b5" onClick={(e) => this.activateOrMovePiece(e)}>
					<Piece {...this.state.game.board_position} cl_id = {"b5"}  />
				</div>
				<div className="block black-block" id="c5" onClick={(e) => this.activateOrMovePiece(e)}>
					<Piece {...this.state.game.board_position} cl_id = {"c5"}  />
				</div>
				<div className="block white-block" id="d5" onClick={(e) => this.activateOrMovePiece(e)}>
					<Piece {...this.state.game.board_position} cl_id = {"d5"}  />
				</div>
				<div className="block black-block" id="e5" onClick={(e) => this.activateOrMovePiece(e)}>
					<Piece {...this.state.game.board_position} cl_id = {"e5"}  />
				</div>
				<div className="block white-block" id="f5" onClick={(e) => this.activateOrMovePiece(e)}>
					<Piece {...this.state.game.board_position} cl_id = {"f5"}  />
				</div>
				<div className="block black-block" id="g5" onClick={(e) => this.activateOrMovePiece(e)}>
					<Piece {...this.state.game.board_position} cl_id = {"g5"}  />
				</div>
				<div className="block white-block" id="h5" onClick={(e) => this.activateOrMovePiece(e)}>
					<Piece {...this.state.game.board_position} cl_id = {"h5"}  />
				</div>
				

				<div className="block white-block" id="a4" onClick={(e) => this.activateOrMovePiece(e)}>
					<Piece {...this.state.game.board_position} cl_id = {"a4"}  />
				</div>
				<div className="block black-block" id="b4" onClick={(e) => this.activateOrMovePiece(e)}>
					<Piece {...this.state.game.board_position} cl_id = {"b4"}  />
				</div>
				<div className="block white-block" id="c4" onClick={(e) => this.activateOrMovePiece(e)}>
					<Piece {...this.state.game.board_position} cl_id = {"c4"}  />
				</div>
				<div className="block black-block" id="d4" onClick={(e) => this.activateOrMovePiece(e)}>
					<Piece {...this.state.game.board_position} cl_id = {"d4"}  />
				</div>
				<div className="block white-block" id="e4" onClick={(e) => this.activateOrMovePiece(e)}>
					<Piece {...this.state.game.board_position} cl_id = {"e4"}  />
				</div>
				<div className="block black-block" id="f4" onClick={(e) => this.activateOrMovePiece(e)}>
					<Piece {...this.state.game.board_position} cl_id = {"f4"}  />
				</div>
				<div className="block white-block" id="g4" onClick={(e) => this.activateOrMovePiece(e)}>
					<Piece {...this.state.game.board_position} cl_id = {"g4"}  />
				</div>
				<div className="block black-block" id="h4" onClick={(e) => this.activateOrMovePiece(e)}>
					<Piece {...this.state.game.board_position} cl_id = {"h4"}  />
				</div>
				

				<div className="block black-block" id="a3" onClick={(e) => this.activateOrMovePiece(e)}>
					<Piece {...this.state.game.board_position} cl_id = {"a3"}  />
				</div>
				<div className="block white-block" id="b3" onClick={(e) => this.activateOrMovePiece(e)}>
					<Piece {...this.state.game.board_position} cl_id = {"b3"}  />
				</div>
				<div className="block black-block" id="c3" onClick={(e) => this.activateOrMovePiece(e)}>
					<Piece {...this.state.game.board_position} cl_id = {"c3"}  />
				</div>
				<div className="block white-block" id="d3" onClick={(e) => this.activateOrMovePiece(e)}>
					<Piece {...this.state.game.board_position} cl_id = {"d3"}  />
				</div>
				<div className="block black-block" id="e3" onClick={(e) => this.activateOrMovePiece(e)}>
					<Piece {...this.state.game.board_position} cl_id = {"e3"}  />
				</div>
				<div className="block white-block" id="f3" onClick={(e) => this.activateOrMovePiece(e)}>
					<Piece {...this.state.game.board_position} cl_id = {"f3"}  />
				</div>
				<div className="block black-block" id="g3" onClick={(e) => this.activateOrMovePiece(e)}>
					<Piece {...this.state.game.board_position} cl_id = {"g3"}  />
				</div>
				<div className="block white-block" id="h3" onClick={(e) => this.activateOrMovePiece(e)}>
					<Piece {...this.state.game.board_position} cl_id = {"h3"}  />
				</div>
				

				<div className="block white-block" id="a2" onClick={(e) => this.activateOrMovePiece(e) }>
					<Piece {...this.state.game.board_position} cl_id = {"a2"}  cl_pc = {""} cl_pclr = {""} cl_pcn = {""} />
				</div>
				<div className="block black-block" id="b2" onClick={(e) => this.activateOrMovePiece(e)}>
					<Piece {...this.state.game.board_position} cl_id = {"b2"}  />
				</div>
				<div className="block white-block" id="c2" onClick={(e) => this.activateOrMovePiece(e)}>
					<Piece {...this.state.game.board_position} cl_id = {"c2"}  />
				</div>
				<div className="block black-block" id="d2" onClick={(e) => this.activateOrMovePiece(e)}>
					<Piece {...this.state.game.board_position} cl_id = {"d2"}  />
				</div>
				<div className="block white-block" id="e2" onClick={(e) => this.activateOrMovePiece(e)}>
					<Piece {...this.state.game.board_position} cl_id = {"e2"}  />
				</div>
				<div className="block black-block" id="f2" onClick={(e) => this.activateOrMovePiece(e)}>
					<Piece {...this.state.game.board_position} cl_id = {"f2"}  />
				</div>
				<div className="block white-block" id="g2" onClick={(e) => this.activateOrMovePiece(e)}>
					<Piece {...this.state.game.board_position} cl_id = {"g2"}  />
				</div>
				<div className="block black-block" id="h2" onClick={(e) => this.activateOrMovePiece(e)}>
					<Piece {...this.state.game.board_position} cl_id = {"h2"}  />
				</div>
				

				<div className="block black-block" id="a1" onClick={(e) => this.activateOrMovePiece(e) }>
					<Piece {...this.state.game.board_position} cl_id = {"a1"}  />
				</div>
				<div className="block white-block" id="b1" onClick={(e) => this.activateOrMovePiece(e) }>
					<Piece {...this.state.game.board_position} cl_id = {"b1"}  />
				</div>
				<div className="block black-block" id="c1" onClick={(e) => this.activateOrMovePiece(e) }>
					<Piece {...this.state.game.board_position} cl_id = {"c1"}  />
				</div>
				<div className="block white-block" id="d1" onClick={(e) => this.activateOrMovePiece(e) }>
					<Piece {...this.state.game.board_position} cl_id = {"d1"}  />
				</div>
				<div className="block black-block" id="e1" onClick={(e) => this.activateOrMovePiece(e) }>
					<Piece {...this.state.game.board_position} cl_id = {"e1"}  />
				</div>
				<div className="block white-block" id="f1" onClick={(e) => this.activateOrMovePiece(e) }>
					<Piece {...this.state.game.board_position} cl_id = {"f1"}  />
				</div>
				<div className="block black-block" id="g1" onClick={(e) => this.activateOrMovePiece(e) }>
					<Piece {...this.state.game.board_position} cl_id = {"g1"}  />
				</div>
				<div className="block white-block" id="h1" onClick={(e) => this.activateOrMovePiece(e) }>
					<Piece {...this.state.game.board_position} cl_id = {"h1"}  />
				</div>
				
				
			</div>
		)
		
		
	}


}

module.exports = Game;