import React, { Component } from 'react';
import Game from './Game';
import MoveBox from './MoveBox';


export default class GameLoader extends Component{
	render(){
		
		return(
			<div className="container">
				
				<div className="row" id="place_center">
					<div className="span8">
						<Game />
					</div>
					<div className="span3">
						<MoveBox />
					</div>
				</div>

			</div>
		)
	}
}
