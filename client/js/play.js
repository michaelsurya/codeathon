var map;
var layer;
var bullet_array = [];
var socket;
var other_player = {};

var player = {
  sprite: null,//Will hold the sprite when it's created 
  speed:2, // This is the parameter for how fast it should move 
  shot:false,
  update: function(){
      this.sprite.frame = 0;
      this.sprite.animations.add('down', [0,1,2], 6);
      this.sprite.animations.add('up', [3,4,5], 6);
      this.sprite.animations.add('right', [6,7,8], 6);
      this.sprite.animations.add('left', [9,10,11], 6);

      // Move forward
      if(game.input.keyboard.isDown(Phaser.Keyboard.W) || game.input.keyboard.isDown(Phaser.Keyboard.UP)){
          this.sprite.body.y += -this.speed; 
          this.sprite.animations.play('up');
      }
      if(game.input.keyboard.isDown(Phaser.Keyboard.S) || game.input.keyboard.isDown(Phaser.Keyboard.DOWN)){
          this.sprite.body.y += this.speed;
          this.sprite.animations.play('down');
      }
      if(game.input.keyboard.isDown(Phaser.Keyboard.A) || game.input.keyboard.isDown(Phaser.Keyboard.LEFT)){
          this.sprite.body.x += -this.speed;
          this.sprite.animations.play('left');
      }
      if(game.input.keyboard.isDown(Phaser.Keyboard.D) || game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)){
          this.sprite.body.x += this.speed;
          this.sprite.animations.play('right');
      }
    
      // Tell the server we've moved 
      // socket.emit('move-player',{x:this.sprite.x,y:this.sprite.y});
  },

  onCollide: function(){
      game.add.tween(this.sprite).to({alpha:1}, 1000, Phaser.Easing.Linear.None, true);
      setTimeout(
      () => {
          game.add.tween(this.sprite).to({alpha:0}, 1000, Phaser.Easing.Linear.None, true);
      },
      1000
      ); 
  }
}

var playState = {
  create: function() {
    //Load tileset to the game
    map = game.add.tilemap('map');
    map.addTilesetImage('dungeon', 'tiles');
   
    map.setCollision([1,2,3,4,5,6,11,16,21,26,31,36,41,41,42,43,44,45,46,51,52,53,54,55,56,67,68,79]);
    layer = map.createLayer('Tile Layer 1');
    layer.resizeWorld();

    //Create player
    player.sprite = game.add.sprite(32, 32, 'characters');
    game.add.existing(player.sprite);
    game.physics.enable(player.sprite, Phaser.Physics.ARCADE);
    game.add.tween(player.sprite).to({alpha:0}, 200, Phaser.Easing.Linear.None, true);

    // socket = io("http://vija02.localhost.run"); // This triggers the 'connection' event on the server
  },
  render: function(){
    game.debug.geom(this.bar,'#0fffff')
  },
  update: function() {
    player.update();
    game.physics.arcade.collide(player.sprite, layer, function() {
        player.onCollide();
    });
  }
};