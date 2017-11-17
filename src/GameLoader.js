import React, { Component } from 'react';
import MoveBox from './MoveBox';


export default class GameLoader extends Component{
	render(){
		console.log("Hi 2");
		return(
			<div>
				<h1>Hello Frm React aaq!</h1>
				<h2>Hi thre</h2>

				<MoveBox />
			</div>
		)
	}
}
