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
			},
			move_color : 'W',
			in_check : false,
			occupied_squares : ['a1','b1','c1','d1','e1','f1','g1','h1',
								'a2','b2','c2','d2','e2','f2','g2','h2',
								'a8','b8','c8','d8','e8','f8','g8','h8',
								'a7','b7','c7','d7','e7','f7','g7','h7']
			
		};

		this.activateOrMovePiece = this.activateOrMovePiece.bind(this);
		//this.moveactivateOrMovePiece = this.moveactivateOrMovePiece.bind(this);
	}

	make_move(color = null, piece ,start, end, move_type){
		let move;
		let gm = JSON.parse(JSON.stringify(this.state.game.moves));
		let os = JSON.parse(JSON.stringify(this.state.occupied_squares));

		let valid = this.checkIfLegalMove(color , piece, start, end, move_type, this.state.game.board_position.board_position);

		if(!valid){
			return false;
		}

		let is_in_chk = this.check_if_check(color, piece, end, this.state.game.board_position.board_position,this.state.occupied_squares);


		if(color == 'W'){
			//valid = true;
			if(valid){
				move = {
					'W' : 	[piece, start, end]
				}
				gm.push(move);

				this.setState({
					move_color : 'B'
				});
				
			}
		}

		if(color == 'B'){
			//valid = true;
			if(valid){
				move = [piece, start, end];
				gm.sort();
				gm[gm.length-1]["B"] = move;

				this.setState({
					move_color : 'W'
				});

				//this.update_board_position(color, piece, start, end, gm);
			}
		}

		let startI = os.indexOf(start); console.log("start ", startI)
		let endI   = os.indexOf(end);
		if(startI != -1){
			os[startI] = end;
			if(endI != -1){
				os[endI] = null;
			}
		}

		this.setState({
			occupied_squares : os
		})

		this.update_board_position(color, piece, start, end, gm);
		console.log(move);
	}

