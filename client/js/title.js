var socket;

// If claimed
let connected = false;

let players = []


let playerLabel;

var titleState = {
	create: function (){
		game.add.text(100, 200, "Click anywhere to start", {
			font: '14px Space Mono', fill: '#ffffff'
		});

		playerLabel = game.add.text(100, 80, "Player count: 0", {
			font: '14px Space Mono', fill: '#ffffff'
		});

		socket = io('http://vija02.localhost.run');

		// Connect stuff
		socket.on('connect', () => {
			socket.emit('claimWeb')
		})
		socket.on('claimWeb', function () {
			connected = true
			socket.on('event', function (data) { });
			socket.on('disconnect', function () { });
		});

		// Listen for users
		socket.on("syncUser", (data) => {
			players = data.users
		})
		
		socket.on('disconnect', function () {
			connected = false
		});

	},
	update: function(){
		playerLabel.setText(`Player count: ${players.length}`);

		if (game.input.activePointer.isDown && connected && players.length > 1) {
			game.state.start('play')
		}
	}
}
