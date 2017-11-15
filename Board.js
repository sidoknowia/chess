class Board{

	constructor(){
		this.board_position = {
			'W' : {
				'R' : ['a1', 'h1'],
				'N' : ['b1' , 'g1'],
				'B' : ['c1', 'f1'],
				'Q' : ['d1'],
				'K' : ['e1'],
				'P' : ['a2','b2','c2','d2','e2','f2','g2','h2']
			},
			'B' : {
				'R' : ['a8', 'h8'],
				'N' : ['b8' , 'g8'],
				'B' : ['c8', 'f8'],
				'Q' : ['d8'],
				'K' : ['e8'],
				'P' : ['a7','b7','c7','d7','e7','f7','g7','h7']
			}
		}
	}

}

module.exports = Board;