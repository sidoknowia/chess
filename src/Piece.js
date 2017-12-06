import React, { Component } from 'react';
const Board = require("./Board.js");

export default class Piece extends Component{
	constructor(props){
		super(props);
		console.log(props);

		this.state = { 
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

			pClr : '',
			pc  : '',
			pcN : ''
		}

		//this.activatePiece = this.activatePiece.bind(this);
		//console.log(this.state.game);
		//this.clr = '',
		//this.pc = '';

		let id = this.props.cl_id;
		//let pcN = 
		
		//let pc = this.state.pc;
		//let pClr = this.state.clr;


	}

	componentWillMount(){
		this.getPieceNotiation(this.props.cl_id);
	}

	getPieceNotiation(id){

		let bp = this.props.board_position;
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

						this.setState({
							pClr : clr,
							pc 	 : pc,
							pcN  : String.fromCharCode( this.state.pieceNotations[clr][pc] )
						});

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
		//let cl = "block "+ this.props.cl_n;
		return(
			<span className="piece" datapiece={this.state.pc} datacolor={this.state.pClr} >{this.state.pcN}</span>
		)
	}


}