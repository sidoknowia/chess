import React, { Component } from 'react';
import Board from './Board';
//import Game from './Game';

export default class MoveBox extends Component{
	constructor(){
		super();
		//let chess_gm = new Game();
	}

	render(){
		return(
			<div className="move-box">
				Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
			</div>
		)
	}
}
