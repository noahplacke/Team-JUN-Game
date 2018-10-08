var myUnits;
var bevo;
var matt;
var horde;
var rain;
var balls;
var enemy;
var cursors;

var ballTime = 0;
var ball;

mascot_raid.main_state = function() {};
mascot_raid.main_state.prototype = {

	preload: function() {

		game.load.image('background', 'assets/level_background.png');
		game.load.image('ground', 'assets/ground.png');
		game.load.spritesheet('tree', 'assets/trees.png');
		game.load.spritesheet('powerups', 'assets/powerup_buttons.png', 64, 64, 4);
		game.load.spritesheet('button', 'assets/button_sprite_sheet.png', 100, 100, 4);
		game.load.audio('sprint1_music', 'assets/sprint1_music.mp3')
		game.load.image('ball', 'assets/ball.png');
		game.load.spritesheet('enemy', 'assets/enemy.png', 32, 32);
		game.load.spritesheet('landmarks', 'assets/landmarks.png', 480, 600, 2);
		console.log("In game");

	},

	create: function() {
		var music = game.add.audio('sprint1_music');
		//This music loops everytime. Need to find to have it stop when played alreay so that it doesn't overlap.
		// music.play();

		game.physics.startSystem(Phaser.Physics.ARCADE);

		//load background and floor
		var BG = game.add.sprite(0, 0, 'background');

		//physics for immovable objects
		immovable = game.add.group();
		immovable.enableBody = true;
		var floor = immovable.create(0, 0, 'ground');
		floor.body.immovable = true;

		//set edge of world
		game.world.setBounds(0, 0, 2400, 800);

		//add in power up buttons
		buttons = game.add.group();
		buttons.fixedToCamera = true;
		var bevo_pow = game.add.button(50, 675, 'powerups', "", this, 0, 0, 0);
		bevo_pow.frame = 0;
		bevo_pow.fixedToCamera = true;
		var matt_pow = game.add.button(120, 675, 'powerups', "", this, 1, 1, 1);
		matt_pow.frame = 1;
		matt_pow.fixedToCamera = true;
		var horde_pow = game.add.button(190, 675, 'powerups', "", this, 2, 2, 2);
		horde_pow.frame = 2;
		horde_pow.fixedToCamera = true;
		var rain_pow = game.add.button(260, 675, 'powerups', "", this, 3, 3, 3);
		rain_pow.frame = 3;
		rain_pow.fixedToCamera = true;

		var exit = game.add.button(700, 625, 'button', "", this, 1, 1, 1);
		exit.frame = 1;
		exit.fixedToCamera = true;
		exit.onInputDown.add(exit_pressed, this);

		var ut_tower = immovable.create(0, 0, 'landmarks', 0);
        var am_tower = immovable.create(1920, 0, 'landmarks', 1);

		myUnits = game.add.group();
		bevo = game.add.group();
		matt = game.add.group();
		horde = game.add.group();
		rain = game.add.group();

		myUnits.add(bevo, matt, horde, rain);

		// bevo_pow.onInputDown.add(deploy_bevo, this);
		// matt_pow.onInputDown.add(deploy_matt, this);
		// horde_pow.onInputDown.add(deploy_horde, this);
		// rain_pow.onInputDown.add(deploy_rain, this);

		//  This will check Group vs. Group collision (balls vs. enemy!)

		enemy = game.add.group();
		enemy.enableBody = true;
		enemy.physicsBodyType = Phaser.Physics.ARCADE;
		var unit_timer = (function(){
			setInterval(deploy_units, 250);
		})();

		balls = game.add.group();
		balls.enableBody = true;
		balls.physicsBodyType = Phaser.Physics.ARCADE;

		for (var i = 0; i < 30; i++)
		{
			var b = balls.create(0, 0, 'ball');
			b.name = 'ball' + i;
			b.exists = false;
			b.visible = false;
			b.checkWorldBounds = true;
			b.events.onOutOfBounds.add(resetball, this);
		}

		cursors = game.input.keyboard.createCursorKeys();
		game.input.keyboard.addKeyCapture([ Phaser.Keyboard.SPACEBAR ]);


		addKeyListen();

	},

	update: function() {
		game.physics.arcade.overlap(balls, enemy, collisionHandler, null, this);

		//scroll the map by dragging with mouse
		if (this.game.input.activePointer.isDown) {
			if (this.game.origDragPoint) {
				this.game.camera.x += this.game.origDragPoint.x - this.game.input.activePointer.position.x;
				this.game.camera.y += this.game.origDragPoint.y - this.game.input.activePointer.position.y;
			}
			this.game.origDragPoint = this.game.input.activePointer.position.clone();
		} else {
			this.game.origDragPoint = null;
		}

		if (game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR))
		{
			throwball();
		}

	}
}

function throwball () {

    if (game.time.now > ballTime)
    {
        ball = balls.getFirstExists(false);

        if (ball)
        {
            ball.reset(200, game.world.height - 300);
            ball.body.velocity.x = 1500;
            ballTime = game.time.now + 150;
        }
    }
}

//  if the ball goes off screen
function resetball (ball) {

    ball.kill();

}

//  if the ball hits enemy
function collisionHandler (ball, ene) {

    ball.kill();
    ene.kill();

}

function deploy_units (){
	console.log("units made");
	var e = enemy.create(2200 + Math.random() * 400, game.world.height - 300 + Math.random() * 10, 'enemy' , 1);
	e.frame = 1;
	e.body.velocity.x = - 200;
	e.animations.add('left', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15], 16, true);
	e.animations.play('left');
}
