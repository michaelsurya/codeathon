//load.js
var loadState={
	preload: function(){
		var loadingLabel = game.add.text(80, 150, 'loading...', {font: '30px Courier', fill: '#ffffff'});

		game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
		game.scale.PageAlignHorizonally = true;
		game.scale.PageAlignVertically = true;
		game.stage.backgroundColor = '#000000';

		//Load maps and sprites
		game.load.spritesheet('characters', 'assets/sprites/golem.png', 32, 32);
		game.load.image('fireball', 'assets/sprites/fireball.png');
		game.load.tilemap('map', 'assets/maps/map.json', null, Phaser.Tilemap.TILED_JSON);
		game.load.image('tiles', 'assets/sprites/dungeon.png');

		//Load audio assets
		game.load.audio('hit', 'assets/sounds/hit.wav');

 	},
 	create: function(){
 		game.state.start('title');
 	}
 };
