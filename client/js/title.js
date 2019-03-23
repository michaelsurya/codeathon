var titleState = {
	create: function (){
		var nameLabel = game.add.text(160, 80, "Click anywhere to start", {
			font: '14px Space Mono', fill: '#ffffff'
		});
	},
	update: function(){
		if (game.input.activePointer.isDown) {
			game.state.start('play')
		}
	}
}
