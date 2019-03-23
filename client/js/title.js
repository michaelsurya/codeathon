var titleState = {
	create: function (){
		// var nameLabel = game.add.text(160, 80, "Click anywhere to start", {
		// 	font: '14px Space Mono', fill: '#ffffff'
		// });
		if(game.input.activePointer.leftButton.isDown){
			game.state.start('play')
		}
	},
	update: function(){
		// if (game.input.activePointer.isDown) {
		// }
	}
}