/*
	Updating Position on Board -- For UI only
*/
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

			console.log("board_position : " , this.state.game.board_position);
			//console.log("Clone Obj : " , bpObj);
		}

		this.setState({
	      activePiece: {
	      	'color' : '',
			'piece' : '',
			'start' : '',
			'end'   : ''
	      },
	      game : {
	      	board_position : bpObj,
	      	moves : gm
	      }
	    });


		console.log("after update ",this.state);
		//this.forceUpdate();
	};

	activateOrMovePiece (e, color, piece) {
		//console.log(color);
		//console.log(piece);
		//console.log("parent - self id : ", e.target.parentNode.id); //d2
		//console.log("target - " ,e.target.id); //null
		//console.log()
		//console.log(e.target.getAttribute('datacolor'));

		if(this.state.activePiece.color != "" ){ 
			//console.log("peice is selected");
			if(e.target.getAttribute('datacolor') == "W" || e.target.getAttribute('datacolor') == "B" ){ 
				//console.log("end position has a piece");
				if( e.target.getAttribute('datacolor') != this.state.activePiece.color ){
					//console.log("Opponent child - takes move");
					this.make_move(this.state.activePiece.color, this.state.activePiece.piece, this.state.activePiece.start, e.target.parentNode.id, 'takes');
					return "";
				}
			}
		}

		if (!e.target.id){ // console.log("Activating a piece")

			if(this.state.move_color != e.target.getAttribute('datacolor')){  
				// making sure it is correct person's turn. If colors don't match - same person is moving twice
				return false;
			}

			this.setState({
		      activePiece: {
		      	'color' : e.target.getAttribute('datacolor'),
				'piece' : e.target.getAttribute('datapiece'),
				'start' : e.target.parentNode.id
				//'end'   : ''
		      }
		    });
			return "";
		}

		if( e.target.id ) { // console.log("no child - make move");
			this.make_move(this.state.activePiece.color, this.state.activePiece.piece, this.state.activePiece.start, e.target.id, 'move')
		}

	    //console.log(this.state);
	};

	getBoardMatrix(s,n){
		var mat = [];
		
		for(var i = 0; i<n.length; i++){
			var row = [];
			for(var j = 0; j < s.length; j++){
				var cell = s[j]+n[i];
				row.push(cell);
			}
			mat.push(row);
		}

		return mat;
	}

	searchBoardForPieces(positions, board_position){
		//console.log(" pcs checking " + positions);

		if(typeof(positions) == 'string'){
				//console.log(" pcs checking str", board_position);

			for (var color in board_position){
				console.log(" color", color);
				var clrObj = board_position[color];

						//console.log(" clrObj checking ",clrObj);

				for(var pcs in clrObj){
					var pcsObj = clrObj[pcs];

						//console.log(" pcsObj checking ",pcsObj);

					for(var i = 0; i < pcsObj.length; i++){
						//console.log(" pcs checking ", pcsObj[i] + "  " + positions)
						if(pcsObj[i] == positions){
							return false;
						}
					}

				}

			}

			return true;
		}

		return true;
	}

	checkIfLegalMove(color, piece, start, end, move_type, board_position){
		let canMove = false;
		let squares = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
		let numbers = ['1', '2', '3', '4', '5', '6', '7', '8'];
		
		//console.log(matrix);

		var startBox = start.split(""); //match(/\d+$/)[0];
		var startBoxAlph = startBox[0];
		var startBoxNumber = parseInt(startBox[1]);

		var endBox = end.split(""); //.match(/\d+$/)[0];
		var endBoxAlph = endBox[0];
		var endBoxNumber = parseInt(endBox[1]);


		switch (piece){
			case 'P':
				if(color == 'W'){

					if(startBoxNumber < endBoxNumber && (endBoxNumber - startBoxNumber <= 2) ){

						if(move_type == 'takes'){ console.log("n ");
							if(startBoxAlph != endBoxAlph){ 

								var startBoxindexOf = squares.indexOf(startBoxAlph);
								var validAlph = false;
								console.log("n1 ", startBoxindexOf + " : " + squares[startBoxindexOf+1] + "  " + squares[startBoxindexOf-1] + " " + endBoxAlph);

								if( (startBoxAlph == 'a' && endBoxAlph == 'b')  || (startBoxAlph == 'h' && endBoxAlph == 'g')){
									validAlph = true;
								} else if ( endBoxAlph == squares[startBoxindexOf+1] || endBoxAlph == squares[startBoxindexOf-1] ){
									validAlph = true;
								}

								if(validAlph){ console.log("n W", endBoxNumber + " " + startBoxNumber);
									if( endBoxNumber == startBoxNumber + 1 ){
										canMove = true;
									} 
								}
							}
							
							
						} else if(move_type == 'move'){

							if(startBoxAlph == endBoxAlph){
								if(startBoxNumber == 2 && endBoxNumber <= 4){
									if(endBoxNumber == 4){
										var middleSquare = endBoxAlph+3;
										//alert(middleSquare)
										canMove = this.searchBoardForPieces(middleSquare, board_position);
									} else {
										canMove = true;
									}
									
								} else if (startBoxNumber >= 3 && (endBoxNumber == startBoxNumber + 1) ){
									canMove = true;
								}
							}
							
						}
						
					}

				} else if (color == 'B'){
					if(startBoxNumber > endBoxNumber && ( startBoxNumber - endBoxNumber <= 2) ){

						if(move_type == 'takes'){
							if(startBoxAlph != endBoxAlph){ 

								var startBoxindexOf = squares.indexOf(startBoxAlph);
								var validAlph = false;
									//console.log("n1 ", startBoxindexOf + " : " + squares[startBoxindexOf+1] + "  " + squares[startBoxindexOf-1] + " " + endBoxAlph);

								if( (startBoxAlph == 'a' && endBoxAlph == 'b')  || (startBoxAlph == 'h' && endBoxAlph == 'g')){
									validAlph = true;
								} else if ( endBoxAlph == squares[startBoxindexOf+1] || endBoxAlph == squares[startBoxindexOf-1] ){
									validAlph = true;
								}

								if(validAlph){
									if( endBoxNumber == startBoxNumber - 1 ){
										canMove = true;
									} 
								}
							}
							
						} else if(move_type == 'move'){

							if(startBoxAlph == endBoxAlph){
								if(startBoxNumber == 7 && endBoxNumber >= 5){
									if(endBoxNumber == 5){
										var middleSquare = endBoxAlph+6
										canMove = this.searchBoardForPieces(middleSquare, board_position);
									} else {
										canMove = true;
									}
									
								} else if (startBoxNumber <= 6 && (endBoxNumber == startBoxNumber - 1) ){
									canMove = true;
								}
							}
							
						}
						
					}
				}
				
			break;

			case 'R':
				canMove = true;
			break;

			case 'N':
				canMove = true;
			break;

			case 'B':
				canMove = true;
			break;

			case 'Q':
				canMove = true;
			break;

			case 'K':

				canMove = true;
			break;

		}

		return canMove;
	}

	check_if_check(color, piece, end, board_position,occupied_squares){
		var legal_squares = this.get_legal_squares(color,piece,end,board_position, occupied_squares);
	}

	get_legal_squares(color,piece,end,board_position,occupied_squares){
		var canMove;
		let squares = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
		let numbers = ['1', '2', '3', '4', '5', '6', '7', '8'];
		var legal_squares = [];
		let matrix = this.getBoardMatrix (squares, numbers);

		switch(piece){
			case 'P':

				if(color == 'W'){

				}

				if(color == 'B'){

				}

			break;

			case 'R':
				var row = this.get_matrix_row(matrix, squares, numbers, end);
				var col = this.get_matrix_colomn(matrix, squares, numbers, end);
				var rowA = [],
					colA = [];

				console.log(col);

				row.forEach((r) => {
					
					if(occupied_squares.indexOf(r) == -1 && end[1] == r[1]){
						rowA.push(r);
					}
				})

				col.forEach((c) => {
					
					if(end[0] == c[0]){
						if(occupied_squares.indexOf(c) == -1){
							colA.push(c);
						} else {
							console.log(end[0] + " " + c[0] + " " + end[1] + " " + c[1] );
							return;
						}
					}
					
				})

				console.log(rowA);
				console.log(colA);
			break;

			case 'N':
				canMove = true;
			break;

			case 'B':
				canMove = true;
			break;

			case 'Q':
				canMove = true;
			break;

			case 'K':

				canMove = true;
			break;

		}

	}

	get_matrix_row(matrix, squares, numbers, position){

		var endBox = position.split(""); 
		var endBoxNumber = parseInt(endBox[1]);
		//console.log(matrix[endBoxNumber - 1]);
		return matrix[endBoxNumber - 1];
	}

	get_matrix_colomn(matrix, squares, numbers, position){
		var endBox = position.split(""); 
		var endBoxAlph = endBox[0];
		//var i = squares.indexOf(endBoxAlph)+1;

		var col = [];
		for(var j = 1; j<=numbers.length;j++){
			col.push(endBoxAlph+j)
		}
		return col;
	}

	get_matrix_diagnol(matrix, squares, numbers, position){

	}

	render(){
		//const cl = ['block', 'white-block'];

		return(
			<div className="chess-board">

				<div className="block white-block" id="a8" onClick={(e) => this.activateOrMovePiece(e) }>
					<Piece {...this.state.game.board_position} cl_id = {"a8"}  cl_pc = {""} cl_pclr = {""}   />
				</div>
				<div className="block black-block" id="b8" onClick={(e) => this.activateOrMovePiece(e) }>
					<Piece {...this.state.game.board_position} cl_id = {"b8"}  cl_pc = {""} cl_pclr = {""}   />
				</div>
				<div className="block white-block" id="c8" onClick={(e) => this.activateOrMovePiece(e) }>
					<Piece {...this.state.game.board_position} cl_id = {"c8"}  cl_pc = {""} cl_pclr = {""}   />
				</div>
				<div className="block black-block" id="d8" onClick={(e) => this.activateOrMovePiece(e) }>
					<Piece {...this.state.game.board_position} cl_id = {"d8"}  cl_pc = {""} cl_pclr = {""}   />
				</div>
				<div className="block white-block" id="e8" onClick={(e) => this.activateOrMovePiece(e) }>
					<Piece {...this.state.game.board_position} cl_id = {"e8"}  cl_pc = {""} cl_pclr = {""}   />
				</div>
				<div className="block black-block" id="f8" onClick={(e) => this.activateOrMovePiece(e) }>
					<Piece {...this.state.game.board_position} cl_id = {"f8"}  cl_pc = {""} cl_pclr = {""}   />
				</div>
				<div className="block white-block" id="g8" onClick={(e) => this.activateOrMovePiece(e) }>
					<Piece {...this.state.game.board_position} cl_id = {"g8"}  cl_pc = {""} cl_pclr = {""}   />
				</div>
				<div className="block black-block" id="h8" onClick={(e) => this.activateOrMovePiece(e) }>
					<Piece {...this.state.game.board_position} cl_id = {"h8"}  cl_pc = {""} cl_pclr = {""}   />
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
					<Piece {...this.state.game.board_position} cl_id = {"a2"}  />
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