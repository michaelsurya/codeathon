var socket;

// If claimed
let connected = false;
let players = []
let playersMove = [{ playerId: 1, direction: "O" }, { playerId: 2, direction: "O" }, { playerId: 3, direction: "O" }, { playerId: 4, direction: "O" }]
let playersAttacking = [{ playerId: 1, attacking: false }, { playerId: 2, attacking: false }, { playerId: 3, attacking: false }, { playerId: 4, attacking: false }]

let gameStarted = false;

let playerLabel;

var vibratePlayer;

var titleState = {
	create: function (){
		game.add.text(100, 200, "Click anywhere to start", {
			font: '14px Space Mono', fill: '#ffffff'
		});

		playerLabel = game.add.text(100, 80, "Player count: 0", {
			font: '14px Space Mono', fill: '#ffffff'
		});

		socket = io('http://vija02.localhost.run');

		// Functions to send to user
		vibratePlayer = (playerId) => {
			socket.emit('vibrate', { playerId })
		}

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

		// Game related stuff

		// On Direction
		socket.on("direction", (data) => {
			const theIndex = playersMove.findIndex(e.playerId === data.playerId)
			playersMove[theIndex] = { playerId: data.playerId, direction: data.direction}
		})

		// On Attack
		socket.on("attack", (data) => {
			const theIndex = playersAttacking.findIndex(e.playerId === data.playerId)
			playersAttacking[theIndex] = { playerId: data.playerId, attacking: true }
		})

		// Clean up
		socket.on('disconnect', function () {
			connected = false
		});

	},
	update: function(){
		playerLabel.setText(`Player count: ${players.length}`);

		if (game.input.activePointer.isDown && connected && players.length > 1) {
			gameStarted = true;
			game.state.start('play')
		}
	}
}
