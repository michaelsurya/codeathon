var map
var layer
var bullet_array = []
var socket
var other_player = {}

const player_map = players.map(player => {
	return {
		id: player,
		sprite: null, //Will hold the sprite when it's created
		speed: 2, // This is the parameter for how fast it should move
		alive: true,
		facing: 'N',
		update: function() {
			this.sprite.animation.add('attack', 44, 6)
			if (player === 1) {
				this.sprite.animations.add('down', [0, 1, 2, 3], 6)
				this.sprite.animations.add('up', [4, 5, 6, 7], 6)
				this.sprite.animations.add('side', [8, 9, 10], 6)
			}
			if (player === 2) {
				this.sprite.animations.add('down', [11, 12, 13, 14], 6)
				this.sprite.animations.add('up', [15, 16, 17, 18], 6)
				this.sprite.animations.add('side', [19, 20, 21], 6)
			}
			if (player === 3) {
				this.sprite.animations.add('down', [22, 23, 24, 25], 6)
				this.sprite.animations.add('up', [26, 27, 28, 29], 6)
				this.sprite.animations.add('side', [30, 31, 32], 6)
			}
			if (player === 4) {
				this.sprite.animations.add('down', [33, 34, 35, 36], 6)
				this.sprite.animations.add('up', [37, 38, 39, 40], 6)
				this.sprite.animations.add('side', [41, 42, 43], 6)
			}

			this.sprite.frame = 0
			this.sprite.sfx = {}
			this.sprite.sfx.collide = game.add.audio('hit')

			const theDirection = playersMove.find(e => e.playerId === this.id).direction

			if (theDirection === 'N') {
				this.facing = 'N'
				this.sprite.body.y += -this.speed
				this.sprite.animations.play('up')
			}
			if (theDirection === 'S') {
				this.facing = 'S'
				this.sprite.body.y += this.speed
				this.sprite.animations.play('down')
			}
			if (theDirection === 'E') {
				this.facing = 'E'
				this.sprite.body.x += this.speed
				this.sprite.animations.play('side')
			}
			if (theDirection === 'W') {
				this.facing = 'W'
				this.sprite.body.x += -this.speed
				this.sprite.animations.play('side')
			}

			if(){
				this.sprite.animation.play('attack');
				if(this.sprite.facing === 'N'){
					for(var i=0; i<10; i++){
						var x = this.sprite.body.x
						var y = this.sprite.body.y - i

						player_map.forEach((player) => {
							if(player.sprite.body.x === x && player.sprite.body.y === y){
								player.sprite.destroy();
							}
						})
					}
				}
				if(this.sprite.facing === 'S'){
					for(var i=0; i<10; i++){
						var x = this.sprite.body.x
						var y = this.sprite.body.y + i

						player_map.forEach((player) => {
							if(player.sprite.body.x === x && player.sprite.body.y === y){
								player.sprite.destroy();
							}
						})
					}
				}
				if(this.sprite.facing === 'W'){
					for(var i=0; i<10; i++){
						var x = this.sprite.body.x - i
						var y = this.sprite.body.y

						player_map.forEach((player) => {
							if(player.sprite.body.x === x && player.sprite.body.y === y){
								player.sprite.destroy();
							}
						})
					}
		
				}
				if(this.sprite.facing === 'E'){
					for(var i=0; i<10; i++){
						var x = this.sprite.body.x + i
						var y = this.sprite.body.y

						player_map.forEach((player) => {
							if(player.sprite.body.x === x && player.sprite.body.y === y){
								player.sprite.destroy();
							}
						})
					}
				}

			// Tell the server we've moved
			// socket.emit('move-player',{x:this.sprite.x,y:this.sprite.y});
		},

		onCollide: function() {
			this.sprite.sfx.collide.play()
			game.add.tween(this.sprite).to({ alpha: 1 }, 1000, Phaser.Easing.Linear.None, true)
			setTimeout(() => {
				game.add.tween(this.sprite).to({ alpha: 0 }, 1000, Phaser.Easing.Linear.None, true)
			}, 1000)
		},

		collideSound: function() {
			this.sprite.sfx.collide.play()
		},
	}
})

var player = {}

var playState = {
	create: function() {
		//Load tileset to the game
		map = game.add.tilemap('map')
		map.addTilesetImage('dungeon', 'tiles')

		map.setCollision([
			1,
			2,
			3,
			4,
			5,
			6,
			11,
			16,
			21,
			26,
			31,
			36,
			41,
			41,
			42,
			43,
			44,
			45,
			46,
			51,
			52,
			53,
			54,
			55,
			56,
			67,
			68,
			79,
		])
		layer = map.createLayer('Tile Layer 1')
		layer.resizeWorld()

		player_map.forEach(player => {
			player.sprite = game.add.sprite(50, 40, 'characters')
			game.add.existing(player.sprite)
			game.physics.enable(player.sprite, Phaser.Physics.ARCADE)
			player.sprite.body.collideWorldBounds = true
			//game.add.tween(player.sprite).to({alpha:0}, 200, Phaser.Easing.Linear.None, true);
		})

		// socket = io("http://vija02.localhost.run"); // This triggers the 'connection' event on the server
	},
	render: function() {
		game.debug.geom(this.bar, '#0fffff')
	},
	update: function() {
		player_map.forEach(player => {
			player.update()
			game.physics.arcade.collide(player.sprite, layer, function() {
				player.onCollide()
			})
			game.physics.arcade.collide(player.sprite, player.sprite, function() {
				player.collideSound()
			})
		})
	},
}
